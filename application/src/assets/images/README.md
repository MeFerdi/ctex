Module-importable image assets for CTEX application

Place images you want to import in your components here. Example usage in React (Vite):

```tsx
import logoUrl from '@/assets/images/logo.svg';

export function Header() {
  return (
    <img src={logoUrl} alt="CTEX logo" className="h-8 w-8" />
  );
}
```

Notes
- Files in `src/assets` will be bundled by Vite and served with hashed names in production. Use module imports when you want bundling and cache-busting.
- For content-managed images (editable by non-devs), prefer `public/assets/images` which are served as static files under `/assets/images/...`.
