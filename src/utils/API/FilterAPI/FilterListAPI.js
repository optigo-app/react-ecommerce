import { CommonAPI } from "../CommonAPI/CommonAPI"
import { REACT_APP_WEB } from "../../../env";
import { IsSetupFor } from "../../../AllTheme/Elveester/Components/Recoil/atom";


export const FilterListAPI = async (mainData, visiterId) => {

  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"))
  let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"))
  let menuparams = JSON.parse(sessionStorage.getItem("menuparams"))
  let userEmail = sessionStorage.getItem("registerEmail")
  const selectedTab = sessionStorage?.getItem("selectedTabPersistence") ?? "";

  const islogin = JSON.parse(sessionStorage.getItem("LoginUser")) ?? false;

  const customerId = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null ? visiterId : loginInfo?.id ?? 0;
  const customerEmail = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null ? visiterId : loginInfo?.userid ?? "";

  let MenuParams = {};

  let serachVar = ""

  if (Array.isArray(mainData)) {
    if (mainData?.length > 0) {
      Object.values(mainData[0]).forEach((ele, index) => {
        let keyName = `FilterKey${index === 0 ? '' : index}`;
        MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })

      Object.values(mainData[1]).forEach((ele, index) => {
        let keyName = `FilterVal${index === 0 ? '' : index}`;
        MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })
    }
  } else {
    if (mainData !== "") {

      if (mainData?.split("=")[0] == "S") {

        serachVar = JSON.parse(atob(mainData.split("=")[1]))
      } else {
        MenuParams.FilterKey = atob(mainData)
        MenuParams.FilterVal = atob(mainData)
      }

      if (mainData?.split("=")[0] !== "S") {
        if (atob(mainData)?.split("=")[0] == "AlbumName") {
          MenuParams.FilterKey = atob(mainData)?.split("=")[0]
          MenuParams.FilterVal = atob(mainData)?.split("=")[1]
        } else {
          MenuParams.FilterKey = atob(mainData)
          MenuParams.FilterVal = atob(mainData)
        }
      }
    }
  }




  const safeLower = (v) => String(v || "").toLowerCase().trim();

const isAutoCollection =
  safeLower(MenuParams?.FilterKey) === "auto" &&
  safeLower(MenuParams?.FilterKey1) === "collection" || safeLower(MenuParams?.FilterKey) === "auto";

  
  const isCollectionAndCategory = safeLower(MenuParams?.FilterKey) === "Category" || safeLower(MenuParams?.FilterKey) === "Collection" ;


  const isNewArrival =
    safeLower(MenuParams?.FilterKey) === "newarrival";

  const shouldPassMenuFilter =
    REACT_APP_WEB === "elvee.web" &&  !IsSetupFor &&
    // !isAutoCollection &&
    // isCollectionAndCategory && 
    // !isNewArrival &&
    Boolean(selectedTab); // prevents empty tab leaks




  const data = {
    "PackageId": `${loginInfo?.PackageId ?? storeinit?.PackageId}`,
    "autocode": "",
    "FrontEnd_RegNo": `${storeinit?.FrontEnd_RegNo}`,
    "Customerid": `${customerId ?? 0}`,
    "FilterKey": `${MenuParams?.FilterKey ?? ""}`,
    "FilterVal": `${MenuParams?.FilterVal ?? ""}`,
    "FilterKey1": `${MenuParams?.FilterKey1 ?? ""}`,
    "FilterVal1": `${MenuParams?.FilterVal1 ?? ""}`,
    "FilterKey2": `${MenuParams?.FilterKey2 ?? ""}`,
    "FilterVal2": `${MenuParams?.FilterVal2 ?? ""}`,
    SearchKey: `${serachVar?.b ?? ""}`,
    CurrencyRate: `${loginInfo?.CurrencyRate ?? storeinit?.CurrencyRate}`,
    DomainForNo: `${storeinit?.DomainForNo ?? ""}`,
    ...(shouldPassMenuFilter && {
      MenuFilterKey: "product_type",
      MenuFilterVal: selectedTab,
    }),

  }
  let encData = btoa(JSON.stringify(data))

  let body = {
    "con": `{\"id\":\"\",\"mode\":\"GETFILTERLIST\",\"appuserid\":\"${customerEmail ?? ""}\"}`,
    "f": "onClickofMenuList (GETFILTERLIST)",
    "dp": JSON.stringify(data),
    "p": encData
  }

  let finalfilterData

  await CommonAPI(body).then((res) => {
    if (res) {
      // console.log("res",res);
      sessionStorage.setItem("AllFilter", JSON.stringify(res?.Data?.rd));
      finalfilterData = res?.Data?.rd
    }
  })
  return finalfilterData
}

