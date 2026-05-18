import React, { Suspense, useMemo } from "react";

import { DefaultLoadingFallback, ElveeLoadingFallback, KamalikaJewelssLoadingFallback, LoadingFallback, OjasviLoadingFallback, PacificLoadingFallback, ProcatalogLoadingFallback, SaraffLoadingFallback, ShanthaLoaderFallback, ShinjiniLoadingFallback, ShreeDiamondsLoadingFallback, VaraLoadingFallback } from "./LoadingFallbacks";
import { isThemeActive } from "./AllTheme/HouseOfQuadri/Components/Recoil/atom";

const ForEveryRoutes = React.lazy(() => import("./AllTheme/Forevery/ForeveryRoutes"));
const SmilingRock_App = React.lazy(() => import("./AllTheme/SmilingRock/SmilingRock_App"));
const HouseOfQuadri_App = React.lazy(() => import("./AllTheme/HouseOfQuadri/HouseOfQuadri_App"));
const Elveester_App = React.lazy(() => import("./AllTheme/Elveester/Elveester_App"));
const SmilingRock_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App"));
const Procatalog_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App"));
const DaimondTine_App = React.lazy(() => import("./AllTheme/DaimondTine/DaimondTine_App"));
const StamFordJewels_App = React.lazy(() => import("./AllTheme/StamFordJewels/StamFordJewels_App"));
const MalakanJewels_App = React.lazy(() => import("./AllTheme/MalakanJwewls/MalakanJewels_App"));
const RoopJewellers_App = React.lazy(() => import("./AllTheme/RoopJewellers/RoopJewellers_App"));
const LoveIn_App = React.lazy(() => import("./AllTheme/LoveIn/LoveIn_App"));
const Ornaz_App = React.lazy(() => import("./AllTheme/Ornaz/Ornaz_App"));
const Procatalog_App = React.lazy(() => import("./AllTheme/Pocatalog/Procatalog_App"));
const HemratnaProcatalog_App = React.lazy(() => import("./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App"));

const IsShreeDiamond = true;

const themeConfig = {
  1: { Component: SmilingRock_App, Loader: LoadingFallback },
  2: {
    Component: DaimondTine_App, Loader:
      //  PacificLoadingFallback 
      DefaultLoadingFallback
  },
  3: {
    Component: Elveester_App, Loader:
      // ElveeLoadingFallback
      DefaultLoadingFallback
  },
  4: { Component: SmilingRock_MobileApp_App, Loader: LoadingFallback },
  5: { Component: HemratnaProcatalog_App, Loader: ProcatalogLoadingFallback },
  6: { Component: Procatalog_App, Loader: ProcatalogLoadingFallback },
  7: {
    Component: HouseOfQuadri_App, Loader:
      DefaultLoadingFallback
    // isThemeActive ? ShanthaLoaderFallback : LoadingFallback 
  },
  8: { Component: ForEveryRoutes, Loader: DefaultLoadingFallback },
  9: { Component: Procatalog_MobileApp_App, Loader: ProcatalogLoadingFallback },
  10: { Component: StamFordJewels_App, Loader: OjasviLoadingFallback },
  11: {
    Component: RoopJewellers_App, Loader:
      //  VaraLoadingFallback
      DefaultLoadingFallback
  },
  12: {
    Component: MalakanJewels_App, Loader:
      // IsShreeDiamond ? ShreeDiamondsLoadingFallback : KamalikaJewelssLoadingFallback
      DefaultLoadingFallback
  },
  13: { Component: LoveIn_App, Loader: ShinjiniLoadingFallback },
  14: { Component: Ornaz_App, Loader: ShreeDiamondsLoadingFallback },
};

export const themeEnvConfig = {
  "fgstore.web": {
    Component: SmilingRock_App,
    Loader: LoadingFallback,
  },

  "diamondtine.web": {
    Component: DaimondTine_App,
    Loader:
      //  PacificLoadingFallback 
      DefaultLoadingFallback
  },

  "elvee.web": {
    Component: Elveester_App,
    Loader:
      //  ElveeLoadingFallback,
      DefaultLoadingFallback
  },

  "fgstore.mapp": {
    Component: SmilingRock_MobileApp_App,
    Loader: LoadingFallback,
  },

  "hemratna.web": {
    Component: HemratnaProcatalog_App,
    Loader: ProcatalogLoadingFallback,
  },

  "procatalog.web": {
    Component: Procatalog_App,
    Loader: ProcatalogLoadingFallback,
  },

  "hoq.web": {
    Component: HouseOfQuadri_App,
    // Loader: VaraLoadingFallback,
    // Loader: LoadingFallback,
    Loader:
      DefaultLoadingFallback
    // isThemeActive ? ShanthaLoaderFallback : LoadingFallback,
  },

  "forevery.web": {
    Component: ForEveryRoutes,
    Loader: DefaultLoadingFallback,
  },

  "procatalog.mapp": {
    Component: Procatalog_MobileApp_App,
    Loader: ProcatalogLoadingFallback,
  },

  "stamford.web": {
    Component: StamFordJewels_App,
    Loader: OjasviLoadingFallback,
  },

  "rpjewel.web": {
    Component: RoopJewellers_App,
    // Loader: SaraffLoadingFallback,
    Loader:
      //  VaraLoadingFallback,
      DefaultLoadingFallback
  },

  "malakan.web": {
    Component: MalakanJewels_App,
    // Loader: IsShreeDiamond ? ShreeDiamondsLoadingFallback : KamalikaJewelssLoadingFallback
    Loader: DefaultLoadingFallback
  },

  "lovein.web": {
    Component: LoveIn_App,
    Loader: ShinjiniLoadingFallback,
  },

  "ornaz.web": {
    Component: Ornaz_App,
    Loader: ShreeDiamondsLoadingFallback,
  },
};

const ThemePicker = ({ themeNo }) => {
  const { Component, Loader } = useMemo(() => {
    const selectedTheme = themeConfig[themeNo];
    if (selectedTheme) {
      return selectedTheme;
    }
    console.warn(`Theme number ${themeNo} not found. Loading default.`);
    return {
      Component: SmilingRock_App,
      Loader: DefaultLoadingFallback,
    };
  }, [themeNo]);

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

export default ThemePicker;
