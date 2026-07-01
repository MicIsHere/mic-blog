import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const INDEXNOW_KEY = "c9fa73f62194405ab3449b642de813ca";
const DEFAULT_SITE_URL = "https://www.mic.run/";
const DIST_DIR = "dist";
const isDryRun = process.argv.includes("--dry-run");

function getSiteUrl() {
	const value = process.env.SITE_URL || DEFAULT_SITE_URL;
	return new URL(value.endsWith("/") ? value : `${value}/`);
}

function extractLocValues(xml) {
	return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
}

function collectSitemapUrls(siteUrl) {
	if (!existsSync(DIST_DIR)) {
		throw new Error("dist directory not found. Run the build before submitting.");
	}

	const urls = new Set();
	const sitemapFiles = readdirSync(DIST_DIR).filter((file) =>
		/^sitemap.*\.xml$/.test(file),
	);

	for (const file of sitemapFiles) {
		const xml = readFileSync(join(DIST_DIR, file), "utf8");
		for (const loc of extractLocValues(xml)) {
			const normalized = new URL(loc, siteUrl).toString();
			if (!normalized.endsWith(".xml")) {
				urls.add(normalized);
			}
		}
	}

	return Array.from(urls).sort();
}

async function submitIndexNow() {
	const siteUrl = getSiteUrl();
	const urlList = collectSitemapUrls(siteUrl);

	if (urlList.length === 0) {
		throw new Error("No URLs found in sitemap files.");
	}

	const body = {
		host: siteUrl.host,
		key: INDEXNOW_KEY,
		keyLocation: new URL(`${INDEXNOW_KEY}.txt`, siteUrl).toString(),
		urlList,
	};

	if (isDryRun) {
		console.log(
			`Dry run: would submit ${urlList.length} URL(s) to IndexNow for ${siteUrl.host}.`,
		);
		console.log(`Key location: ${body.keyLocation}`);
		return;
	}

	const response = await fetch("https://api.indexnow.org/indexnow", {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(
			`IndexNow submission failed with ${response.status}: ${text}`,
		);
	}

	console.log(
		`Submitted ${urlList.length} URL(s) to IndexNow for ${siteUrl.host}.`,
	);
	console.log(`Key file: ${basename(body.keyLocation)}`);
}

submitIndexNow().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
