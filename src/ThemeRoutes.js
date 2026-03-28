// new Code

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
import { CountryCodeListApi } from "./utils/API/Auth/CountryCodeListApi";
import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
import { fetchPayMaster } from "./utils/API/OrderFlow/Paymaster";
import { storImagePath, storInitDataPath } from "./utils/Glob_Functions/GlobalFunction";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { orz_companyLogo, orz_companyLogoM } from "./AllTheme/Ornaz/Components/Recoil/atom";
import { el_companyLogo, el_companyLogoM, IsSetupFor } from "./AllTheme/Elveester/Components/Recoil/atom";
import { for_companyLogo, for_companyLogoM } from "./AllTheme/Forevery/Components/Recoil/atom";
import { dt_companyLogo, dt_companyLogoM } from "./AllTheme/DaimondTine/Components/Recoil/atom";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import { proCat_companyLogo, proCat_companyLogoM } from "./AllTheme/Pocatalog/Components/Recoil/atom";
import { roop_companyLogo, roop_companyLogoM } from "./AllTheme/RoopJewellers/Components/Recoil/atom";
import { mala_companyLogo, mala_companyLogoM } from "./AllTheme/MalakanJwewls/Components/Recoil/atom";
import { stam_companyLogo, stam_companyLogoM } from "./AllTheme/StamFordJewels/Components/Recoil/atom";
import { lov_companyLogo, lov_companyLogoM, lov_loginState } from "./AllTheme/LoveIn/Components/Recoil/atom";
import { companyLogo, companyLogoM, loginState, smr_companyLogo, smr_companyLogoM, smr_loginState } from "./AllTheme/SmilingRock/Components/Recoil/atom";
import { REACT_APP_WEB } from "./env";

import { RegisterMasterApi } from "./utils/API/Auth/RegisterMasterApi";
import { GETProductType } from "./utils/API/GETProductType/GETProductType";
import ThemePicker from "./ThemePicker";

const detectThemeNumber = () => {
  // Check with the React app env file
  if (REACT_APP_WEB === "fgstore.web") return 1;
  if (REACT_APP_WEB === "diamondtine.web") return 2;
  if (REACT_APP_WEB === "elvee.web") return 3;
  if (REACT_APP_WEB === "fgstore.mapp") return 4;
  if (REACT_APP_WEB === "fgstore.pro") return 6;
  if (REACT_APP_WEB === "hoq.web") return 7;
  if (REACT_APP_WEB === "forevery.web") return 8;
  if (REACT_APP_WEB === "fgstorepro.mapp") return 9;
  if (REACT_APP_WEB === "stamford.web") return 10;
  if (REACT_APP_WEB === "rpjewel.web") return 11;
  if (REACT_APP_WEB === "malakan.web") return 12;
  if (REACT_APP_WEB === "lovein.web") return 13;
  if (REACT_APP_WEB === "ornaz.web") return 14;
};

