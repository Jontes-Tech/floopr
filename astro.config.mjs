import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://floopr.org",
  integrations: [tailwind(), robotsTxt(), svelte(), prefetch({selector: "a"}), sitemap()],
});
