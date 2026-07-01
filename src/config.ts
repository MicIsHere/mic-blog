import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: 'Mic的博客',
	subtitle: 'Mic.Run 日常/技术/动漫',
	keywords: ['Mic.Run', 'Mic的博客', '个人博客', '技术', '教程', '日常', '动漫', '二次元', '安全'],
	lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true,     // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: 'https://cdn.imgos.cn/vip/2026/03/28/69c7e63a0f1f2.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true,         // Display the credit text of the banner image
			text: '来自于 Blue Archive',              // Credit text to be displayed
			url: 'https://bluearchive.nexon.com/events/2022/02/100days'                // (Optional) URL link to the original artwork or artist's page
		}
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 3, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
		  src: '/favicon/icon.ico',    // Path of the favicon, relative to the /public directory
		  // theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		  // sizes: '64x64',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		}
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/friends/",
			external: false,
		},
		// {
		// 	name: "GitHub",
		// 	url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
		// 	external: true, // Show an external link icon and will open in a new tab
		// },
	],
};

export const profileConfig: ProfileConfig = {
	avatar: 'https://q.qlogo.cn/headimg_dl?dst_uin=3098880154&spec=640&img_type=jpg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: 'Mic',
	bio: '毕竟几人真得鹿，不知终日梦为鱼。',
	links: [
		{
			name: 'BiliBili',
			icon: 'fa6-brands:bilibili',       // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: 'https://space.bilibili.com/399232214',
		},
		{
			name: 'Steam',
			icon: 'fa6-brands:steam',
			url: 'https://steamcommunity.com/id/cute-mic/',
		},
		{
			name: 'GitHub',
			icon: 'fa6-brands:github',
			url: 'https://github.com/MicIsHere',
		},
	],
}

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
