Assets for CTEX application images

Place image files here and reference them from your code or templates.

Recommended structure:

- public/assets/images/brand/         # logos, brand marks
- public/assets/images/team/          # team photos
- public/assets/images/case-studies/  # project thumbnails
- public/assets/images/social/        # social post images and thumbnails

Usage

- Static path (served directly by Vite/Dev server):
  /assets/images/brand/logo.svg

- In React components (import):
  import logo from '/assets/images/brand/logo.svg';

- In CSS:
  background-image: url('/assets/images/social/post1.jpg');

Notes

- Add descriptive file names and keep sizes optimized for web (use WebP/AVIF where possible).
- This folder is under `public`, so files are served as-is at the root `/assets/...` path.
