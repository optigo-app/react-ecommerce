# E-commerce Web Performance Platform

A multi-brand, multi-theme e-commerce jewelry platform built with React 18, Material-UI, and a custom theme engine. Supports dynamic branding, product catalogs, filtering, and performance optimizations.

---

## Architecture Overview

- **Frontend**: React 18 + React Router + Material-UI v5 + Emotion
- **State**: Recoil for global state, sessionStorage for persistence
- **Styling**: SCSS + Material-UI theme system, per-brand theme overrides
- **Build**: Create React App with custom webpack config, compression, and sourcemap control
- **Performance**: Lazy loading, pagination, debounced filters, image optimization

---

## Multi-Theme System

Located in `src/AllTheme/`, each brand is a self-contained theme:

- `Elveester/`
- `SmilingRock/`
- `StamFordJewels/`
- `Forevery/`
- `LoveIn/`
- `RoopJewellers/`
- `Ornaz/`
- `MalakanJwewls/`
- `HouseOfQuadri/`
- `DaimondTine/`
- `MobileApp/`
- `Pocatalog/`
- `hemratnaProcatalog/`

Each theme includes:
- Brand-specific components and assets
- Custom recoil atoms
- Theme entry (`*_App.js`)
- Localization and branding overrides

Theme routing is dynamically resolved in `ThemeRoutes.js`.

---

## Key Features

- **Product Listing**: Advanced filtering, sorting (New/Recommended/Bestseller/etc.), pagination
- **Dynamic Logos**: Runtime logo switching via `storImagePath()` and CDN
- **Cart & Wishlist**: Recoil-backed, with login-aware sync
- **Customization**: Metal, diamond, color stone selectors with live preview
- **SEO**: Helmet, structured JSON-LD, breadcrumbs
- **Internationalization**: Multi-currency, multi-language hooks
- **Performance**: Debounced filters, lazy images, compression webpack plugin

---

## Development

### Prerequisites
- Node.js 16+
- `npm` or `yarn`

### Setup
```bash
npm install
```

### Scripts
- `npm start` — Dev server on http://localhost:3000
- `npm run build` — Production build (no sourcemaps)
- `npm test` — Jest test runner

### Build Notes
- Uses increased Node heap (`--max_old_space_size=6144`)
- Source maps disabled in production (`GENERATE_SOURCEMAP=false`)
- Compression and image optimization enabled

---

## Project Structure

```
src/
├─ AllTheme/               # Per-brand themes
├─ utils/                 # Shared utilities, assets, API helpers
│   ├─ assets/loader/      # Logos and loader GIFs
│   └─ Glob_Functions/    # Global helpers (storImagePath, etc.)
├─ Components/            # Shared cross-theme components
└─ ThemeRoutes.js        # Dynamic theme router
public/                  # Static assets (logos, favicon)
```

---

## Runtime Assets

- Logos and loaders are imported from `src/utils/assets/loader/`
- Runtime images fetched via `storImagePath()` → `<domain>/WebSiteStaticImage`
- Each brand can override logos via recoil atoms (`*_companyLogo`, `*_companyLogoM`)

---

## Testing

- Jest with React Testing Library
- Coverage from `src/**/*.{js,jsx,ts,tsx}`
- Test files: `**/__tests__/**/*.{js,jsx,ts,tsx}` or `**/*.{spec,test}.{js,jsx,ts,tsx}`

---

## Learn More

- [React Documentation](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Recoil](https://recoiljs.org/)
- [Create React App](https://create-react-app.dev/)

---

## Deployment

Build outputs to `build/`. Deploy to any static host. Ensure `/WebSiteStaticImage` is served for runtime images/logos.

---

*Generated for the e-commerce web performance project.*
