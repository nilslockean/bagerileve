import defaultTheme from 'tailwindcss/defaultTheme';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Gothic725 Bd BT', ...defaultTheme.fontFamily.sans],
				futura: ['Futura Heavy', ...defaultTheme.fontFamily.sans]
			},
			aria: {
				current: 'current="true"'
			}
		}
	},
	plugins: [containerQueries]
};
