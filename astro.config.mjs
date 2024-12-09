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
  integrations: [tailwind(), icon({
    iconDir: 'src/assets/icons'
  })]
});