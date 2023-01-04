/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			  transparent: 'transparent',
			  current: 'currentColor',
			  darkGreen: '#2c3923',
			  lightGreen: '#616d40',
			  milkWhite: '#fcfadf',
			  lightOrange: '#dfa066',
			  darkOrange: '#bf6d35',
			}
		  },
	},
	plugins: [],
}
