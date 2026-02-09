import { CommonAPI } from "../CommonAPI/CommonAPI";


export const RegisterMasterApi = async (finalID) => {
    let response;
    try {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail')) || '0';
        const islogin = JSON.parse(sessionStorage.getItem("LoginUser")) ?? false;

        const { FrontEnd_RegNo } = storeInit;

        const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null ? finalID : loginUserDetail?.id ?? 0;
        const combinedValue = JSON.stringify({ FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerId ?? 0}` });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"GetRegistrationFormCombo\",\"appuserid\":\"0\"}",
            "f": "m-test2.orail.co.in (UpdateQuantity)",
            "p": encodedCombinedValue,
        }
        response = await CommonAPI(body);
    } catch (error) {
        console.error('Error:', error);
    }
    const res = {
        Data : {
            rd : response?.Data
        }
    }
    return res
}