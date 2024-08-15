import defaultTheme from "tailwindcss/defaultTheme";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Gothic725 Bd BT", ...defaultTheme.fontFamily.sans],
				futura: ["Futura Heavy", ...defaultTheme.fontFamily.sans],
			},
			aria: {
				current: 'current="true"',
			},
		},
	},
	plugins: [containerQueries],
};
