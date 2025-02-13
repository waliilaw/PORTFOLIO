import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "WaliilaW", // Your app name
		short_name: "Wali", // Short name for your app
		description:
			"PORTFOLIO", // Description of your app
		start_url: "/", // Start URL when the app is launched
		id: "com.Wali", // Unique identifier for your app
		display: "standalone", // Display mode of your app
		background_color: "#000000", // Background color of your app
		theme_color: "#000000", // Theme color of your app
		// Add icons for your app
		icons: [
			{
				src: "/favicon/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/favicon/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}