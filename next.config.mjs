/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asianimg.pro",
				pathname: "/cover/**",
			},
			{
				protocol: "https",
				hostname: "www.pngall.com",
			},
			{
				protocol: "https",
				hostname: "gogocdn.net",
			},
			{
				protocol: "https",
				hostname: "asianimg.pro",
			},
			{
				protocol: "https",
				hostname: "s4.anilist.co",
			},
			{
				protocol: "https",
				hostname: "uploads.mangadex.org",
			},
			{
				protocol: "https",
				hostname: "sup-proxy.zephex0-f6c.workers.dev",
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
