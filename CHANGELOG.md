# Changelog

## 2026-05-02 — Add `ProductTypeSlider` component

### Files Changed

#### `src/AllTheme/Elveester/Components/Pages/Home/TopSection/Max/ProductTypeSlider.jsx` *(new)*
- **Old behavior:** Empty placeholder component returning `<div>ProductTypeSlider</div>`.
- **New behavior:** Full 3-card circular carousel (prev · active · next) matching the UI/animation of `CollectionsSlider`. Uses `ProductTypeName` field from API, normalized image map, glassmorphic arrow controls, skeleton loading state, and `ProductType` filter key for navigation.
- **Key difference from CollectionsSlider:** Max 3 cards visible (offsets -1, 0, +1 only) — no far-left / far-right cards.
- **Reason:** New home-page section to let users browse product types visually.

#### `src/AllTheme/Elveester/Components/Pages/Home/TopSection/New/NewTopSection.js`
- **Old behavior:** `SectionData` state had only `collection` and `category` keys; `GetHomeProductType` response was only `console.log`-ged. `ProductTypeSlider` was not rendered.
- **New behavior:** `SectionData.productType` added; populated from `HomeProductType?.Data?.rd`. `<ProductTypeSlider>` rendered directly after `<CollectionsSlider>` inside the `isSetupforMax` block.
- **Reversibility:** Remove the `<ProductTypeSlider …/>` line and the `productType` key from `SectionData` to restore prior behaviour.

---

## 2026-04-21 — Show Menu & Icons for B2C Guests (IsB2BWebsite == 0)

### Files Changed

#### `src/AllTheme/Elveester/Components/Pages/Home/Header/New/MaxMenu.jsx`
- **Old behavior:** Desktop navigation bar (`menuItems`, New Arrivals, Offers) was only rendered when `islogin === true`, so B2C guests saw an empty header with no menu.
- **New behavior:** Desktop nav is now rendered when `islogin || IsB2CWebsiteChek` — i.e., always visible on B2C sites regardless of login state.
- **Also added:** A dedicated `useEffect` on mount that calls `getMenuApi()` immediately when `IsB2BWebsite === 0`, so menu data is fetched for guests before any login event fires.
- **Reason:** B2C stores allow guest browsing; hiding the menu blocked navigation for unauthenticated visitors.

#### `src/AllTheme/Elveester/Components/Pages/Home/Header/New/RightSideMenu.jsx`
- **Old behavior:** Search icon and Cart icon were both gated by `islogin`, so B2C guests saw neither.
- **New behavior:** `IsB2CWebsiteChek` (derived from `IsB2BWebsiteChek == 0`) is used to also show Search and Cart for B2C guests: `(islogin || IsB2CWebsiteChek)`.
- **Unchanged:** Wishlist, Logout remain `islogin`-only (user-specific). Login icon already showed for `!islogin`.
- **Reason:** B2C supports guest cart (via `visiterId`) and guest search — these icons must be accessible without login.

## 2025-03-28 — Fix StoreInit First-Load Initialization Failure

### Files Changed

#### `src/loadInit.js`
- **Old behavior:** Only stored storeInit data in `sessionStorage`
- **New behavior:** Also stores data on `window.__storeInit`, `window.__myAccountFlags`, `window.__CompanyInfoData` for instant in-memory access
- **Reason:** `sessionStorage` has serialization overhead and potential timing issues; `window` globals are available immediately

#### `src/AppLoader.js`
- **Old behavior:** Did not initialize `window` globals
- **New behavior:** Initializes `window.__storeInit = null`, `window.__myAccountFlags = null`, `window.__CompanyInfoData = null` before calling `loadStoreInit()`
- **Reason:** Ensures clean state on each initialization cycle

#### `src/ThemeRoutes.js`
- **Old behavior:** 
  - Had a `fetchWithRetry` function that duplicated the StoreInit fetch already done by AppLoader
  - Had `window.location.reload()` failsafe that caused infinite reload loop on first visit
  - Used `isStoreInitLoaded` state tied to the duplicate fetch
- **New behavior:**
  - Removed duplicate `fetchWithRetry` and the redundant StoreInit fetch
  - Replaced with a polling timer (every 200ms, max 15s) that checks `window.__storeInit` first, then `sessionStorage`
  - If polling times out, performs a single refetch as last resort
  - `onStoreInitReady()` consolidates title, visitor ID, and API initialization
  - Removed `window.location.reload()` — no more infinite reload loop
  - Removed unused imports: `Suspense`, `Box`, `CircularProgress`
- **Reason:** Eliminates race condition and infinite reload loop on first page load

#### Multiple theme Header/Account files (removeItem cleanup)
- **Old behavior:** `sessionStorage.removeItem('storeInit')` called during logout
- **New behavior:** Removed the `removeItem('storeInit')` call (the `sessionStorage.clear()` that follows handles cleanup; AppLoader refetches on reload)
- **Reason:** `storeInit` is store configuration, not user data — removing it caused the "not initialized" crash after logout
- **Files affected:**
  - `src/AllTheme/MalakanJwewls/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/StamFordJewels/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/SmilingRock/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/RoopJewellers/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/Pocatalog/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/LoveIn/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/Ornaz/Components/Pages/Home/Header/Header2.js`
  - `src/AllTheme/SmilingRock/Components/Pages/Account/Account.js`
  - `src/AllTheme/RoopJewellers/Components/Pages/Account/Account.js`
  - `src/AllTheme/DaimondTine/Components/Pages/Account/Account.js`
  - `src/AllTheme/Elveester/Components/Pages/Account/Account.js`
  - `src/AllTheme/Forevery/Components/Pages/Account/Account.js`
  - `src/AllTheme/LoveIn/Components/Pages/Account/Account.js`
  - `src/AllTheme/Ornaz/Components/Pages/Account/Account.js`
  - `src/AllTheme/Pocatalog/Components/Pages/Account/Account.js`
  - `src/AllTheme/MobileApp/*/Components/Pages/Account/*/MobileViewComp.js`
  - `src/AllTheme/MobileApp/*/Components/Pages/Account/web account/Account.js`
  - Multiple `CountDownTimer.js` files across themes
