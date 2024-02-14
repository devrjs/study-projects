/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'InterSemiBold',
        subtitle: 'InterMedium',
        body: 'InterRegular',
        bold: 'InterBold',
      },
    },
  },
  plugins: [],
}
