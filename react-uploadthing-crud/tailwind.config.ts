import { withUt } from 'uploadthing/tw'

export default withUt({
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
})