export default function ThemeRoutes() {
  // All your existing Recoil setters
  const smr_SetCompanyTitleLogo = useSetRecoilState(smr_companyLogo);
  const smr_SetCompanyTitleLogoM = useSetRecoilState(smr_companyLogoM);
  const lov_SetCompanyTitleLogo = useSetRecoilState(lov_companyLogo);
  const lov_SetCompanyTitleLogoM = useSetRecoilState(lov_companyLogoM);
  const orz_SetCompanyTitleLogo = useSetRecoilState(orz_companyLogo);
  const orz_SetCompanyTitleLogoM = useSetRecoilState(orz_companyLogoM);
  const proCat_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogo);
  const proCatM_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogoM);
  const setRoopWebLogo = useSetRecoilState(roop_companyLogo);
  const setRoopMobileLogo = useSetRecoilState(roop_companyLogoM);
  const el_setCompanyTitleLogoM = useSetRecoilState(el_companyLogoM);
  const el_setCompanyTitleLogo = useSetRecoilState(el_companyLogo);
  const for_setCompanyTitleLogoM = useSetRecoilState(for_companyLogoM);
  const for_setCompanyTitleLogo = useSetRecoilState(for_companyLogo);
  const dt_setCompanyTitleLogo = useSetRecoilState(dt_companyLogo);
  const dt_setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM);
  const mala_setCompanyTitleLogo = useSetRecoilState(mala_companyLogo);
  const mala_setCompanyTitleLogoM = useSetRecoilState(mala_companyLogoM);
  const stam_setCompanyTitleLogo = useSetRecoilState(stam_companyLogo);
  const stam_setCompanyTitleLogoM = useSetRecoilState(stam_companyLogoM);
  const smrMA_setCompanyTitleLogo = useSetRecoilState(smrMA_companyLogo);

  const [title, setTitle] = useState("Loading...");
  const [storeInitData, setStoreInitData] = useState(() => {
    // Priority: window.__storeInit (set by AppLoader) > sessionStorage
    if (window.__storeInit) return window.__storeInit;
    const saved = sessionStorage.getItem("storeInit");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentTheme, setCurrentTheme] = useState(detectThemeNumber());
  const [isStoreInitLoaded, setIsStoreInitLoaded] = useState(false);
  const hasApiBeenCalled = useRef(false);

  // Initialize logos immediately
  useEffect(() => {
    const webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    const mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    // Set all logos immediately
    smr_SetCompanyTitleLogo(webLogo);
    smr_SetCompanyTitleLogoM(mobileLogo);
    lov_SetCompanyTitleLogo(webLogo);
    lov_SetCompanyTitleLogoM(mobileLogo);
    orz_SetCompanyTitleLogo(webLogo);
    orz_SetCompanyTitleLogoM(mobileLogo);
    setRoopWebLogo(webLogo);
    setRoopMobileLogo(mobileLogo);
    mala_setCompanyTitleLogo(webLogo);
    mala_setCompanyTitleLogoM(mobileLogo);
    el_setCompanyTitleLogo(webLogo);
    el_setCompanyTitleLogoM(mobileLogo);
    for_setCompanyTitleLogo(webLogo);
    for_setCompanyTitleLogoM(mobileLogo);
    dt_setCompanyTitleLogo(webLogo);
    dt_setCompanyTitleLogoM(mobileLogo);
    stam_setCompanyTitleLogo(webLogo);
    stam_setCompanyTitleLogoM(mobileLogo);
    smrMA_setCompanyTitleLogo(mobileLogo);
  }, []);

  // ============================================================
  // Polling timer: continuously check for storeInit availability
  // Reads from window.__storeInit (set by AppLoader/loadInit.js)
  // or sessionStorage as fallback. If not found after 15s, refetch.
  // ============================================================
  useEffect(() => {
    // Already have data from state initialization
    if (storeInitData) {
      console.log("✅ ThemeRoutes: storeInit already available from state init");
      onStoreInitReady(storeInitData);
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 75; // 75 x 200ms = 15 seconds
    const POLL_INTERVAL = 200; // check every 200ms

    const timerId = setInterval(() => {
      attempts++;

      // Check window.__storeInit first (fastest, no JSON parse)
      const windowData = window.__storeInit;
      if (windowData) {
        console.log(`✅ ThemeRoutes: Found window.__storeInit on poll attempt ${attempts}`);
        clearInterval(timerId);
        setStoreInitData(windowData);

        // Also ensure sessionStorage is synced
        if (!sessionStorage.getItem("storeInit")) {
          sessionStorage.setItem("storeInit", JSON.stringify(windowData));
        }
        if (window.__myAccountFlags && !sessionStorage.getItem("myAccountFlags")) {
          sessionStorage.setItem("myAccountFlags", JSON.stringify(window.__myAccountFlags));
        }
        if (window.__CompanyInfoData && !sessionStorage.getItem("CompanyInfoData")) {
          sessionStorage.setItem("CompanyInfoData", JSON.stringify(window.__CompanyInfoData));
        }

        onStoreInitReady(windowData);
        return;
      }

      // Fallback: check sessionStorage
      const sessionData = sessionStorage.getItem("storeInit");
      if (sessionData) {
        console.log(`✅ ThemeRoutes: Found sessionStorage storeInit on poll attempt ${attempts}`);
        clearInterval(timerId);
        const parsed = JSON.parse(sessionData);
        setStoreInitData(parsed);
        onStoreInitReady(parsed);
        return;
      }

      // Timeout: refetch as last resort
      if (attempts >= MAX_ATTEMPTS) {
        console.warn("⚠️ ThemeRoutes: storeInit not found after 15s, refetching...");
        clearInterval(timerId);
        refetchStoreInit();
      }
    }, POLL_INTERVAL);

    return () => clearInterval(timerId);
  }, []);

  // Called once storeInit data is available
  const onStoreInitReady = (initData) => {
    if (!initData) return;

    // Update theme if the JSON has a different Themeno
    if (initData.Themeno && initData.Themeno !== currentTheme) {
      setCurrentTheme(initData.Themeno);
    }

    setIsStoreInitLoaded(true);
    setTitle(initData.BrowserTitle || "Jewelry Store");

    // Set up visitor ID from CompanyInfoData
    const CompanyinfoData = window.__CompanyInfoData
      || JSON.parse(sessionStorage.getItem("CompanyInfoData") || "null");

    if (CompanyinfoData) {
      const visiterId = CompanyinfoData?.VisitorId;
      const existingVisitorId = Cookies.get("visiterId") ?? "";
      if (!existingVisitorId) {
        Cookies.set("visiterId", visiterId, { path: "/", expires: 30 });
      } else {
        try {
          const visitorIdCookie = JSON.parse(Cookies.get("visiterId"));
          const expirationDate = visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
          if (expirationDate && expirationDate <= new Date()) {
            Cookies.remove("visiterId", { path: "/" });
          }
        } catch (e) {
          // visiterId cookie is a plain string, not JSON — that's fine
        }
      }
    }

    // Call combo APIs once
    if (!hasApiBeenCalled.current) {
      hasApiBeenCalled.current = true;
      setTimeout(() => {
        callAllApi();
      }, 500);
    }
  };

  // Last-resort refetch if polling times out
  const refetchStoreInit = async () => {
    try {
      const path = `${storInitDataPath()}/StoreInit.json`;
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const jsonData = JSON.parse(text);

      if (jsonData?.rd?.[0]) {
        const rd0 = jsonData.rd[0];
        window.__storeInit = rd0;
        window.__myAccountFlags = jsonData.rd1;
        window.__CompanyInfoData = jsonData.rd2?.[0] || {};
        sessionStorage.setItem("storeInit", JSON.stringify(rd0));
        sessionStorage.setItem("myAccountFlags", JSON.stringify(jsonData.rd1));
        sessionStorage.setItem("CompanyInfoData", JSON.stringify(jsonData.rd2?.[0] || {}));

        setStoreInitData(rd0);
        onStoreInitReady(rd0);
        console.log("✅ ThemeRoutes: Refetch successful");
      }
    } catch (error) {
      console.error("❌ ThemeRoutes: Refetch failed:", error);
    }
  };

  // Paymaster fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPayMaster = sessionStorage.getItem("payMaster");
        if (!storedPayMaster) {
          const payMaster = await fetchPayMaster();
          const res = payMaster?.Data?.rd;
          sessionStorage.setItem("payMaster", JSON.stringify(res));
        }
      } catch (error) {
        console.error("Error fetching or retrieving payMaster:", error);
      }
    };

    const timer = setTimeout(fetchData, 2000); // Reduced delay
    return () => clearTimeout(timer);
  }, []);

  const callApiAndStore = (apiFunction, storageKey, finalID) => {
    apiFunction(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          sessionStorage.setItem(storageKey, JSON.stringify(response.Data.rd));
        }
      })
      .catch((err) => console.log(err));
  };

  const callAllApi = () => {
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    if (!storeInit) return; // Stop if empty

    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
    const visiterID = Cookies.get("visiterId");

    const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";

    // Call all APIs in parallel
    Promise.all([callApiAndStore(MetalTypeComboAPI, "metalTypeCombo", finalID), callApiAndStore(DiamondQualityColorComboAPI, "diamondQualityColorCombo", finalID), callApiAndStore(MetalColorCombo, "MetalColorCombo", finalID), callApiAndStore(ColorStoneQualityColorComboAPI, "ColorStoneQualityColorCombo", finalID), callApiAndStore(CurrencyComboAPI, "CurrencyCombo", finalID), callApiAndStore(CountryCodeListApi, "CountryCodeListApi", finalID), callApiAndStore(RegisterMasterApi, "B2BRegisterMasterApi", finalID)])
      .then(() => {
        console.log("All combo APIs completed");
      })
      .catch((error) => {
        console.error("Error in API calls:", error);
      });
  };

  useEffect(() => {
    const storedMenu = sessionStorage.getItem("DyamicMenuList");
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser")) ?? false;

    if (LoginUser === false) {
      return;
    } else {
      if (REACT_APP_WEB === "elvee.web" && !IsSetupFor) {
        if (storedMenu) return;

        // Build dynamic ID
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit") || "{}");
        const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail") || "{}");
        const LoginUser = JSON.parse(sessionStorage.getItem("LoginUser") || "false");
        const visiterID = Cookies.get("visiterId");

        const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";

        // Call API because it does NOT exist in session
        callApiAndStore(GETProductType, "DyamicMenuList", finalID);
      }
    }
  }, []); // Runs only once on mount

  return (
    <>
      {/* Render metadata immediately with fallback */}
      {storeInitData?.DomainForNo == 2 ? <MetaData1 storeInitData={storeInitData} title={title} /> : <MetaData2 title={title} />}

      {/* Render theme immediately based on detected/current theme */}
      <Themes themeNumber={currentTheme} />
    </>
  );
}

const MetaData1 = ({ title, storeInitData }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link rel="icon" href={storeInitData?.favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={storeInitData?.favicon} />
      <link rel="icon" type="image/png" sizes="192x192" href={storeInitData?.favicon} />
      <link rel="icon" type="image/png" sizes="512x512" href={storeInitData?.favicon} />
      <link rel="mask-icon" href={storeInitData?.favicon} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={storeInitData?.favicon} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};

const MetaData2 = ({ title, isHaveSub = false }) => {
  const MetaPath = isHaveSub ? `logoIcon/sona/` : `logoIcon/`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link rel="icon" href={`${storImagePath()}/${MetaPath}favicon1.png`} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`${storImagePath()}/${MetaPath}androidCh1.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <link rel="mask-icon" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};

const Themes = ({ themeNumber }) => {
  return (
    <>
      <ThemePicker themeNo={themeNumber} />
    </>
  );
};
