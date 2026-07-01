import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { profileConfig, siteConfig } from "@/config";

const parser = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

function escapeXml(str: string): string {
	return str.replace(/[<>&'"]/g, (char) => {
		switch (char) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return char;
		}
	});
}

function toPlainText(markdown: string): string {
	return stripInvalidXmlChars(
		sanitizeHtml(parser.render(markdown), {
			allowedTags: [],
			allowedAttributes: {},
		})
			.replace(/\s+/g, " ")
			.trim(),
	);
}

function truncateDescription(text: string, maxLength = 160): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength).trimEnd()}...`;
}

export async function GET(context: APIContext) {
	const blog = await getSortedPosts();
	const site = context.site ?? new URL(import.meta.env.SITE);
	const feedUrl = new URL("rss.xml", site).toString();
	const siteLang = siteConfig.lang.replace("_", "-");

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site,
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
			dc: "http://purl.org/dc/elements/1.1/",
		},
		items: blog.map((post) => {
			const content =
				typeof post.body === "string" ? post.body : String(post.body || "");
			const cleanedContent = stripInvalidXmlChars(content);
			const categories = Array.from(
				new Set(
					[post.data.category, ...post.data.tags]
						.map((category) => category?.trim())
						.filter((category): category is string => Boolean(category)),
				),
			);
			return {
				title: post.data.title,
				pubDate: post.data.published,
				description:
					post.data.description ||
					truncateDescription(toPlainText(cleanedContent)),
				link: `/posts/${post.slug}/`,
				categories,
				customData: `<dc:creator>${escapeXml(profileConfig.name)}</dc:creator>`,
				content: sanitizeHtml(parser.render(cleanedContent), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
					allowedAttributes: {
						...sanitizeHtml.defaults.allowedAttributes,
						img: ["src", "alt", "title", "width", "height", "loading"],
					},
				}),
			};
		}),
		customData: `<language>${siteLang}</language><atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
	});
}
