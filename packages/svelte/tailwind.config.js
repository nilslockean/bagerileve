import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Gothic725 Bd BT', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
