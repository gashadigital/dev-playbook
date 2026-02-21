# Favicon & App Icons

## Where to Put Your Images

Favicon assets live in **`public/fav/`**:

| File | Full path | Served at |
|------|-----------|------------|
| favicon.ico | `public/fav/favicon.ico` | `/fav/favicon.ico` |
| favicon.svg | `public/fav/favicon.svg` | `/fav/favicon.svg` |
| favicon-96x96.png | `public/fav/favicon-96x96.png` | `/fav/favicon-96x96.png` |
| apple-touch-icon.png | `public/fav/apple-touch-icon.png` | `/fav/apple-touch-icon.png` |
| web-app-manifest-192x192.png | `public/fav/web-app-manifest-192x192.png` | `/fav/web-app-manifest-192x192.png` |
| web-app-manifest-512x512.png | `public/fav/web-app-manifest-512x512.png` | `/fav/web-app-manifest-512x512.png` |
| site.webmanifest | `public/fav/site.webmanifest` | `/fav/site.webmanifest` |

## Documentation Screenshots

Other static assets (e.g. screenshots for docs) go in subdirectories under `public/`:

- `public/server_architecture/` — architecture diagrams, server setup screenshots
- `public/screenshots/` — general docs imagery
- etc.

Reference them in MDX with: `![Alt text](/server_architecture/diagram.png)`

## Setup

1. Favicon assets live in `public/fav/` (already configured in `app/layout.tsx`).
2. `site.webmanifest` icon paths use the `/fav/` prefix.
