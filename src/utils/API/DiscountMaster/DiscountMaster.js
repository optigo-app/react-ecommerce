import { CommonAPI } from "../CommonAPI/CommonAPI";

export const DiscountMasterAPI = async (finalID) => {
  let response;
  try {
    const storedEmail = sessionStorage.getItem("registerEmail") || "";
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { FrontEnd_RegNo } = storeInit;
    const combinedValue = JSON.stringify({
      FrontEnd_RegNo: `${FrontEnd_RegNo}`,
      Customerid: `${finalID}`,
    });

    const encodedCombinedValue = btoa(combinedValue);
    const body = {
      con: `{\"id\":\"\",\"mode\":\"GetOffer\",\"appuserid\":\"${storedEmail}\"}`,
      f: "m-test2.orail.co.in (UpdateQuantity)",
      p: encodedCombinedValue,
      dp: `{\"FrontEnd_RegNo\":\"${FrontEnd_RegNo}\",\"Customerid\":${finalID}}`,
    };

    response = await CommonAPI(body);
  } catch (error) {
    console.error("Error:", error);
  }
  return response;
};
