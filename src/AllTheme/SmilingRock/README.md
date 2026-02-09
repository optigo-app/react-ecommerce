# Smiling Rock Theme Documentation

This document provides a deep dive into the Smiling Rock theme, focusing on authentication flows, private routing, and B2B/B2C logic.

## 1. Authentication Flow

The Smiling Rock theme uses a multi-faceted authentication system integrated with Recoil for state management and JS Cookies for session persistence.

### Key Components:

- **Login Variants**:
  - `LoginOption.js`: Entry point for all login methods.
  - `LoginWithEmail.js`: Traditional email/password authentication.
  - `LoginWithEmailCode.js`: Email-based OTP login.
  - `LoginWithMobileCode.js`: Mobile-based OTP login.
  - `Registretion.js`: User registration flow.
- **State Management**:
  - `smr_loginState` (Recoil): Tracks current login status across the app.
  - `userLoginCookie` (JS Cookie): Persists the session token between browser restarts.
- **Session Restoration**:
  - `SmilingRock_App.js` checks for `userLoginCookie` on mount and calls `LoginWithEmailAPI` to validate and restore the session.

### Auth Logic:

1. User submits credentials.
2. API returns a session token and user details.
3. Token is stored in `userLoginCookie`.
4. User details are stored in `sessionStorage` under `loginUserDetail`.
5. `smr_loginState` is set to `true`.
6. Successful login triggers a `window.location.reload()` to ensure all theme settings and menus are correctly fetched for the authenticated user.

---

## 2. Protected Route Handling (B2B vs B2C)

The application uses a centralized `PrivateRoutes.js` component to guard sensitive routes based on the store's business model.

### Centralized Logic (`PrivateRoutes.js`):

The protection logic is primarily driven by the `IsB2BWebsite` flag from `storeInit`.

#### Scenario: B2B Website (`storeInit.IsB2BWebsite != 0`)

In B2B mode, the website acts as a closed catalog.

- **Without Login**:
  - **Public Pages**: Home (`/`), Contact Us, About Us, Privacy Policy are accessible.
  - **Protected Pages**: Product List (`/p/*`), Product Detail (`/d/*`), Cart (`/cartPage`), Wishlist (`/myWishList`), Lookbook (`/Lookbook`), Custom Orders (`/custom-orders`), and Product Feed (`/productfeed`).
  - **Behavior**: If a guest tries to access any protected page, they are redirected to:
    ` /loginOption/?LoginRedirect={encodedCurrentPath}`
- **With Login**:
  - All protected pages become accessible.
  - Attempting to visit `/loginOption`, `/register`, or other auth pages will redirect the user back to the Home page (`/`).

#### Scenario: B2C Website (`storeInit.IsB2BWebsite == 0`)

In B2C mode, the catalog is generally open for browsing.

- **Without Login**:
  - **Public Pages**: Home, Product List, and Product Detail are typically accessible to allow guest browsing.
  - **Restricted Pages**: Account details (`/account`) and sometimes the final Checkout pages are protected.
  - **Behavior**: Guests can see products but may be asked to login only when they attempt to place an order or view account-specific information.
- **With Login**:
  - All features are unlocked.
  - Similar to B2B, auth pages (Login/Register) redirect to Home if already logged in.

---

## 3. B2B vs B2C Flow Summary

| Feature            | B2C Flow (Retail)                                             | B2B Flow (Wholesale)                                        |
| :----------------- | :------------------------------------------------------------ | :---------------------------------------------------------- |
| **Guest Browsing** | Open catalog; guest can see products and prices (if enabled). | Closed catalog; guest is forced to login to see products.   |
| **Redirection**    | Only on checkout or account-specific pages.                   | Aggressive redirection for all product-related paths.       |
| **Cart Behavior**  | Usually uses `B2CCart` (drawer or simple page).               | Uses `B2BCart` with bulk actions and detailed specs.        |
| **Pricing**        | Retail pricing displayed.                                     | Wholesale pricing displayed, often requiring login to view. |

---

## 4. Verification of Flow Integrity

1. **Before Login**: `PrivateRoutes` checks the `smr_loginState`. If `false` and `IsB2BWebsite` is active, the `Navigate` component triggers a redirect.
2. **Persistence**: `SmilingRock_App.js` ensures that if a user refreshed the page, the `userLoginCookie` is used to re-authenticate them before the `PrivateRoutes` check fails, preventing flashing of the login page for logged-in users.
3. **Session Safety**: `useGlobalPreventSave` and right-click disabled on product images ensure protection of assets in both flows.
