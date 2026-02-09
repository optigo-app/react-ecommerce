import React, { useMemo } from "react";
import Register from "./Register";
import CustomerKYCForm from "./CompanyRegister";

const Main = () => {
  const storeInit = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("storeInit");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      console.error("Failed to parse storeInit:", err);
      return null;
    }
  }, []);
  if (storeInit?.IsSignUpWithCompanyInfo === 1) {
    return <CustomerKYCForm />;
  } else {
    return <Register />;
  }
};

export default Main;
