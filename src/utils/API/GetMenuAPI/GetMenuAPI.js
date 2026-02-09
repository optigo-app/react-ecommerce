import { CommonAPI } from "../CommonAPI/CommonAPI";

export const GetMenuAPI = async (finalID, MenuFilterKey) => {
    let response;
    try {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? {};
        const email = sessionStorage.getItem("registerEmail") ?? "";

        const dpObj = {
            FrontEnd_RegNo: storeInit?.FrontEnd_RegNo,
            Customerid: finalID
        };

        if (MenuFilterKey) {
            dpObj.MenuFilterKey = "product_type";
            dpObj.MenuFilterVal = MenuFilterKey;
        }

        const body = {
            con: `{"id":"","mode":"GETMENU","appuserid":"${email}"}`,
            f: "onload (GETMENU)",
            dp: JSON.stringify(dpObj)
        };

        response = await CommonAPI(body);
    } catch (error) {
        console.error("Error:", error);
    }

    return response;
};

// import { CommonAPI } from "../CommonAPI/CommonAPI";

// export const GetMenuAPI = async (finalID ,MenuFilterKey) => {
//     let response;
//     try {
//         const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
//         const email = sessionStorage.getItem("registerEmail") ?? ""
//         const body = {
//             // con: "{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"nimesh@ymail.in\"}",
//             con: `{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"${email}\"}`,
//             f: "onload (GETMENU)",
//             // p: pEnc
//             dp:`{\"FrontEnd_RegNo\":\"${storeInit?.FrontEnd_RegNo}\",\"Customerid\":\"${finalID}\",\"MenuFilterKey\":\"product_type\",\"MenuFilterVal\":\"${MenuFilterKey}\"}`
//         }

//         response = await CommonAPI(body);
//     } catch (error) {
//         console.error('Error:', error);
//     }

//     return response;

// }

// import { CommonAPI } from "../CommonAPI/CommonAPI";

// export const GetMenuAPI = async (finalID) => {
//     let response;
//     try {
//         const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
//         const email = sessionStorage.getItem("registerEmail") ?? ""
//         const body = {
//             // con: "{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"nimesh@ymail.in\"}",
//             con: `{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"${email}\"}`,
//             f: "onload (GETMENU)",
//             // p: pEnc
//             dp:`{\"FrontEnd_RegNo\":\"${storeInit?.FrontEnd_RegNo}\",\"Customerid\":\"${finalID}\"}`
//         }

//         response = await CommonAPI(body);
//     } catch (error) {
//         console.error('Error:', error);
//     }

//     return response;

// }



