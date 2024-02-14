import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ignite: {
          500: '#129e57',
        },
        yellow: {
          500: '#f7dd43',
          700: '#e5cd3d',
        },
        gray: {
          100: '#e1e1e6',
          300: '#8d8d99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
      },
    },
  },
  plugins: [],
}
export default config
