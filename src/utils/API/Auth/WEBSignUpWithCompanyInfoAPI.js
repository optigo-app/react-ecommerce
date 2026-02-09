import { CommonAPI } from "../CommonAPI/CommonAPI";

export const WEBSignUpWithCompanyInfoAPI = async (companyInfo) => {
  try {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { FrontEnd_RegNo } = storeInit;

    const formData = new FormData();

    formData.append("con", '{"id":"","mode":"WEBSignUpWithCompanyInfo"}');
    formData.append("mode", "WEBSignUpWithCompanyInfo");
    formData.append("f", "WEBSignUpWithCompanyInfo");

    const Document = [
        Object.fromEntries(
          Object.values(companyInfo?.documents || {}).map((doc) => [doc.type, doc.number || ""])
        )
      ];

  
    const payload = {
      CompanyName: companyInfo?.company_name || "",
      TypeOfEntityId: companyInfo?.entity_type || "",
      CompnayTypeId: companyInfo?.industry_category || "",
      GSTNo: companyInfo?.gst_number || "",
      PanNo: companyInfo?.pan_number || "",
      IECCode: companyInfo?.iec_code || "",
      AddressLine1: companyInfo?.address_line || "",
      city: companyInfo?.city || "",
      state: companyInfo?.state || "",
      country: companyInfo?.country || "",
      zip: companyInfo?.pincode || "",
      firstname: companyInfo?.first_name || "",
      lastname: companyInfo?.last_name || "",
      userid: companyInfo?.email || "",
      country_code:  companyInfo?.mobileCountry || "",
      mobileno: companyInfo?.mobileNo || "",
      pass: companyInfo?.password || "",
      FrontEnd_RegNo: FrontEnd_RegNo || "",
      Customerid: "0",
      Document: Document,
    };

    formData.append("dp", JSON.stringify(payload));
     
    Object.entries(companyInfo?.documents || {})?.forEach(([key, value]) => {
      formData.append(value?.type, value?.file);
    });

    const res = await CommonAPI(formData);
    return res?.Data?.rd?.[0];
  } catch (error) {
    console.error("RegisterErr", error);
    return null;
  }
};
