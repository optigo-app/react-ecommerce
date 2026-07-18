/**
 * storeInitPreload.js
 * ====================
 * Pre-fetches StoreInit.json BEFORE React loads.
 * Loaded via <script> tag in index.html.
 * 
 * Sets window.__storeInit, window.__myAccountFlags, window.__CompanyInfoData
 * so React components can access initialization data immediately on mount.
 * 
 * Also populates sessionStorage as a fallback for components that read from there.
 * 
 * Date: 2025-03-28
 */


// const REACT_APP_WEB = "fgstore.web";
// const REACT_APP_WEB = "fgstore.pro";  // procatalog website
// const REACT_APP_WEB = "fgstore.plw";   //similing rock PLW
// const REACT_APP_WEB = "fgstore.mapp";   //similing rock mobile app
// const REACT_APP_WEB = "diamondtine.web";
// const REACT_APP_WEB = "hoq.web";
// const REACT_APP_WEB = "malakan.web";
// const REACT_APP_WEB = "rpjewel.web";
// const REACT_APP_WEB = "stamford.web";
// const REACT_APP_WEB = "lovein.web";
// const REACT_APP_WEB = "ornaz.web";
// const REACT_APP_WEB = "demostore";
// const REACT_APP_WEB = "forevery.web";    // Forevery.web | Foreveryd.optigoapps.com  | world.forevery.one
const REACT_APP_WEB = "elvee.web";   // elvee.in
// const REACT_APP_WEB = "vedica.web";   // vedica.in
// const REACT_APP_WEB = "fgstorepro.mapp";   // procatalog mobile app 

// wdjwb

(function () {
  'use strict';

  // Build the StoreInit.json URL using the same logic as storInitDataPath()
  // This mirrors: src/utils/Glob_Functions/GlobalFunction.js -> storInitDataPath()
  function getStoreInitUrl() {
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;

    // In development, hostname is "localhost" or "zen"
    // In production, it's the actual domain (e.g., shreediamond.in)
    // For localhost/zen, we need the REACT_APP_WEB value, but we can't import env.js here.
    // So we read it from a data attribute on the script tag: <script data-web="malakan.web" ...>
    var webEnv = REACT_APP_WEB

    var hostName = (hostname === 'localhost' || hostname === 'zen')
      ? (webEnv || hostname)
      : hostname;

    console.log(hostName, "hostName")

    // Strip "www." prefix
    if (hostName.indexOf('www.') === 0) {
      hostName = hostName.substring(4);
    }

    return protocol + '//' + hostName + '/Website_Store/WebSiteStaticImage/' + hostName + '/StoreInit.json';
  }

  // Fetch with retry
  function fetchWithRetry(url, retries, delay) {
    return new Promise(function (resolve, reject) {
      function attempt(n) {
        fetch(url)
          .then(function (response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.text();
          })
          .then(resolve)
          .catch(function (error) {
            if (n <= 0) {
              reject(error);
            } else {
              setTimeout(function () { attempt(n - 1); }, delay);
            }
          });
      }
      attempt(retries);
    });
  }

  // Main initialization
  function preloadStoreInit() {
    // Skip if already loaded (e.g., page was navigated back to)
    if (window.__storeInit) {
      window.__storeInitReady = true;
      return;
    }

    // Also skip if sessionStorage already has data (e.g., refresh scenario)
    var existing = null;
    try {
      existing = sessionStorage.getItem('storeInit');
      if (existing) {
        var parsed = JSON.parse(existing);
        window.__storeInit = parsed;

        var flags = sessionStorage.getItem('myAccountFlags');
        if (flags) window.__myAccountFlags = JSON.parse(flags);

        var company = sessionStorage.getItem('CompanyInfoData');
        if (company) window.__CompanyInfoData = JSON.parse(company);

        window.__storeInitReady = true;
        return; // Already in session, no need to fetch
      }
    } catch (e) {
      // sessionStorage might be unavailable in some browsers/private mode
    }

    var url = getStoreInitUrl();

    fetchWithRetry(url, 3, 1000)
      .then(function (text) {
        try {
          var json = JSON.parse(text);
          if (json && json.rd && json.rd[0]) {
            var rd0 = json.rd[0];

            // Set window globals (available instantly to React)
            window.__storeInit = rd0;
            window.__myAccountFlags = json.rd1 || null;
            window.__CompanyInfoData = (json.rd2 && json.rd2[0]) || {};

            // Also set sessionStorage (for components that read from there)
            try {
              sessionStorage.setItem('storeInit', JSON.stringify(rd0));
              sessionStorage.setItem('myAccountFlags', JSON.stringify(json.rd1 || null));
              sessionStorage.setItem('CompanyInfoData', JSON.stringify((json.rd2 && json.rd2[0]) || {}));
            } catch (e) {
              // sessionStorage full or unavailable
            }

            // Signal that preload is complete
            window.__storeInitReady = true;
          }
        } catch (parseError) {
          console.error('[StoreInitPreload] JSON parse error:', parseError);
        }
      })
      .catch(function (fetchError) {
        console.error('[StoreInitPreload] Fetch failed after retries:', fetchError);
        // Don't block — React's AppLoader will retry as fallback
      });
  }

  // Initialize globals
  window.__storeInit = null;
  window.__myAccountFlags = null;
  window.__CompanyInfoData = null;
  window.__storeInitReady = false;

  // Run immediately
  preloadStoreInit();
})();
