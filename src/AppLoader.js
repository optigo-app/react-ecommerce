import React, { useState, useEffect } from "react";
import App from "./App";
import { loadStoreInit } from "./loadInit";
import { REACT_APP_WEB } from "./env";
import { themeEnvConfig } from "./ThemePicker";

export const AppLoader = () => {
  const [status, setStatus] = useState(0);
  const [appKey, setAppKey] = useState(0);
  const { Loader } = themeEnvConfig[REACT_APP_WEB] || themeEnvConfig["fgstore.web"];

  const performInit = async () => {
    console.log("⚙️ AppLoader: Starting Initialization...");
    setStatus(0);
    try {
      const success = await loadStoreInit();
      const isStored = window.__storeInit || sessionStorage.getItem("storeInit");

      if (success && isStored) {
        console.log("✅ AppLoader: Init Success");
        setStatus(1);
      } else {
        console.error("❌ AppLoader: Init Failed or Storage Empty");
        setStatus(2);
      }
    } catch (e) {
      console.error("❌ AppLoader: Exception", e);
      setStatus(2);
    }
  };

  useEffect(() => {
    performInit();
    window.handleAppReset = () => {
      console.log("🔄 Global Reset Triggered!");
      window.history.replaceState(null, "", "/");
      setAppKey((prev) => prev + 1);
      performInit();
    };
    return () => {
      delete window.handleAppReset;
    };
  }, []);

  if (status === 0) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (status === 2) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>❌ Failed to load store configuration.</h2>
        <button className="btn btn-primary mt-3" onClick={performInit}>
          Retry
        </button>
      </div>
    );
  }
  return <App key={appKey} />;
};
