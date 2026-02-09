import { CommonAPI } from "../../CommonAPI/CommonAPI";

export const HomeCategoryApi = async (visiterId) => {
    try {
        // 🧩 Fetch required session values
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        const isLogin = JSON.parse(sessionStorage.getItem("LoginUser")) ?? false;
        const userLogin = sessionStorage.getItem('LoginUser');

        const dataSource = userLogin ? loginUserDetail : storeInit;

        // 👤 Dynamic user context
        const customerId =
            storeInit?.IsB2BWebsite == 0 && (isLogin == false || isLogin == null)
                ? visiterId
                : loginUserDetail?.id ?? 0;

        const customerEmail =
            storeInit?.IsB2BWebsite == 0 && (isLogin == false || isLogin == null)
                ? visiterId
                : loginUserDetail?.userid ?? "";

        const data = {
            FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`,
            Customerid: `${customerId ?? 0}`,
            PackageId: `${dataSource?.PackageId ?? 1}`,
        };

        const encData = JSON.stringify(data);

        const body = {
            con: `{\"id\":\"\",\"mode\":\"GETHomeCategory\",\"appuserid\":\"${customerEmail ?? ""}\"}`,
            f: "PostMan",
            p: btoa(encData),
            dp: encData,
        };

        let response;
        await CommonAPI(body).then((res) => {
            if (res) response = res;
        });

        return response;
    } catch (error) {
        console.error("HomeCategoryApi Error:", error);
        throw error;
    }
};
