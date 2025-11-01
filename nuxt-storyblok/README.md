# Nuxt 3 + Storyblok Starter


This scaffold demonstrates a Nuxt 3 project integrated with Strapi (self-hosted open-source headless CMS). It includes three reusable blocks/components in the Vue app: Hero, FeatureGrid (with FeatureItem), and CTA_Block. The pages fetch content from a Strapi collection called `pages` and expect a `content` dynamic zone (or JSON field) containing the blocks.

Quick start

1. Copy `.env.example` to `.env` and set `STRAPI_BASE_URL` (and `STRAPI_TOKEN` if you use a preview/private token).
2. Install dependencies:

```bash
cd nuxt-storyblok
npm install
```

3. Run dev server:

```bash
npm run dev
```

Strapi notes
- Create a Collection Type named `pages` with fields: `title` (string), `slug` (uid/string), and `content` (Dynamic Zone containing components: `hero`, `feature_item`, `feature_grid`, `cta_block`) or a JSON field. The app expects the API response shape of Strapi v4 (i.e., /api/pages?filters[slug][$eq]=home&populate=deep).
- The Nuxt pages will try to fetch `home` and `about` slugs and will fall back to demo content if the API is not available.

Integration notes
- The project uses `runtimeConfig.public.strapi` (from `nuxt.config.ts`) to get the API base URL and optional token.
- Blocks returned from Strapi are transformed into a simple object shape the Vue components understand: `{ component: '<name>', ...fields }`. Component names are normalized (dashes -> underscores).

