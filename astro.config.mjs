// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: {
      mode: "sprite"
    }
  },
  image: {
    domains: ["media.licdn.com"]
  },
  integrations: [tailwind(), icon({
    iconDir: 'src/assets/icons'
  })],
  output: 'server'
});