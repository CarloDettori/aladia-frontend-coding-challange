import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './app.vue',
    './app/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
