import { CommonAPI } from "../CommonAPI/CommonAPI";

export const GETProductType = async (finalID) => {
  let response;
  try {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? "";
    const email = sessionStorage.getItem("registerEmail") ?? "";
    const islogin = JSON.parse(sessionStorage.getItem("LoginUser"));
    const storedData = sessionStorage.getItem("loginUserDetail");
    const data = JSON.parse(storedData);
    let packageId = (storeInit?.IsB2BWebsite == 0 && islogin == false) || islogin == null ? storeInit?.PackageId : data?.PackageId ?? 0;

    const body = {
      con: `{\"id\":\"\",\"mode\":\"GETProductType\",\"appuserid\":\"${email}\"}`,
      f: "onload (GETMENU SETUP)",
      dp: `{\"FrontEnd_RegNo\":\"${storeInit?.FrontEnd_RegNo}\",\"Customerid\":\"${finalID}\",\"PackageId\":\"${packageId}\"}`,
    };
    response = await CommonAPI(body);
  } catch (error) {
    console.error("Error:", error);
  }

  return response;
};
