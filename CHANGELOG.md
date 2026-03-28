# Changelog

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
