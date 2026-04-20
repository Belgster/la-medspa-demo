// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/**
 * Static output deploys to Cloudflare Pages as plain HTML + _astro assets.
 * The Cloudflare adapter was originally specced but it forces every route
 * through a Worker and pushes images onto the Cloudflare Images runtime
 * endpoint — wrong tradeoff for a one-page static demo. wrangler.toml's
 * pages_build_output_dir="./dist" is all Pages needs.
 */
export default defineConfig({
  site: 'https://lamedspa.pages.dev',
  output: 'static',
  integrations: [react()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
