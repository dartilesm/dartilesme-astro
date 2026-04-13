/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				heading: ['Syne', 'sans-serif'],
				body: ['Figtree', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				background: 'var(--color-bg)',
				surface: 'var(--color-surface)',
				'surface-2': 'var(--color-surface-2)',
				border: 'var(--color-border)',
				'border-hover': 'var(--color-border-hover)',
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-muted': 'var(--color-text-muted)',
				accent: 'var(--color-accent)',
				'accent-hover': 'var(--color-accent-hover)',
			},

			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
				'fade-in': 'fadeIn 0.4s ease-out forwards',
			},
		},
	},
	plugins: [],
}
