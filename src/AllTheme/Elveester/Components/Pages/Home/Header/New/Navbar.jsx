import { useEffect, useRef, useState, useMemo } from "react";
import {
    AppBar, Toolbar, Box, IconButton, Container, Drawer, Typography, useMediaQuery, useTheme, alpha, Badge, Skeleton
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { el_CartCount, el_companyLogo, el_companyLogoM, el_loginState, el_WishCount, IsSetupFor, syncProductListAtom } from "../../../../Recoil/atom";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import MobileMenu from "./MobileMenu";
import RightSideMenu from "./RightSideMenu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GetCountAPI } from "../../../../../../../utils/API/GetCount/GetCountAPI";
import { GetMenuAPI } from "../../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { GETProductType } from "../../../../../../../utils/API/GETProductType/GETProductType";
import SearchBarToggle from "./SearchBarToggle";
import DrawerSearchBar from "./DrawerSearchbar";
import { Masonry } from "@mui/lab";
import { buildMenuItems } from './MenuBuilder';
import { Close as CloseIcon } from "@mui/icons-material";
import { Search as SearchIcon, Heart as FavoriteIcon, Menu as MenuIcon } from "lucide-react";
import { useBroadcaster } from "../../../../utils/BoardCastContext";


const PremiumNavbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const is1400px = useMediaQuery(theme.breakpoints.down("1400"));
    const is768px = useMediaQuery("(max-width:428px)");
    const { broadcast } = useBroadcaster();

    const navigate = useNavigate();
    const navigation = useNavigate();
    const location = useLocation();

    // Recoil State
    const [islogin, setislogin] = useRecoilState(el_loginState);
    const [cartCount, setCartCount] = useRecoilState(el_CartCount);
    const [wishCount, setWishCount] = useRecoilState(el_WishCount);
    const compnyLogo = useRecoilValue(el_companyLogo);
    const compnyLogoM = useRecoilValue(el_companyLogoM);

    // UI State
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [menuLoading, setMenuLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuStack, setMenuStack] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [storeinit, setStoreInit] = useState(null);
    const [DrawerSearchOpen, setDrawerSearchOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const setSyncProductList = useSetRecoilState(syncProductListAtom); // Set the specific data



    // Data State
    const [multiMenuData, setMultiMenuData] = useState({});

    // 1. Dynamic Menu State (Product Types: Diamond, Gold)
    const [DynamicMenu, setDynamicMenu] = useState(() => {
        try {
            const raw = sessionStorage.getItem("DyamicMenuList");
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    });

    // 2. Selected Tab State
    const [selectedProductType, setSelectedProductType] = useState(() => {
        return sessionStorage.getItem("selectedTabPersistence") || null;
    });

    const controls = useAnimation();
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;

    // --- Initial Setup (Logo, Counts, Scroll) ---
    useEffect(() => {
        const GetCompanyLogo = async () => {
            try {
                const value = JSON?.parse(sessionStorage?.getItem("LoginUser"));
                setislogin(value);
                const storeData = JSON?.parse(sessionStorage?.getItem("storeInit"));
                setStoreInit(storeData);
                window.scroll({ behavior: "smooth", top: 0 });
            } catch (error) { console.log(error); }
        };
        GetCompanyLogo();

        const fetchData = async () => {
            try {
                const visiterID = Cookies.get("visiterId");
                const res = await GetCountAPI(visiterID);
                setCartCount(res?.cartcount);
                setWishCount(res?.wishcount);
            } catch (error) { console.error(error); }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (location.pathname === "/") {
            setIsScrolled(window.scrollY > 10);
            const handleScroll = () => setIsScrolled(window.scrollY > 10);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else { setIsScrolled(true); }
    }, [location.pathname]);

    useEffect(() => {
        controls.start({
            backgroundColor: isHovered || isScrolled ? "#ffffff" : "rgba(255,255,255,0)",
            color: isHovered || isScrolled ? "#000000" : "#ffffff",
            boxShadow: isHovered || isScrolled ? "0 6px 30px rgba(0,0,0,0.08)" : "0 0px 0px rgba(0,0,0,0)",
            backdropFilter: isHovered || isScrolled ? "blur(8px)" : "blur(0px)",
            transition: { type: "spring", stiffness: 45, damping: 15, mass: 0.8, duration: 0.8 },
        });
    }, [isHovered, isScrolled, controls]);


    // =========================================================================
    //  STEP 1: FETCH PRODUCT TYPES (Diamond, Gold, etc.)
    // =========================================================================
    useEffect(() => {
        let isMounted = true;

        const fetchProductTypes = async () => {
            // A. Prepare IDs
            let storeinitLocal = JSON.parse(sessionStorage.getItem("storeInit") || "{}");
            let loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
            const visiterID = Cookies.get("visiterId");

            if (islogin && !loginUserDetail) {
                await wait(500);
                loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
            }

            let finalId;
            if (storeinitLocal?.IsB2BWebsite === 0) {
                finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
            } else {
                finalId = loginUserDetail?.id || "0";
            }

            // B. Fetch or Get from Session
            const sessionMenu = sessionStorage.getItem("DyamicMenuList");
            if (sessionMenu && sessionMenu !== "[]" && sessionMenu !== "null") {
                if (isMounted) setDynamicMenu(JSON.parse(sessionMenu));
            } else {
                try {
                    const res = await GETProductType(finalId);
                    if (res?.Data?.rd) {
                        sessionStorage.setItem("DyamicMenuList", JSON.stringify(res.Data.rd));
                        if (isMounted) setDynamicMenu(res.Data.rd);
                    }
                } catch (err) {
                    console.warn("Error fetching Product Types", err);
                }
            }
        };

        fetchProductTypes();

        return () => { isMounted = false; };
    }, [islogin]);


    // =========================================================================
    //  STEP 2: FETCH SPECIFIC MENUS (Only after DynamicMenu exists)
    // =========================================================================
    useEffect(() => {
        let isMounted = true;

        // If no product types, we can't fetch menus.
        if (!DynamicMenu || DynamicMenu.length === 0) {
            setMenuLoading(false);
            return;
        }

        const fetchSpecificMenus = async () => {
            setMenuLoading(true);

            // A. Handle Default Selection IMMEDIATELY
            const savedType = sessionStorage.getItem("selectedTabPersistence");
            const isValidSaved = savedType && DynamicMenu.some(item => item.ProductTypeName === savedType);

            let typeToUse = isValidSaved ? savedType : DynamicMenu[0]?.ProductTypeName;

            if (!selectedProductType || selectedProductType !== typeToUse) {
                if (isMounted) setSelectedProductType(typeToUse);
                sessionStorage.setItem("selectedTabPersistence", typeToUse);
            }

            // B. Prepare IDs (Again, to ensure latest state)
            let storeinitLocal = JSON.parse(sessionStorage.getItem("storeInit") || "{}");
            let loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
            const visiterID = Cookies.get("visiterId");

            let finalId;
            if (storeinitLocal?.IsB2BWebsite === 0) {
                finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
            } else {
                finalId = loginUserDetail?.id || "0";
            }

            // C. Fetch Menus for top 3 items
            const topMenus = DynamicMenu.slice(0, 3);

            const fetchWithRetry = async (menuName, id, retries = 3) => {
                const uniqueCacheKey = `cachedMenu_${menuName}_${id}`;
                const cachedRaw = sessionStorage.getItem(uniqueCacheKey);
                if (cachedRaw) return JSON.parse(cachedRaw);

                try {
                    const res = await GetMenuAPI(id, menuName);
                    const rawData = res?.Data?.rd || [];
                    if (rawData.length > 0) {
                        sessionStorage.setItem(uniqueCacheKey, JSON.stringify(rawData));
                        return rawData;
                    }
                    throw new Error("Empty data");
                } catch (err) {
                    if (retries > 0 && isMounted) {
                        await wait(1000);
                        return fetchWithRetry(menuName, id, retries - 1);
                    }
                    return [];
                }
            };

            try {
                const results = await Promise.all(
                    topMenus.map(async (menuItem) => {
                        const data = await fetchWithRetry(menuItem.ProductTypeName, finalId);
                        return { name: menuItem.ProductTypeName, data: data };
                    })
                );

                if (isMounted) {
                    const processedData = {};
                    results.forEach(res => {
                        processedData[res.name] = buildMenuItems(res.data);
                    });
                    setMultiMenuData(processedData);
                }
            } catch (error) {
                console.error("Critical error in menu fetching:", error);
            } finally {
                if (isMounted) setMenuLoading(false);
            }
        };

        fetchSpecificMenus();

        return () => { isMounted = false; };
    }, [DynamicMenu, islogin]); // DEPENDENCY: Runs when DynamicMenu populates


    const currentMenuItems = useMemo(() => {
        const key = selectedProductType || DynamicMenu?.[0]?.ProductTypeName;
        if (!key) return [];
        return multiMenuData[key] || [];
    }, [selectedProductType, multiMenuData, DynamicMenu]);


    // const handleTabChange = (typeName) => {
    //     setSelectedProductType(typeName);
    //     sessionStorage.setItem("selectedTabPersistence", typeName);
    //     setSyncProductList({
    //       ProductType: typeName,
    //       Source: "navbar",
    //       ts: Date.now(),
    //     });
    // };
    const handleTabChange = (typeName) => {
        if (selectedProductType === typeName) return;

        setSelectedProductType(typeName);
        sessionStorage.setItem("selectedTabPersistence", typeName);

        setSyncProductList({
            ProductType: typeName,
            Source: "navbar",
            ts: Date.now(), // event trigger
        });
    };


    const handelMenu = (param, param1, param2, event, isFilterKey2Ignore) => {
        if (
            param?.menuname === "Collection" &&
            param?.key === "Auto" &&
            param?.value === "" &&
            Object.keys(param1 || {}).length === 0 &&
            Object.keys(param2 || {}).length === 0
        ) {
            event?.preventDefault();
            navigation('/collection')
            return;
        }
        if (
            event?.ctrlKey || // Ctrl key
            event?.shiftKey || // Shift key
            event?.metaKey || // Meta key (Command key on macOS)
            (event?.button && event?.button === 1) // Middle mouse button
        ) {
            return;
        } else {
            event?.preventDefault();
            let finalData = {
                menuname: param?.menuname ?? "",
                FilterKey: param?.key ?? "",
                FilterVal: param?.value ?? "",
                FilterKey1: isFilterKey2Ignore === 1 ? param2?.key ?? "" : param1?.key ?? "",
                FilterVal1: isFilterKey2Ignore === 1 ? param2?.value ?? "" : param1?.value ?? "",
                FilterKey2: isFilterKey2Ignore === 1 ? "" : param2?.key ?? "",
                FilterVal2: isFilterKey2Ignore === 1 ? "" : param2?.value ?? "",
            };
            sessionStorage.setItem("menuparams", JSON.stringify(finalData));

            const queryParameters1 = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].filter(Boolean).join("/");

            const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`]
                // .filter(Boolean)
                .join(",");

            const otherparamUrl = Object.entries({
                b: finalData?.FilterKey,
                g: finalData?.FilterKey1,
                c: finalData?.FilterKey2,
            })
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => value)
                .filter(Boolean)
                .join(",");

            const paginationParam = [`page=${finalData.page ?? 1}`, `size=${finalData.size ?? 50}`].join("&");

            // console.log("otherparamsUrl--", otherparamUrl);

            let menuEncoded = `${queryParameters}/${otherparamUrl}`;
            // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
            const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;

            // let d = new Date();
            // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
            navigate(url);
            setMobileOpen(false);
            setActiveMenu(null);
        }
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        if (mobileOpen) {
            setActiveMenu(null);
            setMenuStack([]);
        }
    };

    const handleMobileMenuClick = (label, hasSubMenu) => {
        if (hasSubMenu) {
            setMenuStack([...menuStack, activeMenu || "main"]);
            setActiveMenu(label);
        }
    };

    const handleMobileBack = () => {
        const newStack = [...menuStack];
        const previousMenu = newStack.pop();
        setMenuStack(newStack);
        setActiveMenu(previousMenu === "main" ? null : previousMenu || null);
    };

    const handleLogout = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        sessionStorage.clear();
        localStorage.removeItem("userToken");
        if (window.handleAppReset) {
            window.handleAppReset();
        } else {
            window.location.reload();
        }
    };

    const searchDataFucn = (searchText) => {
        if (searchText) {
            let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
            let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
            let obj = {
                a: "",
                b: searchText,
                m: loginInfo?.MetalId ?? storeInit?.MetalId,
                d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
                c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
                f: {},
            };
            let encodeObj = btoa(JSON.stringify(obj));
            navigation(`/p/${searchText}?S=${encodeObj}`);
            setSearchOpen(false);
            setDrawerSearchOpen(false);
            setMobileOpen(false);
        }
    };

    const navigateToMenu = (link) => {
        navigate(link);
        setMobileOpen(false);
        setDrawerSearchOpen(false);
        setMobileOpen(false);
    }

    const handleMouseLeave = (index) => {
        setExpandedMenu(null);
        document.body.style.overflow = "auto";
    };

    const tabsData = [
        { id: 0, gradient: { bg: "linear-gradient(135deg, #FFF5F8 0%, #FDECF2 40%, #F8DDE7 100%)", color: "#7A3E55", border: "#f4c7d8", borderDark: "#C97A96" } },
        { id: 1, gradient: { bg: "linear-gradient(135deg, #FFF4DA 0%, #F7E6BC 45%, #E8CF92 100%)", color: "#7A5A21", border: "#e8cf92", borderDark: "#B8933A" } },
        { id: 2, gradient: { bg: "linear-gradient(135deg, #F1FFF7 0%, #E2F7ED 45%, #CFF2DF 100%)", color: "#2A6F56", border: "#b4e4cc", borderDark: "#4C9B7A" } },
    ];

    const activeTabIndex = useMemo(() => {
        return DynamicMenu?.slice(0, 3)?.findIndex(item => item.ProductTypeName === selectedProductType);
    }, [DynamicMenu, selectedProductType]);

    const activeTabStyle = tabsData[activeTabIndex] || {};


    return (
        <>
            <motion.div animate={controls} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} style={{ position: "sticky", top: 0, zIndex: 999 }}>
                <AppBar position="sticky" elevation={0} sx={{ bgcolor: "transparent !important", top: 0 }}>
                    <Container maxWidth={false} disableGutters sx={{ width: "100%", px: 0 }}>
                        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 4 }, minHeight: { xs: 64, sm: 82 }, bgcolor: "transparent !important", color: isHovered || isScrolled ? "#000" : "#fff" }}>

                            {searchOpen && <SearchBarToggle searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchDataFucn={searchDataFucn} />}


                            {!isMobile && is1400px && (
                                <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={handleDrawerToggle} sx={{ "&:active": { backgroundColor: 'transparent' }, "&:hover": { bgcolor: alpha("#000", 0.05), backgroundColor: 'transparent' }, color: isHovered || isScrolled ? "#000" : "#fff", transition: "all 0.3s ease", flex: 1, justifyContent: 'flex-start' }} >
                                    <MenuIcon />
                                </IconButton>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: (!isMobile && is1400px) ? 'center' : 'flex-start' }}>
                                {isMobile && (
                                    <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={handleDrawerToggle} sx={{ "&:active": { backgroundColor: 'transparent' }, "&:hover": { bgcolor: alpha("#000", 0.05), backgroundColor: 'transparent' }, color: isHovered || isScrolled ? "#000" : "#fff", transition: "all 0.3s ease", }} >
                                        <MenuIcon size={22} />
                                    </IconButton>
                                )}
                                <Box component={Link} to="/">
                                    <Box component="img" src={compnyLogo} alt="SHAYN" sx={{ width: IsSetupFor ? "150px" : "110px", cursor: "pointer" }} className="el_without_headerLogo_side" />
                                </Box>
                            </Box>


                            {islogin && (<Box>
                                <Box>
                                    {!isMobile && !is1400px && (
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, py: 1, }} >
                                            {DynamicMenu?.slice(0, 3).map((item, i) => {
                                                const isActive = selectedProductType === item.ProductTypeName;
                                                return (
                                                    <Box key={item.ProductTypeName} onClick={() => handleTabChange(item.ProductTypeName)} sx={{ position: "relative", px: 1.5, py: 0.6, cursor: "pointer", borderRadius: 999, overflow: "hidden", }} >
                                                        {isActive && (
                                                            <motion.div layoutId="productType-pill" transition={{ type: "spring", stiffness: 420, damping: 30, }} style={{ position: "absolute", inset: 0, borderRadius: 999, background: tabsData[i]?.gradient.bg, color: tabsData[i]?.gradient.color, zIndex: 0, }} />
                                                        )}
                                                        <Typography sx={{ position: "relative", zIndex: 1, fontSize: "0.72rem", fontWeight: isActive ? 700 : 500, letterSpacing: 1, textTransform: "uppercase", color: isHovered || isScrolled ? isActive ? "#000" : "#6f6f6f" : isActive ? tabsData[i]?.gradient.color : "rgba(255,255,255,0.75)", transition: "color 0.2s ease", userSelect: "none", }} >
                                                            {item.ProductTypeName}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    )}
                                </Box>

                                <Box>
                                    {!isMobile && !is1400px && (
                                        <>
                                            <Box sx={{ display: "flex", gap: 0.5, flex: 1, justifyContent: "center" }}>
                                                {menuLoading ? (
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        {[1, 2, 3, 4, 5].map((item) => (
                                                            <Skeleton key={item} variant="rectangular" width={100} height={30} sx={{ borderRadius: 6, bgcolor: 'rgba(182, 182, 182, 0.62)' }} />
                                                        ))}
                                                    </Box>
                                                ) :
                                                    currentMenuItems?.map((item, index) => (
                                                        <Box key={index} onMouseEnter={() => setHoveredItem(item?.menuname)} onMouseLeave={() => setHoveredItem(null)} sx={{ position: "relative" }} >
                                                            <Box component={Link} onClick={(e) => { handelMenu({ menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }, {}, {}, e, item?.IsFilterKey1Ignore); handleMouseLeave(); setHoveredItem(null); }} sx={{ px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.84rem", fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative", color: isHovered || isScrolled ? "#000" : "#fff", "&::after": { content: '""', position: "absolute", top: 45, left: "50%", transform: "translateX(-50%)", width: hoveredItem === item?.menuname ? "80%" : "0%", height: 2, background: activeTabStyle?.gradient?.borderDark || "#000", transition: "width 0.3s ease", }, outline: "none", boxShadow: "none", "&:hover": { color: isHovered || isScrolled ? "#000" : "#fff", }, }} >
                                                                {item?.menuname}
                                                            </Box>

                                                            <AnimatePresence>
                                                                {item.param1 && hoveredItem === item?.menuname && (
                                                                    <>
                                                                        <Box sx={{ position: "fixed", top: "100%", left: "50%", transform: "translateX(-50%)", mt: 0, width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" }, maxWidth: "1400px", height: "24px", boxShadow: "none", bgcolor: "transparent" }} onMouseEnter={() => setHoveredItem(item?.menuname)} onMouseLeave={() => setHoveredItem(null)} />
                                                                        <Box onMouseEnter={() => setHoveredItem(item?.menuname)} onMouseLeave={() => setHoveredItem(null)} sx={{ position: "fixed", top: "100%", left: "50%", transform: "translateX(-50%)", mt: 1, bgcolor: "#fff", borderRadius: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" }, maxWidth: "1400px", maxHeight: "80vh", minHeight: "400px", overflowY: "auto", display: "flex", zIndex: 1300, animation: "fadeIn 0.25s ease", scrollbarWidth: "thin", scrollbarColor: "#bfbfbf transparent", "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#bfbfbf", borderRadius: "10px" }, "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "20px", background: `radial-gradient( ellipse at top, ${activeTabStyle?.gradient?.color}90, transparent )`, filter: "blur(55px)", pointerEvents: "none", borderTopLeftRadius: 8, borderTopRightRadius: 8, }, }} >
                                                                            <Box sx={{ flex: "1 1 auto", bgcolor: "#fff", p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
                                                                                <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={1} sx={{ alignContent: "center", alignItems: "center", }} >
                                                                                    {item?.param1?.map((section, index) => (
                                                                                        <Box key={index} sx={{ breakInside: "avoid", marginBottom: 2, textAlign: "center", }}>
                                                                                            <Typography component={Link} onClick={(e) => { e.stopPropagation(); handelMenu({ menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }, { key: section?.param1name, value: section?.param1dataname }, {}, e, section?.IsFilterKey1Ignore); setHoveredItem(null); }} sx={{ position: "relative", color: section?.menuname === "Collection" ? "#535353" : "#141414", fontWeight: section?.menuname === "Collection" ? 400 : 700, display: "block", letterSpacing: 0.5, textTransform: "capitalize", mb: section?.menuname === "Collection" ? 0 : 1, wordWrap: "break-word", cursor: "pointer", textUnderlineOffset: "0.3rem", "&:hover": { textDecoration: "underline", textUnderlineOffset: "0.3rem" }, fontSize: "0.92rem", }} >
                                                                                                {section?.param1dataname}
                                                                                            </Typography>
                                                                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, alignItems: 'center' }}>
                                                                                                {section?.param2?.filter(p => p?.param2dataname && p?.param2dataname.trim() !== "").map((param2Item, param2Index) => (
                                                                                                    <Box key={param2Index} onClick={(e) => { e.stopPropagation(); handelMenu({ menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }, { key: section?.param1name, value: section?.param1dataname }, { key: param2Item?.param2name, value: param2Item?.param2dataname }, e, param2Item?.IsFilterKey2Ignore); setHoveredItem(null); }} component={Link} sx={{ position: "relative", textAlign: "left", px: 0, color: "#535353", bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.88rem", textDecoration: "none", borderRadius: 1, transition: "all 0.2s ease", "&:hover": { color: "#141414", textDecoration: "underline", textUnderlineOffset: "0.3rem" }, outline: "none", }} >
                                                                                                        {param2Item?.param2dataname}
                                                                                                    </Box>
                                                                                                ))}
                                                                                            </Box>
                                                                                        </Box>
                                                                                    ))}
                                                                                </Masonry>
                                                                            </Box>
                                                                        </Box>
                                                                    </>
                                                                )}
                                                            </AnimatePresence>
                                                        </Box>
                                                    ))}

                                                {
                                                    !menuLoading && (
                                                        islogin && (
                                                            <>
                                                                <Box sx={{ position: "relative" }}>
                                                                    <Box component={Link} to="/p/NewArrival/?N=TmV3QXJyaXZhbA==" sx={{ px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative", color: isHovered || isScrolled ? "#000" : "#fff", outline: "none", boxShadow: "none" }} >
                                                                        New Arrivals
                                                                    </Box>
                                                                </Box>
                                                                <Box sx={{ position: "relative" }}>
                                                                    <Box component={Link} to="/offers" sx={{ px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative", color: isHovered || isScrolled ? "#000" : "#fff", outline: "none", boxShadow: "none" }} >
                                                                        Offers
                                                                    </Box>
                                                                </Box>
                                                            </>
                                                        ))}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Box>)}

                            <RightSideMenu setSearchOpen={setSearchOpen} IsB2BWebsiteChek={IsB2BWebsiteChek} storeinit={storeinit} handleLogout={handleLogout} DynamicMenu={DynamicMenu?.slice(0, 3)} handleTabChange={handleTabChange} islogin={islogin} isMobile={isMobile} cartCount={cartCount} wishCount={wishCount} is768px={is768px} navigate={navigate} isHovered={isHovered} isScrolled={isScrolled} />
                        </Toolbar>
                    </Container>
                </AppBar>
            </motion.div>

            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{ "& .MuiDrawer-paper": { width: { xs: "90%", sm: 380 }, maxWidth: "100%", }, }} >
                {DrawerSearchOpen && <DrawerSearchBar setSearchOpen={setDrawerSearchOpen} searchDataFucn={searchDataFucn} />}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: `1px solid ${alpha("#fff", 0.1)}` }}>
                    <Box component="img" src={compnyLogoM} alt="SHAYN" sx={{
                        width: IsSetupFor ? '110px' : 'auto'
                    }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        {islogin && <IconButton onClick={() => setDrawerSearchOpen((prev) => !prev)} sx={{ color: "#000" }}><SearchIcon style={{ fontSize: "18px", color: "inherit" }} /></IconButton>}
                        {islogin && <IconButton sx={{ color: "#000" }} onClick={() => navigateToMenu("/myWishList")}><Badge badgeContent={wishCount || 10} color="error"><FavoriteIcon style={{ fontSize: "18px", color: "inherit" }} /></Badge></IconButton>}
                        <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
                    </Box>
                </Box>

                <MobileMenu
                    activeMenu={activeMenu}
                    menuItems={currentMenuItems.length > 0 ? currentMenuItems : []}
                    handleMobileMenuClick={handleMobileMenuClick}
                    handleMobileBack={handleMobileBack}
                    handelMenu={handelMenu}
                    islogin={islogin}
                    storeinit={storeinit}
                    IsB2BWebsiteChek={IsB2BWebsiteChek}
                    DynamicMenu={DynamicMenu}
                    selectedProductType={selectedProductType}
                    handleTabChange={handleTabChange}
                />
            </Drawer>
        </>
    );
};

export default PremiumNavbar;

// import { useEffect, useRef, useState, useMemo } from "react";
// import {
//     AppBar, Toolbar, Box, IconButton, Container, Drawer, Typography, useMediaQuery, useTheme, alpha, Badge, Button,
//     Skeleton
// } from "@mui/material";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { el_CartCount, el_companyLogo, el_companyLogoM, el_loginState, el_WishCount } from "../../../../Recoil/atom";
// import { AnimatePresence, motion, useAnimation } from "framer-motion";
// import MobileMenu from "./MobileMenu";
// import RightSideMenu from "./RightSideMenu";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import { GetCountAPI } from "../../../../../../../utils/API/GetCount/GetCountAPI";
// import { GetMenuAPI } from "../../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
// import SearchBarToggle from "./SearchBarToggle";
// import DrawerSearchBar from "./DrawerSearchbar";
// import { Masonry } from "@mui/lab";
// import { buildMenuItems } from './MenuBuilder';
// import { Close as CloseIcon } from "@mui/icons-material";
// import { Search as SearchIcon, Heart as FavoriteIcon, User as PersonIcon, ShoppingCart as ShoppingBagIcon, LogOut } from "lucide-react";
// import { Menu as MenuIcon } from "lucide-react";


// const PremiumNavbar = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
//     const is1400px = useMediaQuery(theme.breakpoints.down("1400"));
//     const is768px = useMediaQuery("(max-width:428px)");

//     const navigate = useNavigate();
//     const navigation = useNavigate();
//     const location = useLocation();

//     // Recoil State
//     const [islogin, setislogin] = useRecoilState(el_loginState);
//     const [cartCount, setCartCount] = useRecoilState(el_CartCount);
//     const [wishCount, setWishCount] = useRecoilState(el_WishCount);
//     const compnyLogo = useRecoilValue(el_companyLogo);
//     const compnyLogoM = useRecoilValue(el_companyLogoM);
//     const [expandedMenu, setExpandedMenu] = useState(null);
//     const [menuLoading, setMenuLoading] = useState(true);

//     // Local State
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [menuStack, setMenuStack] = useState([]);
//     const [hoveredItem, setHoveredItem] = useState(null);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const [storeinit, setStoreInit] = useState(null);
//     const [DrawerSearchOpen, setDrawerSearchOpen] = useState(false);
//     const [searchOpen, setSearchOpen] = useState(false);
//     const [multiMenuData, setMultiMenuData] = useState({});

//     const controls = useAnimation();
//     const isMounted = useRef(false);

//     // 1. Get Dynamic Menu List
//     const DynamicMenu = useMemo(() => {
//         try {
//             const raw = sessionStorage.getItem("DyamicMenuList");
//             if (!raw) return null;
//             return JSON.parse(raw);
//         } catch (err) {
//             console.warn("Invalid DyamicMenuList:", err);
//             return null;
//         }
//     }, []);

//     const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
//     // NEW: Selected Product Type State (Default to first one later)
//     // 1. Initialize State: Try to get from SessionStorage first, otherwise null
//     const [selectedProductType, setSelectedProductType] = useState(() => {
//         return sessionStorage.getItem("selectedTabPersistence") || null;
//     });

//     // 2. Robust Logic: Validate Selection or Force Index 0
//     useEffect(() => {
//         if (DynamicMenu && DynamicMenu.length > 0) {
//             const savedType = sessionStorage.getItem("selectedTabPersistence");

//             const isValidSaved = savedType && DynamicMenu.some(item => item.ProductTypeName === savedType);

//             if (isValidSaved) {
//                 if (selectedProductType !== savedType) {
//                     setSelectedProductType(savedType);
//                 }
//             } else {
//                 const defaultType = DynamicMenu[0]?.ProductTypeName;
//                 setSelectedProductType(defaultType);
//                 sessionStorage.setItem("selectedTabPersistence", defaultType);
//             }
//         }
//     }, [DynamicMenu]); // This ensures it runs whenever the menu list loads or changes

//     // Data State


//     const GetCompanyLogo = async () => {
//         try {
//             const value = JSON?.parse(sessionStorage?.getItem("LoginUser"));
//             setislogin(value);
//             const storeData = JSON?.parse(sessionStorage?.getItem("storeInit"));
//             setStoreInit(storeData);
//             window.scroll({ behavior: "smooth", top: 0 });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const visiterID = Cookies.get("visiterId");
//                 const res = await GetCountAPI(visiterID);
//                 setCartCount(res?.cartcount);
//                 setWishCount(res?.wishcount);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         GetCompanyLogo();
//     }, []);

//     useEffect(() => {
//         if (location.pathname === "/") {
//             setIsScrolled(window.scrollY > 10);
//             const handleScroll = () => setIsScrolled(window.scrollY > 10);
//             window.addEventListener("scroll", handleScroll);
//             return () => window.removeEventListener("scroll", handleScroll);
//         } else {
//             setIsScrolled(true);
//         }
//         setIsScrolled(true);
//     }, [location.pathname]);

//     useEffect(() => {
//         controls.start({
//             backgroundColor: isHovered || isScrolled ? "#ffffff" : "rgba(255,255,255,0)",
//             color: isHovered || isScrolled ? "#000000" : "#ffffff",
//             boxShadow: isHovered || isScrolled ? "0 6px 30px rgba(0,0,0,0.08)" : "0 0px 0px rgba(0,0,0,0)",
//             backdropFilter: isHovered || isScrolled ? "blur(8px)" : "blur(0px)",
//             transition: { type: "spring", stiffness: 45, damping: 15, mass: 0.8, duration: 0.8 },
//         });
//     }, [isHovered, isScrolled, controls]);

//     // =========================================================================
//     //  FETCH DATA & SET DEFAULT TAB
//     // =========================================================================


//     const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//     useEffect(() => {
//         let isMounted = true; // Flag to prevent setting state on unmounted component

//         const fetchAllMenus = async () => {
//             if (isMounted) setMenuLoading(true);

//             let storeinitLocal = JSON.parse(sessionStorage.getItem("storeInit"));
//             let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
//             const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//             const visiterID = Cookies.get("visiterId");

//             if (islogin && !loginUserDetail) {
//                 await wait(500); // Wait 500ms for storage to populate
//                 loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail")); // Try reading again
//             }

//             // Ensure we have a valid ID before fetching.
//             // If logged in but no details yet, we might need to wait (handled by retry).
//             let finalId;
//             if (storeinitLocal?.IsB2BWebsite === 0) {
//                 finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
//             } else {
//                 finalId = loginUserDetail?.id || "0";
//             }

//             // Retry Logic Function
//             const fetchWithRetry = async (menuName, id, retries = 3) => {
//                 const uniqueCacheKey = `cachedMenu_${menuName}_${id}`; // key now includes ID to prevent stale guest data

//                 // 1. Check Cache
//                 const cachedRaw = sessionStorage.getItem(uniqueCacheKey);
//                 if (cachedRaw) {
//                     return JSON.parse(cachedRaw);
//                 }

//                 // 2. Fetch from API
//                 try {
//                     const res = await GetMenuAPI(id, menuName);
//                     const rawData = res?.Data?.rd || [];

//                     // If we got data, cache it
//                     if (rawData.length > 0) {
//                         sessionStorage.setItem(uniqueCacheKey, JSON.stringify(rawData));
//                         return rawData;
//                     } else {
//                         throw new Error("Empty data"); // Trigger retry if essential data is missing
//                     }
//                 } catch (err) {
//                     if (retries > 0) {
//                         console.log(`Retrying menu ${menuName}... attempts left: ${retries}`);
//                         await wait(1000); // Wait 1 second before retrying
//                         return fetchWithRetry(menuName, id, retries - 1);
//                     } else {
//                         console.warn(`Failed to fetch ${menuName} after retries`, err);
//                         return [];
//                     }
//                 }
//             };

//             const shouldFetch = storeinitLocal?.IsB2BWebsite === 0 || (storeinitLocal?.IsB2BWebsite === 1 && isUserLogin === true);

//             if (shouldFetch && DynamicMenu && DynamicMenu.length > 0) {
//                 // Ensure default tab
//                 if (!selectedProductType) {
//                     setSelectedProductType(DynamicMenu[0]?.ProductTypeName);
//                 }

//                 const topMenus = DynamicMenu.slice(0, 3);

//                 try {
//                     const results = await Promise.all(
//                         topMenus.map(async (menuItem) => {
//                             const data = await fetchWithRetry(menuItem.ProductTypeName, finalId);
//                             return { name: menuItem.ProductTypeName, data: data };
//                         })
//                     );

//                     // 5. SAFETY CHECK: Only update state if mounted
//                     if (isMounted) {
//                         const processedData = {};
//                         results.forEach(res => {
//                             processedData[res.name] = buildMenuItems(res.data);
//                         });
//                         setMultiMenuData(processedData);
//                     }
//                 } catch (error) {
//                     console.error("Critical error:", error);
//                 } finally {
//                     if (isMounted) {
//                         setMenuLoading(false);
//                     }
//                 }
//             } else {
//                 if (isMounted) {
//                     setMenuLoading(false);
//                 }
//             }
//         };

//         fetchAllMenus();
//         console.log("rendered");

//         return () => { isMounted = false; };

//     }, [islogin, DynamicMenu]);

//     // useEffect(() => {
//     //     if (!isMounted.current) {
//     //         isMounted.current = true;
//     //         return;
//     //     }

//     //     const fetchAllMenus = async () => {
//     //         setMenuLoading(true);
//     //         let storeinitLocal = JSON.parse(sessionStorage.getItem("storeInit"));
//     //         let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
//     //         const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     //         const visiterID = Cookies.get("visiterId");

//     //         const shouldFetch = storeinitLocal?.IsB2BWebsite === 0 || (storeinitLocal?.IsB2BWebsite === 1 && isUserLogin === true);

//     //         if (shouldFetch && DynamicMenu && DynamicMenu.length > 0) {
//     //             // Set default selected tab if not set
//     //             if (!selectedProductType) {
//     //                 setSelectedProductType(DynamicMenu[0]?.ProductTypeName);
//     //             }

//     //             const topMenus = DynamicMenu.slice(0, 3);

//     //             let finalId;
//     //             if (storeinitLocal?.IsB2BWebsite === 0) {
//     //                 finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
//     //             } else {
//     //                 finalId = loginUserDetail?.id || "0";
//     //             }

//     //             try {
//     //                 const fetchPromises = topMenus.map(async (menuItem) => {
//     //                     const menuName = menuItem.ProductTypeName;
//     //                     const sessionKey = `cachedMenu_${menuName}`;

//     //                     const cachedRaw = sessionStorage.getItem(sessionKey);
//     //                     if (cachedRaw) {
//     //                         return { name: menuName, data: JSON.parse(cachedRaw) };
//     //                     }

//     //                     try {
//     //                         const res = await GetMenuAPI(finalId, menuName);
//     //                         const rawData = res?.Data?.rd || [];
//     //                         sessionStorage.setItem(sessionKey, JSON.stringify(rawData));
//     //                         return { name: menuName, data: rawData };
//     //                     } catch (err) {
//     //                         console.warn(`Failed to fetch ${menuName}`, err);
//     //                         return { name: menuName, data: [] };
//     //                     }
//     //                 });

//     //                 const results = await Promise.all(fetchPromises);

//     //                 const processedData = {};
//     //                 results.forEach(res => {
//     //                     processedData[res.name] = buildMenuItems(res.data);
//     //                 });

//     //                 setMultiMenuData(processedData);

//     //             } catch (error) {
//     //                 console.error("Critical error in menu fetching:", error);
//     //             }
//     //         }
//     //     };

//     //     fetchAllMenus();
//     // }, [islogin]);

//     // Retrieve the specific menu items for the currently selected Product Type
//     const currentMenuItems = useMemo(() => {
//         if (!selectedProductType) return [];
//         return multiMenuData[selectedProductType] || [];
//     }, [selectedProductType, multiMenuData]);

// const handelMenu = (param, param1, param2, event, isFilterKey2Ignore) => {
//     if (
//         param?.menuname === "Collection" &&
//         param?.key === "Auto" &&
//         param?.value === "" &&
//         Object.keys(param1 || {}).length === 0 &&
//         Object.keys(param2 || {}).length === 0
//     ) {
//         event?.preventDefault();
//         navigation('/collection')
//         return;
//     }
//     if (
//         event?.ctrlKey || // Ctrl key
//         event?.shiftKey || // Shift key
//         event?.metaKey || // Meta key (Command key on macOS)
//         (event?.button && event?.button === 1) // Middle mouse button
//     ) {
//         return;
//     } else {
//         event?.preventDefault();
//         let finalData = {
//             menuname: param?.menuname ?? "",
//             FilterKey: param?.key ?? "",
//             FilterVal: param?.value ?? "",
//             FilterKey1: isFilterKey2Ignore === 1 ? param2?.key ?? "" : param1?.key ?? "",
//             FilterVal1: isFilterKey2Ignore === 1 ? param2?.value ?? "" : param1?.value ?? "",
//             FilterKey2: isFilterKey2Ignore === 1 ? "" : param2?.key ?? "",
//             FilterVal2: isFilterKey2Ignore === 1 ? "" : param2?.value ?? "",
//         };
//         sessionStorage.setItem("menuparams", JSON.stringify(finalData));

//         const queryParameters1 = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].filter(Boolean).join("/");

//         const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`]
//             // .filter(Boolean)
//             .join(",");

//         const otherparamUrl = Object.entries({
//             b: finalData?.FilterKey,
//             g: finalData?.FilterKey1,
//             c: finalData?.FilterKey2,
//         })
//             .filter(([key, value]) => value !== undefined)
//             .map(([key, value]) => value)
//             .filter(Boolean)
//             .join(",");

//         const paginationParam = [`page=${finalData.page ?? 1}`, `size=${finalData.size ?? 50}`].join("&");

//         // console.log("otherparamsUrl--", otherparamUrl);

//         let menuEncoded = `${queryParameters}/${otherparamUrl}`;
//         // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
//         const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
//         console.log("🚀 ~ handelMenu ~ url:", url)

//         // let d = new Date();
//         // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
//         navigate(url);
//         setMobileOpen(false);
//         setActiveMenu(null);
//     }
// };

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//         if (mobileOpen) {
//             setActiveMenu(null);
//             setMenuStack([]);
//         }
//     };

//     const handleMobileMenuClick = (label, hasSubMenu) => {
//         if (hasSubMenu) {
//             setMenuStack([...menuStack, activeMenu || "main"]);
//             setActiveMenu(label);
//         }
//     };

//     const handleMobileBack = () => {
//         const newStack = [...menuStack];
//         const previousMenu = newStack.pop();
//         setMenuStack(newStack);
//         setActiveMenu(previousMenu === "main" ? null : previousMenu || null);
//     };

//     const handleLogout = async (e) => {
//         if (e && e.preventDefault) e.preventDefault();
//         sessionStorage.clear();
//         localStorage.removeItem("userToken");
//         if (window.handleAppReset) {
//             window.handleAppReset();
//         } else {
//             window.location.reload();
//         }
//     };

// const searchDataFucn = (searchText) => {
//     if (searchText) {
//         let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//         let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//         let obj = {
//             a: "",
//             b: searchText,
//             m: loginInfo?.MetalId ?? storeInit?.MetalId,
//             d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
//             c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
//             f: {},
//         };
//         let encodeObj = btoa(JSON.stringify(obj));
//         navigation(`/p/${searchText}?S=${encodeObj}`);
//         setSearchOpen(false);
//         setDrawerSearchOpen(false);
//         setMobileOpen(false);
//     }
// };

//     const navigateToMenu = (link) => {
//         navigate(link);
//         setMobileOpen(false);
//         setDrawerSearchOpen(false);
//         setMobileOpen(false);
//     }

//     const handleMouseLeave = (index) => {
//         setExpandedMenu(null);
//         // setHoveredIndex(null);
//         document.body.style.overflow = "auto";
//     };

//     const tabsData = [
//         {
//             id: 0,
//             gradient: {
//                 bg: "linear-gradient(135deg, #FFF5F8 0%, #FDECF2 40%, #F8DDE7 100%)",
//                 color: "#7A3E55",
//                 border: "#f4c7d8",
//                 borderDark: "#C97A96", // rose dark accent
//             },
//         },
//         {
//             id: 1,
//             gradient: {
//                 bg: "linear-gradient(135deg, #FFF4DA 0%, #F7E6BC 45%, #E8CF92 100%)",
//                 color: "#7A5A21",
//                 border: "#e8cf92",
//                 borderDark: "#B8933A", // warm gold dark accent
//             },
//         },
//         {
//             id: 2,
//             gradient: {
//                 bg: "linear-gradient(135deg, #F1FFF7 0%, #E2F7ED 45%, #CFF2DF 100%)",
//                 color: "#2A6F56",
//                 border: "#b4e4cc",
//                 borderDark: "#4C9B7A", // soft emerald dark accent
//             },
//         },
//     ];



//     const activeTabIndex = useMemo(() => {
//         return DynamicMenu
//             ?.slice(0, 3)
//             ?.findIndex(item => item.ProductTypeName === selectedProductType);
//     }, [DynamicMenu, selectedProductType]);

//     const activeTabStyle = tabsData[activeTabIndex] || {};

//     const handleTabChange = (typeName) => {
//         setSelectedProductType(typeName);
//         sessionStorage.setItem("selectedTabPersistence", typeName);
//     };


//     return (
//         <>
//             <motion.div animate={controls} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} style={{ position: "sticky", top: 0, zIndex: 999 }}>

//                 {/* NEW: TOP TOGGLE BAR FOR PRODUCT TYPES */}



//                 <AppBar position="sticky" elevation={0} sx={{ bgcolor: "transparent !important", top: 0 }}>
//                     <Container maxWidth={false} disableGutters sx={{ width: "100%", px: 0 }}>
//                         <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 4 }, minHeight: { xs: 64, sm: 82 }, bgcolor: "transparent !important", color: isHovered || isScrolled ? "#000" : "#fff" }}>

//                             {searchOpen && <SearchBarToggle searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchDataFucn={searchDataFucn} />}


//                             {!isMobile && is1400px && (
//                                 <IconButton
//                                     onClick={handleDrawerToggle}
//                                     sx={{
//                                         "&:hover": {
//                                             bgcolor: alpha("#000", 0.05),
//                                         },
//                                         color: isHovered || isScrolled ? "#000" : "#fff",
//                                         transition: "all 0.3s ease",
//                                         flex: 1,
//                                         justifyContent: 'flex-start'
//                                     }}
//                                 >
//                                     <MenuIcon />
//                                 </IconButton>
//                             )}
//                             {/* Left: Mobile Menu / Logo */}
//                             <Box sx={{
//                                 display: "flex", alignItems: "center", gap: 2,
//                                 flex: 1,
//                                 justifyContent: (!isMobile && is1400px) ? 'center' : 'flex-start'
//                             }}>
//                                 {isMobile && (
//                                     <IconButton
//                                         onClick={handleDrawerToggle}
//                                         sx={{
//                                             "&:hover": {
//                                                 bgcolor: alpha("#000", 0.05),
//                                             },
//                                             color: isHovered || isScrolled ? "#000" : "#fff",
//                                             transition: "all 0.3s ease",
//                                         }}
//                                     >
//                                         <MenuIcon size={22} />
//                                     </IconButton>
//                                 )}
//                                 <Box
//                                     component={Link}
//                                     to="/"
//                                 >
//                                     <Box
//                                         component="img"
//                                         src={compnyLogo}

//                                         alt="SHAYN"
//                                         sx={{
//                                             width: "85%",
//                                             cursor: "pointer",
//                                             // filter: isHovered || isScrolled ? "invert(0) brightness(1)" : "invert(1) brightness(1.5)",
//                                         }}
//                                         className="el_without_headerLogo_side"
//                                     />
//                                 </Box>
//                             </Box>


//                             {!isMobile && !is1400px && (<Box>
//                                 <Box
//                                 >
//                                     {!isMobile && !is1400px && (
//                                         <Box
//                                             sx={{
//                                                 display: "flex", justifyContent: "center", gap: 3, py: 1,
//                                             }}
//                                         >
//                                             {DynamicMenu?.slice(0, 3).map((item, i) => {
//                                                 const isActive = selectedProductType === item.ProductTypeName;

//                                                 return (
//                                                     <Box
//                                                         key={item.ProductTypeName}
//                                                         onClick={() => handleTabChange(item.ProductTypeName)}
//                                                         sx={{
//                                                             position: "relative",
//                                                             px: 1.5,
//                                                             py: 0.6,
//                                                             cursor: "pointer",
//                                                             borderRadius: 999,
//                                                             overflow: "hidden",
//                                                         }}
//                                                     >
//                                                         {/* 🔵 Active Tracking Pill */}
//                                                         {isActive && (
//                                                             <motion.div
//                                                                 layoutId="productType-pill"
//                                                                 transition={{
//                                                                     type: "spring",
//                                                                     stiffness: 420,
//                                                                     damping: 30,
//                                                                 }}
//                                                                 style={{
//                                                                     position: "absolute",
//                                                                     inset: 0,
//                                                                     borderRadius: 999,
//                                                                     background: tabsData[i]?.gradient.bg,
//                                                                     color: tabsData[i]?.gradient.color,
//                                                                     zIndex: 0,
//                                                                 }}
//                                                             />
//                                                         )}

//                                                         {/* Text */}
//                                                         <Typography
//                                                             sx={{
//                                                                 position: "relative",
//                                                                 zIndex: 1,
//                                                                 fontSize: "0.72rem",
//                                                                 fontWeight: isActive ? 700 : 500,
//                                                                 letterSpacing: 1,
//                                                                 textTransform: "uppercase",
//                                                                 color:
//                                                                     isHovered || isScrolled
//                                                                         ? isActive
//                                                                             ? "#000"
//                                                                             : "#6f6f6f"
//                                                                         : isActive
//                                                                             ? tabsData[i]?.gradient.color
//                                                                             : "rgba(255,255,255,0.75)",
//                                                                 transition: "color 0.2s ease",
//                                                                 userSelect: "none",
//                                                             }}
//                                                         >
//                                                             {item.ProductTypeName}
//                                                         </Typography>
//                                                     </Box>
//                                                 );
//                                             })}
//                                         </Box>
//                                     )}
//                                 </Box>
//                                 {/* Main Navbar - Renders Categories (Ring, Bracelet) based on selectedProductType */}
//                                 <Box>
//                                     {!isMobile && !is1400px && (
//                                         <>
//                                             <Box sx={{ display: "flex", gap: 0.5, flex: 1, justifyContent: "center" }}>
//                                                 {
//                                                     menuLoading ? (
//                                                         <Box sx={{ display: 'flex', gap: 2 }}>
//                                                             {[1, 2, 3, 4, 5].map((item) => (
//                                                                 <Skeleton
//                                                                     key={item}
//                                                                     variant="rectangular"
//                                                                     width={100}
//                                                                     height={30}
//                                                                     sx={{ borderRadius: 6, bgcolor: 'rgba(182, 182, 182, 0.62)' }}
//                                                                 />
//                                                             ))}
//                                                         </Box>
//                                                     ) :

//                                                         currentMenuItems?.map((item, index) => (
//                                                             <Box
//                                                                 key={index}
//                                                                 onMouseEnter={() => setHoveredItem(item?.menuname)}
//                                                                 onMouseLeave={() => setHoveredItem(null)}
//                                                                 sx={{ position: "relative" }}
//                                                             >
//                                                                 <Box
//                                                                     component={Link}
//                                                                     onClick={(e) => {
//                                                                         handelMenu({ menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }, {}, {}, e, item?.IsFilterKey1Ignore);
//                                                                         handleMouseLeave();
//                                                                         setHoveredItem(null);
//                                                                     }}
//                                                                     sx={{
//                                                                         px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.84rem",
//                                                                         fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative",
//                                                                         color: isHovered || isScrolled ? "#000" : "#fff",
//                                                                         "&::after": {
//                                                                             content: '""', position: "absolute", top: 45, left: "50%", transform: "translateX(-50%)",
//                                                                             width: hoveredItem === item?.menuname ? "80%" : "0%", height: 2, background: activeTabStyle?.gradient?.borderDark || "#000", transition: "width 0.3s ease",
//                                                                         },
//                                                                         outline: "none", boxShadow: "none",
//                                                                         "&:hover": {
//                                                                             color: isHovered || isScrolled
//                                                                                 ? "#000"
//                                                                                 : "#fff",
//                                                                         },
//                                                                     }}
//                                                                 >
//                                                                     {item?.menuname}
//                                                                 </Box>

//                                                                 {/* MEGA MENU - YOUR ORIGINAL STRUCTURE */}
//                                                                 <AnimatePresence>
//                                                                     {item.param1 && hoveredItem === item?.menuname && (
//                                                                         <>
//                                                                             <Box
//                                                                                 sx={{ position: "fixed", top: "100%", left: "50%", transform: "translateX(-50%)", mt: 0, width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" }, maxWidth: "1400px", height: "24px", boxShadow: "none", bgcolor: "transparent" }}
//                                                                                 onMouseEnter={() => setHoveredItem(item?.menuname)}
//                                                                                 onMouseLeave={() => setHoveredItem(null)}
//                                                                             />
//                                                                             <Box
//                                                                                 onMouseEnter={() => setHoveredItem(item?.menuname)}
//                                                                                 onMouseLeave={() => setHoveredItem(null)}
//                                                                                 sx={{
//                                                                                     position: "fixed", top: "100%", left: "50%", transform: "translateX(-50%)", mt: 1, bgcolor: "#fff", borderRadius: 8,
//                                                                                     boxShadow: "0 20px 60px rgba(0,0,0,0.15)", width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" }, maxWidth: "1400px",
//                                                                                     maxHeight: "80vh", minHeight: "400px", overflowY: "auto", display: "flex", zIndex: 1300, animation: "fadeIn 0.25s ease",
//                                                                                     scrollbarWidth: "thin", scrollbarColor: "#bfbfbf transparent",
//                                                                                     "&::-webkit-scrollbar": { width: "6px" },
//                                                                                     "&::-webkit-scrollbar-thumb": { backgroundColor: "#bfbfbf", borderRadius: "10px" },
//                                                                                     "&::before": {
//                                                                                         content: '""',
//                                                                                         position: "absolute",
//                                                                                         top: 0,
//                                                                                         left: 0,
//                                                                                         right: 0,
//                                                                                         height: "20px",
//                                                                                         background: `radial-gradient(
//                                                                                             ellipse at top,
//                                                                                             ${activeTabStyle?.gradient?.color}90,
//                                                                                             transparent
//                                                                                             )` ,
//                                                                                         filter: "blur(55px)",
//                                                                                         pointerEvents: "none",
//                                                                                         borderTopLeftRadius: 8,
//                                                                                         borderTopRightRadius: 8,

//                                                                                     },
//                                                                                 }}
//                                                                             >
//                                                                                 <Box sx={{ flex: "1 1 auto", bgcolor: "#fff", p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
//                                                                                     <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={1}
//                                                                                         sx={{
//                                                                                             alignContent: "center",   // or "flex-start"
//                                                                                             alignItems: "center",
//                                                                                         }}
//                                                                                     >
//                                                                                         {item?.param1?.map((section, index) => (
//                                                                                             <Box key={index} sx={{
//                                                                                                 breakInside: "avoid", marginBottom: 2, textAlign: "center",
//                                                                                             }}>
//                                                                                                 <Typography
//                                                                                                     component={Link}
//                                                                                                     onClick={(e) => {
//                                                                                                         e.stopPropagation()
//                                                                                                         handelMenu(
//                                                                                                             { menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname },
//                                                                                                             { key: section?.param1name, value: section?.param1dataname },
//                                                                                                             {}, e, section?.IsFilterKey1Ignore)
//                                                                                                         setHoveredItem(null);
//                                                                                                     }}
//                                                                                                     sx={{
//                                                                                                         position: "relative",
//                                                                                                         color: section?.menuname === "Collection" ? "#535353" : "#141414",
//                                                                                                         fontWeight: section?.menuname === "Collection" ? 400 : 700,
//                                                                                                         display: "block", letterSpacing: 0.5, textTransform: "capitalize",
//                                                                                                         mb: section?.menuname === "Collection" ? 0 : 1,
//                                                                                                         wordWrap: "break-word", cursor: "pointer", textUnderlineOffset: "0.3rem",
//                                                                                                         "&:hover": { textDecoration: "underline", textUnderlineOffset: "0.3rem" },
//                                                                                                         fontSize: "0.92rem",
//                                                                                                     }}
//                                                                                                 >
//                                                                                                     {section?.param1dataname}
//                                                                                                 </Typography>

//                                                                                                 <Box sx={{
//                                                                                                     display: "flex", flexDirection: "column", gap: 0.8
//                                                                                                     , alignItems: 'center'
//                                                                                                 }}>
//                                                                                                     {section?.param2?.filter(p => p?.param2dataname && p?.param2dataname.trim() !== "").map((param2Item, param2Index) => (
//                                                                                                         <Box
//                                                                                                             key={param2Index}
//                                                                                                             onClick={(e) => {
//                                                                                                                 e.stopPropagation();
//                                                                                                                 handelMenu(
//                                                                                                                     { menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname },
//                                                                                                                     { key: section?.param1name, value: section?.param1dataname },
//                                                                                                                     { key: param2Item?.param2name, value: param2Item?.param2dataname },
//                                                                                                                     e, param2Item?.IsFilterKey2Ignore
//                                                                                                                 );
//                                                                                                                 setHoveredItem(null);
//                                                                                                             }}
//                                                                                                             component={Link}
//                                                                                                             sx={{
//                                                                                                                 position: "relative", textAlign: "left", px: 0, color: "#535353", bgcolor: "transparent",
//                                                                                                                 border: "none", cursor: "pointer", fontSize: "0.88rem", textDecoration: "none", borderRadius: 1,
//                                                                                                                 transition: "all 0.2s ease",
//                                                                                                                 "&:hover": { color: "#141414", textDecoration: "underline", textUnderlineOffset: "0.3rem" },
//                                                                                                                 outline: "none",
//                                                                                                             }}
//                                                                                                         >
//                                                                                                             {param2Item?.param2dataname}
//                                                                                                         </Box>
//                                                                                                     ))}
//                                                                                                 </Box>
//                                                                                             </Box>
//                                                                                         ))}
//                                                                                     </Masonry>
//                                                                                 </Box>
//                                                                             </Box>
//                                                                         </>
//                                                                     )}
//                                                                 </AnimatePresence>
//                                                             </Box>
//                                                         ))}


//                                                 {
//                                                     !menuLoading && (
//                                                         islogin && (
//                                                             <>
//                                                                 <Box sx={{ position: "relative" }}>
//                                                                     <Box component={Link} to="/p/NewArrival/?N=TmV3QXJyaXZhbA=="
//                                                                         sx={{ px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative", color: isHovered || isScrolled ? "#000" : "#fff", outline: "none", boxShadow: "none" }}
//                                                                     >
//                                                                         New Arrivals
//                                                                     </Box>
//                                                                 </Box>
//                                                                 <Box sx={{ position: "relative" }}>
//                                                                     <Box component={Link} to="/offers"
//                                                                         sx={{ px: 2, py: 3, bgcolor: "transparent", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: 0.8, textDecoration: "none", transition: "all 0.2s ease", position: "relative", color: isHovered || isScrolled ? "#000" : "#fff", outline: "none", boxShadow: "none" }}
//                                                                     >
//                                                                         Offers
//                                                                     </Box>
//                                                                 </Box>
//                                                             </>
//                                                         ))}
//                                             </Box>
//                                         </>
//                                     )}
//                                 </Box>
//                             </Box>)}

//                             <RightSideMenu
//                                 setSearchOpen={setSearchOpen}
//                                 IsB2BWebsiteChek={IsB2BWebsiteChek}
//                                 storeinit={storeinit}
//                                 handleLogout={handleLogout}

//                                 islogin={islogin}
//                                 isMobile={isMobile}
//                                 cartCount={cartCount}
//                                 wishCount={wishCount}
//                                 is768px={is768px}
//                                 navigate={navigate} isHovered={isHovered} isScrolled={isScrolled} />
//                         </Toolbar>
//                     </Container>
//                 </AppBar>
//             </motion.div>

//             <Drawer
//                 anchor="left"
//                 open={mobileOpen}
//                 onClose={handleDrawerToggle}
//                 sx={{
//                     "& .MuiDrawer-paper": {
//                         width: { xs: "85%", sm: 380 },
//                         maxWidth: "100%",
//                     },
//                 }}
//             >
//                 {DrawerSearchOpen && <DrawerSearchBar setSearchOpen={setDrawerSearchOpen} searchDataFucn={searchDataFucn} />}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: `1px solid ${alpha("#fff", 0.1)}` }}>
//                     <Box component="img" src={compnyLogoM} alt="SHAYN" sx={{}} />
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
//                         {islogin && <IconButton onClick={() => setDrawerSearchOpen((prev) => !prev)} sx={{ color: "#000" }}><SearchIcon style={{ fontSize: "18px", color: "inherit" }} /></IconButton>}
//                         {islogin && <IconButton sx={{ color: "#000" }} onClick={() => navigateToMenu("/myWishList")}><Badge badgeContent={wishCount || 10} color="error"><FavoriteIcon style={{ fontSize: "18px", color: "inherit" }} /></Badge></IconButton>}
//                         <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
//                     </Box>
//                 </Box>

//                 {/*
//                     Mobile Menu Logic:
//                     If you want to update mobile menu to respect the 'SelectedProductType',
//                     you would need to pass 'currentMenuItems' instead of 'multiMenuData' or handle tabs inside mobile menu.
//                     For now, I'm passing flattened data or original menu items as per previous request to not break mobile.
//                 */}
//                 <MobileMenu
//                     activeMenu={activeMenu}
//                     menuItems={currentMenuItems.length > 0 ? currentMenuItems : []}
//                     handleMobileMenuClick={handleMobileMenuClick}
//                     handleMobileBack={handleMobileBack}
//                     handelMenu={handelMenu}
//                     islogin={islogin}
//                     storeinit={storeinit}
//                     IsB2BWebsiteChek={IsB2BWebsiteChek}

//                     DynamicMenu={DynamicMenu}
//                     selectedProductType={selectedProductType}
//                     handleTabChange={handleTabChange}
//                 />
//             </Drawer>
//         </>
//     );
// };

// export default PremiumNavbar;


// // import { useEffect,  useRef, useState } from "react";
// // import { AppBar, Toolbar, Box, IconButton, Container, Drawer, Typography, useMediaQuery, useTheme, alpha, Badge } from "@mui/material";
// // import { Close as CloseIcon } from "@mui/icons-material";
// // import { useRecoilState, useRecoilValue } from "recoil";
// // import { Menu as MenuIcon } from "lucide-react";
// // import { el_CartCount, el_companyLogo, el_companyLogoM, el_loginState, el_WishCount } from "../../../../Recoil/atom";
// // import { AnimatePresence, motion, useAnimation } from "framer-motion";
// // import ImageSide from "./ImageSide";
// // import MobileMenu from "./MobileMenu";
// // import RightSideMenu from "./RightSideMenu";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import Cookies from "js-cookie";
// // import { GetCountAPI } from "../../../../../../../utils/API/GetCount/GetCountAPI";
// // import Pako from "pako";
// // import { GetMenuAPI } from "../../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
// // import SearchBarToggle from "./SearchBarToggle";
// // import DrawerSearchBar from "./DrawerSearchbar";
// // import { Search as SearchIcon, Heart as FavoriteIcon, User as PersonIcon, ShoppingCart as ShoppingBagIcon, LogOut } from "lucide-react";
// // import { Masonry } from "@mui/lab";
// // import OfferBar from "./OfferBar";
// // import {buildMenuItems} from './MenuBuilder'



// // const PremiumNavbar = () => {
// //     const theme = useTheme();
// //     const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
// //     const is1400px = useMediaQuery(theme.breakpoints.down("1400"));
// //     const is768px = useMediaQuery("(max-width:428px)");
// //     const [mobileOpen, setMobileOpen] = useState(false);
// //     const [activeMenu, setActiveMenu] = useState(null);
// //     const [menuStack, setMenuStack] = useState([]);
// //     const [hoveredItem, setHoveredItem] = useState(null);
// //     const [isScrolled, setIsScrolled] = useState(false);
// //     const controls = useAnimation();
// //     const [isHovered, setIsHovered] = useState(false);
// //     const navigation = useNavigate();
// //     const [islogin, setislogin] = useRecoilState(el_loginState);
// //     const [cartCount, setCartCount] = useRecoilState(el_CartCount);
// //     const [wishCount, setWishCount] = useRecoilState(el_WishCount);
// //     const [storeinit, setStoreInit] = useState();
// //     const [burgerMenu, setBurgerMenu] = useState(false);
// //     const [burgerMenu1, setBurgerMenu1] = useState(false);
// //     const [mobilenav, setMobilenav] = useState(false);
// //     const [DrawerSearchOpen, setDrawerSearchOpen] = useState(false);
// //     const navigate = useNavigate();
// //     const [searchOpen, setSearchOpen] = useState(false);
// //     const [showBtn, setShowBtn] = useState(false);
// //     const [inputValue, setInputValue] = useState("");
// //     const inputRef = useRef(null);
// //     const compnyLogo = useRecoilValue(el_companyLogo);
// //     const compnyLogoM = useRecoilValue(el_companyLogoM);
// //     const [menuData, setMenuData] = useState([]);
// //     const [menuItems, setMenuItems] = useState([]);
// //     const [hoveredIndex, setHoveredIndex] = useState(null);
// //     const [expandedMenu, setExpandedMenu] = useState(null);
// //     const [selectedData, setSelectedData] = useState([]);
// //     const isMounted = useRef(false);
// //     const [menuId, setMenuId] = useState("");
// //     const location = useLocation();
// //     const [menuHoverTimeout, setMenuHoverTimeout] = useState(null);
// //     const menuRef = useRef(null);
// //     const navItemRefs = useRef({});

// //     const getDynamicMenu = () => {
// //         try {
// //             const raw = sessionStorage.getItem("DyamicMenuList");
// //             if (!raw) return null; // not present
// //             return JSON.parse(raw); // valid JSON
// //         } catch (err) {
// //             console.warn("Invalid DyamicMenuList in sessionStorage:", err);
// //             return null; // return safe fallback
// //         }
// //     };
// //     const DynamicMenu = getDynamicMenu();
// //     console.log("🚀 ~ PremiumNavbar ~ DynamicMenu:", DynamicMenu)


// //     const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;

// //     const GetCompanyLogo = async () => {
// //         try {
// //             const value = JSON?.parse(sessionStorage?.getItem("LoginUser"));
// //             setislogin(value);
// //             const storeData = JSON?.parse(sessionStorage?.getItem("storeInit"));
// //             setStoreInit(storeData);
// //             window.scroll({ behavior: "smooth", top: 0 });
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const visiterID = Cookies.get("visiterId");
// //                 const res = await GetCountAPI(visiterID);
// //                 setCartCount(res?.cartcount);
// //                 setWishCount(res?.wishcount);
// //             } catch (error) {
// //                 console.error("Error fetching data:", error);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     useEffect(() => {
// //         GetCompanyLogo();
// //     }, []);

// //     useEffect(() => {
// //         if (location.pathname === "/") {
// //             setIsScrolled(window.scrollY > 10);
// //             const handleScroll = () => setIsScrolled(window.scrollY > 10);
// //             window.addEventListener("scroll", handleScroll);
// //             return () => window.removeEventListener("scroll", handleScroll);
// //         } else {
// //             // All other pages → always scrolled style
// //             setIsScrolled(true);
// //         }
// //         setIsScrolled(true);

// //     }, [location.pathname]);


// //     useEffect(() => {
// //         controls.start({
// //             backgroundColor: isHovered || isScrolled ? "#ffffff" : "rgba(255,255,255,0)",
// //             color: isHovered || isScrolled ? "#000000" : "#ffffff",
// //             boxShadow: isHovered || isScrolled ? "0 6px 30px rgba(0,0,0,0.08)" : "0 0px 0px rgba(0,0,0,0)",
// //             backdropFilter: isHovered || isScrolled ? "blur(8px)" : "blur(0px)",
// //             transition: {
// //                 type: "spring",
// //                 stiffness: 45,  // ↓ softer bounce
// //                 damping: 15,    // ↓ smoother rebound
// //                 mass: 0.8,      // ↓ lighter feel
// //                 duration: 0.8,  // ensures fluid delay
// //             },
// //         });
// //     }, [isHovered, isScrolled, controls]);

// //     useEffect(() => {
// //         if (!isMounted.current) {
// //             isMounted.current = true;
// //             return;
// //         }

// //         let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
// //         let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
// //         if (storeinit?.IsB2BWebsite === 0 || (storeinit?.IsB2BWebsite === 1 && isUserLogin === true)) {
// //             FetchMenuList(DynamicMenu?.[0]?.ProductTypeName);
// //         }
// //     }, [islogin]);

// //     useEffect(() => {
// //         setMenuItems(buildMenuItems(menuData));
// //     }, [menuData]);

// // const handelMenu = (param, param1, param2, event, isFilterKey2Ignore) => {
// //     if (
// //         param?.menuname === "Collection" &&
// //         param?.key === "Auto" &&
// //         param?.value === "" &&
// //         Object.keys(param1 || {}).length === 0 &&
// //         Object.keys(param2 || {}).length === 0
// //     ) {
// //         navigate('/collection')
// //         return;
// //     }
// //     if (
// //         event?.ctrlKey || // Ctrl key
// //         event?.shiftKey || // Shift key
// //         event?.metaKey || // Meta key (Command key on macOS)
// //         (event?.button && event?.button === 1) // Middle mouse button
// //     ) {
// //         return;
// //     } else {
// //         event?.preventDefault();
// //         let finalData = {
// //             menuname: param?.menuname ?? "",
// //             FilterKey: param?.key ?? "",
// //             FilterVal: param?.value ?? "",
// //             FilterKey1: isFilterKey2Ignore === 1 ? param2?.key ?? "" : param1?.key ?? "",
// //             FilterVal1: isFilterKey2Ignore === 1 ? param2?.value ?? "" : param1?.value ?? "",
// //             FilterKey2: isFilterKey2Ignore === 1 ? "" : param2?.key ?? "",
// //             FilterVal2: isFilterKey2Ignore === 1 ? "" : param2?.value ?? "",
// //         };
// //         sessionStorage.setItem("menuparams", JSON.stringify(finalData));

// //         const queryParameters1 = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].filter(Boolean).join("/");
// //         console.log("🚀 ~ handelMenu ~ queryParameters1:", queryParameters1)

// //         const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`]
// //             // .filter(Boolean)
// //             .join(",");
// //         console.log("🚀 ~ handelMenu ~ queryParameters:", queryParameters)

// //         const otherparamUrl = Object.entries({
// //             b: finalData?.FilterKey,
// //             g: finalData?.FilterKey1,
// //             c: finalData?.FilterKey2,
// //         })
// //             .filter(([key, value]) => value !== undefined)
// //             .map(([key, value]) => value)
// //             .filter(Boolean)
// //             .join(",");
// //         console.log("🚀 ~ handelMenu ~ otherparamUrl:", otherparamUrl)

// //         const paginationParam = [`page=${finalData.page ?? 1}`, `size=${finalData.size ?? 50}`].join("&");

// //         // console.log("otherparamsUrl--", otherparamUrl);

// //         let menuEncoded = `${queryParameters}/${otherparamUrl}`;
// //         // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
// //         const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
// //         console.log("🚀 ~ handelMenu ~ url:", url)

// //         // let d = new Date();
// //         // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
// //         navigate(url);
// //         setMobileOpen(false);
// //         setActiveMenu(null);
// //     }
// // };

// //     const handleDrawerToggle = () => {
// //         setMobileOpen(!mobileOpen);
// //         if (mobileOpen) {
// //             setActiveMenu(null);
// //             setMenuStack([]);
// //         }
// //     };

// //     const handleMobileMenuClick = (label, hasSubMenu) => {
// //         if (hasSubMenu) {
// //             setMenuStack([...menuStack, activeMenu || "main"]);
// //             setActiveMenu(label);
// //         }
// //     };

// //     const handleMobileBack = () => {
// //         const newStack = [...menuStack];
// //         const previousMenu = newStack.pop();
// //         setMenuStack(newStack);
// //         setActiveMenu(previousMenu === "main" ? null : previousMenu || null);
// //     };

// //     const FetchMenuList = async (SelectedMenu) => {
// //         const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
// //         const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
// //         const { IsB2BWebsite } = storeInit;
// //         const visiterID = Cookies.get("visiterId");
// //         let finalId;
// //         if (IsB2BWebsite === 0) {
// //             finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
// //         } else {
// //             finalId = loginUserDetail?.id || "0";
// //         }

// //         await GetMenuAPI(finalId, SelectedMenu)
// //             .then((response) => {
// //                 setMenuData(response?.Data?.rd);
// //             })
// //             .catch((err) => console.log(err));
// //     };


// //     const handleMouseEnter = (index, param) => {
// //         setHoveredIndex(index);
// //         setExpandedMenu(index);
// //         setSelectedData(menuItems[index] || []);
// //         document.body.style.overflow = "hidden";
// //     };
// //     const handleMouseLeave = (index) => {
// //         setExpandedMenu(null);
// //         // setHoveredIndex(null);
// //         document.body.style.overflow = "auto";
// //     };

// //     // const handleLogout = () => {
// //     //     setislogin(false);
// //     //     sessionStorage.clear();
// //     //     sessionStorage.setItem("LoginUser", false);
// //     //     sessionStorage.removeItem("storeInit");
// //     //     sessionStorage.removeItem("loginUserDetail");
// //     //     sessionStorage.removeItem("remarks");
// //     //     sessionStorage.removeItem("selectedAddressId");
// //     //     sessionStorage.removeItem("orderNumber");
// //     //     sessionStorage.removeItem("registerEmail");
// //     //     sessionStorage.removeItem("UploadLogicalPath");
// //     //     sessionStorage.removeItem("remarks");
// //     //     sessionStorage.removeItem("registerMobile");
// //     //     // navigation('/')
// //     //     window.location.to = "/";
// //     //     // window.location.reload();
// //     // };


// //     const handleLogout = async (e) => {
// //         if (e && e.preventDefault) e.preventDefault();
// //         console.log("🚪 Logging out...");
// //         sessionStorage.clear();
// //         localStorage.removeItem("userToken");
// //         if (window.handleAppReset) {
// //             window.handleAppReset();
// //         } else {
// //             console.warn("⚠️ AppLoader not found, forcing reload.");
// //             window.location.reload();
// //         }
// //     };



// //     useEffect(() => {
// //         window.scroll({
// //             top: 0,
// //             behavior: "smooth",
// //         });
// //     }, []);



// //     const searchDataFucn = (searchText) => {
// //         if (searchText) {
// //             let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
// //             let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
// //             let obj = {
// //                 a: "",
// //                 b: searchText,
// //                 m: loginInfo?.MetalId ?? storeInit?.MetalId,
// //                 d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
// //                 c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
// //                 f: {},
// //             };

// //             let encodeObj = btoa(JSON.stringify(obj));
// //             navigation(`/p/${searchText}?S=${encodeObj}`);
// //             setSearchOpen(false);
// //             setDrawerSearchOpen(false);
// //             setMobileOpen(false);
// //         }
// //     };

// //     const navigateToMenu = (link) => {
// //         navigate(link);
// //         setMobileOpen(false);
// //         setDrawerSearchOpen(false);
// //         setMobileOpen(false);
// //     }



// //     return (
// //         <>
// //             {/* <OfferBar /> */}
// //             <motion.div animate={controls} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} style={{ position: "sticky", top: 0, zIndex: 999 }}>
// //                 <AppBar
// //                     position="sticky"
// //                     elevation={0}
// //                     sx={{
// //                         bgcolor: "transparent !important",
// //                         top: 0,
// //                     }}
// //                 >
// //                     <Container
// //                         maxWidth={false}
// //                         disableGutters
// //                         sx={{
// //                             width: "100%",
// //                             px: 0,
// //                         }}
// //                     >
// //                         <Toolbar
// //                             sx={{
// //                                 justifyContent: "space-between",
// //                                 px: { xs: 0, sm: 4 },
// //                                 minHeight: { xs: 64, sm: 72 },
// //                                 bgcolor: "transparent !important",
// //                                 color: isHovered || isScrolled ? "#000" : "#fff",
// //                             }}
// //                         >
// //                             {searchOpen && <SearchBarToggle
// //                                 searchOpen={searchOpen}
// //                                 setSearchOpen={setSearchOpen}
// //                                 searchDataFucn={searchDataFucn}
// //                             />}

// //                             {!isMobile && is1400px && (
// //                                 <IconButton
// //                                     onClick={handleDrawerToggle}
// //                                     sx={{
// //                                         "&:hover": {
// //                                             bgcolor: alpha("#000", 0.05),
// //                                         },
// //                                         color: isHovered || isScrolled ? "#000" : "#fff",
// //                                         transition: "all 0.3s ease",
// //                                     }}
// //                                 >
// //                                     <MenuIcon />
// //                                 </IconButton>
// //                             )}
// //                             {/* Left: Mobile Menu / Logo */}
// //                             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //                                 {isMobile && (
// //                                     <IconButton
// //                                         onClick={handleDrawerToggle}
// //                                         sx={{
// //                                             "&:hover": {
// //                                                 bgcolor: alpha("#000", 0.05),
// //                                             },
// //                                             color: isHovered || isScrolled ? "#000" : "#fff",
// //                                             transition: "all 0.3s ease",
// //                                         }}
// //                                     >
// //                                         <MenuIcon size={22} />
// //                                     </IconButton>
// //                                 )}
// //                                 <Box
// //                                     component={Link}
// //                                     to="/"
// //                                 >
// //                                     <Box
// //                                         component="img"
// //                                         src={compnyLogo}

// //                                         alt="SHAYN"
// //                                         sx={{
// //                                             width: "auto",
// //                                             cursor: "pointer",
// //                                             // filter: isHovered || isScrolled ? "invert(0) brightness(1)" : "invert(1) brightness(1.5)",
// //                                         }}
// //                                         className="el_without_headerLogo_side"
// //                                     />
// //                                 </Box>
// //                             </Box>

// //                             {/* Desktop Navigation */}
// //                             {!isMobile && !is1400px && (
// //                                 <>
// //                                     <Box
// //                                         sx={{
// //                                             display: "flex",
// //                                             gap: 0.5,
// //                                             flex: 1,
// //                                             justifyContent: "center",
// //                                         }}
// //                                     >
// //                                         {menuItems?.map((item, index) => (
// //                                             <Box
// //                                                 key={index}
// //                                                 label={item?.menuname}
// //                                                 onMouseEnter={() => setHoveredItem(item?.menuname)}
// //                                                 onMouseLeave={() => setHoveredItem(null)}
// //                                                 onClick={(e) => {
// //                                                     console.log("🚀 ~ onClick ~ e:", 1)
// //                                                     handelMenu({ menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }, {}, {}, e, item?.IsFilterKey1Ignore);
// //                                                     handleMouseLeave();
// //                                                     setHoveredItem(null);
// //                                                 }}
// //                                                 sx={{
// //                                                     position: "relative",
// //                                                 }}
// //                                             >
// //                                                 <Box
// //                                                     component={Link}
// //                                                     sx={{
// //                                                         px: 2,
// //                                                         py: 3,
// //                                                         bgcolor: "transparent",
// //                                                         border: "none",
// //                                                         cursor: "pointer",
// //                                                         fontSize: "0.84rem",
// //                                                         fontWeight: 500,
// //                                                         letterSpacing: 0.8,
// //                                                         textDecoration: "none",
// //                                                         transition: "all 0.2s ease",
// //                                                         position: "relative",
// //                                                         color: isHovered || isScrolled ? "#000" : "#fff",
// //                                                         "&::after": {
// //                                                             content: '""',
// //                                                             position: "absolute",
// //                                                             top: 45,
// //                                                             left: "50%",
// //                                                             transform: "translateX(-50%)",
// //                                                             width: hoveredItem === item?.menuname ? "80%" : "0%",
// //                                                             height: 2,
// //                                                             bgcolor: "#d4d4d4",
// //                                                             transition: "width 0.3s ease",
// //                                                         },
// //                                                         "&::before": {
// //                                                             content: '""',
// //                                                             position: "absolute",
// //                                                             bottom: -20,
// //                                                             left: "0%",
// //                                                             right: "0%",
// //                                                             height: 35,
// //                                                             width: "100%",
// //                                                             bgcolor: "transparent",
// //                                                             transition: "width 0.3s ease",
// //                                                         },
// //                                                         outline: "none",
// //                                                         boxShadow: "none",
// //                                                     }}
// //                                                 >
// //                                                     {item?.menuname}
// //                                                 </Box>
// //                                                 <AnimatePresence>
// //                                                     {item.param1 && hoveredItem === item?.menuname && (
// //                                                         <>
// //                                                             <Box
// //                                                                 sx={{
// //                                                                     position: "fixed",
// //                                                                     top: "100%",
// //                                                                     left: "50%",
// //                                                                     transform: "translateX(-50%)",
// //                                                                     mt: 0,
// //                                                                     width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" },
// //                                                                     maxWidth: "1400px",
// //                                                                     height: "24px",
// //                                                                     boxShadow: "none",
// //                                                                     bgcolor: "transparent",
// //                                                                 }}
// //                                                                 onMouseEnter={() => {
// //                                                                     setHoveredItem(item?.menuname);
// //                                                                 }}
// //                                                                 onMouseLeave={() => {
// //                                                                     setHoveredItem(null);
// //                                                                 }}
// //                                                             />
// //                                                             <Box
// //                                                                 onMouseEnter={() => {
// //                                                                     setHoveredItem(item?.menuname);
// //                                                                 }}
// //                                                                 onMouseLeave={() => {
// //                                                                     setHoveredItem(null);
// //                                                                 }}
// //                                                                 sx={{
// //                                                                     position: "fixed",
// //                                                                     top: "100%",
// //                                                                     left: "50%",
// //                                                                     transform: "translateX(-50%)",
// //                                                                     mt: 1,
// //                                                                     bgcolor: "#fff",
// //                                                                     borderRadius: 8,
// //                                                                     boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
// //                                                                     width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "70vw", xl: "1400px" },
// //                                                                     maxWidth: "1400px",
// //                                                                     maxHeight: "80vh",
// //                                                                     minHeight: "400px",
// //                                                                     overflow: "hidden",
// //                                                                     display: "flex",
// //                                                                     zIndex: 1300,
// //                                                                     animation: "fadeIn 0.25s ease",
// //                                                                     "@keyframes fadeIn": {
// //                                                                         from: { opacity: 0, transform: "translateX(-50%) translateY(-10px)" },
// //                                                                         to: { opacity: 1, transform: "translateX(-50%) translateY(0)" },
// //                                                                     },
// //                                                                 }}
// //                                                             >
// //                                                                 <Box
// //                                                                     sx={{
// //                                                                         flex: "1 1 auto",
// //                                                                         bgcolor: "#fff",
// //                                                                         p: { xs: 2, sm: 3, md: 4 },
// //                                                                         overflowY: "auto",
// //                                                                         overflowX: "hidden",
// //                                                                         width: "100%",
// //                                                                         scrollbarWidth: "thin",
// //                                                                         scrollbarColor: "#bfbfbf transparent",
// //                                                                         "&::-webkit-scrollbar": {
// //                                                                             width: "6px",
// //                                                                         },
// //                                                                         "&::-webkit-scrollbar-thumb": {
// //                                                                             backgroundColor: "#bfbfbf",
// //                                                                             borderRadius: "10px",
// //                                                                         },
// //                                                                         "&::-webkit-scrollbar-thumb:hover": {
// //                                                                             backgroundColor: "#a6a6a6",
// //                                                                         },
// //                                                                         "&::-webkit-scrollbar-track": {
// //                                                                             background: "transparent",
// //                                                                         },
// //                                                                         scrollBehavior: "smooth",
// //                                                                     }}
// //                                                                 >
// //                                                                     <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={1}>
// //                                                                         {item?.param1?.map((section, index) => {
// //                                                                             return <>
// //                                                                                 <Box
// //                                                                                     key={index}
// //                                                                                     sx={{
// //                                                                                         breakInside: "avoid",
// //                                                                                         marginBottom: 2,
// //                                                                                     }}
// //                                                                                 >
// //                                                                                     <Typography
// //                                                                                         component={Link}
// //                                                                                         onClick={(e) => {
// //                                                                                             e.stopPropagation()
// //                                                                                             console.log("🚀 ~ onClick ~ e:", 2)
// //                                                                                             handelMenu(
// //                                                                                                 { menuname: item?.menuname, key: item?.param0name, value: item?.param0dataname }
// //                                                                                                 , { key: section?.param1name, value: section?.param1dataname }
// //                                                                                                 , {}, e, section?.IsFilterKey1Ignore)
// //                                                                                             setHoveredItem(null);
// //                                                                                         }}
// //                                                                                         sx={{
// //                                                                                             position: "relative",
// //                                                                                             color: section?.menuname == "Collection" ? "#535353" : "#141414",
// //                                                                                             fontWeight: section?.menuname == "Collection" ? 400 : 700,
// //                                                                                             textDecoration: section?.menuname == "Collection" ? "none" : "none",
// //                                                                                             display: "block",
// //                                                                                             letterSpacing: 0.5,
// //                                                                                             textTransform: "capitalize",
// //                                                                                             mb: section?.menuname == "Collection" ? 0 : 1,
// //                                                                                             wordWrap: "break-word",
// //                                                                                             cursor: "pointer",
// //                                                                                             textUnderlineOffset: "0.3rem",
// //                                                                                             "&:hover": {
// //                                                                                                 textDecoration: "underline",
// //                                                                                                 textUnderlineOffset: "0.3rem",
// //                                                                                             },
// //                                                                                             fontSize: "0.92rem",
// //                                                                                         }}
// //                                                                                     >
// //                                                                                         {section?.param1dataname}
// //                                                                                     </Typography>

// //                                                                                     <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
// //                                                                                         {section?.param2
// //                                                                                             ?.filter(
// //                                                                                                 (param2Item) =>
// //                                                                                                     param2Item?.param2dataname && param2Item?.param2dataname.trim() !== ""
// //                                                                                             )
// //                                                                                             .map((param2Item, param2Index) => (
// //                                                                                                 <Box
// //                                                                                                     key={param2Index}
// //                                                                                                     onClick={(e) => {
// //                                                                                                         e.stopPropagation();
// //                                                                                                         handelMenu(
// //                                                                                                             {
// //                                                                                                                 menuname: item?.menuname,
// //                                                                                                                 key: item?.param0name,
// //                                                                                                                 value: item?.param0dataname,
// //                                                                                                             },
// //                                                                                                             {
// //                                                                                                                 key: section?.param1name,
// //                                                                                                                 value: section?.param1dataname,
// //                                                                                                             },
// //                                                                                                             {
// //                                                                                                                 key: param2Item?.param2name,
// //                                                                                                                 value: param2Item?.param2dataname,
// //                                                                                                             },
// //                                                                                                             e,
// //                                                                                                             param2Item?.IsFilterKey2Ignore
// //                                                                                                         );
// //                                                                                                         setHoveredItem(null);
// //                                                                                                     }}
// //                                                                                                     component={Link}
// //                                                                                                     sx={{
// //                                                                                                         position: "relative",
// //                                                                                                         textAlign: "left",
// //                                                                                                         px: 0,
// //                                                                                                         color: "#535353",
// //                                                                                                         bgcolor: "transparent",
// //                                                                                                         border: "none",
// //                                                                                                         cursor: "pointer",
// //                                                                                                         fontSize: "0.88rem",
// //                                                                                                         textDecoration: "none",
// //                                                                                                         borderRadius: 1,
// //                                                                                                         transition: "all 0.2s ease",
// //                                                                                                         "&:hover": {
// //                                                                                                             color: "#141414",
// //                                                                                                             textDecoration: "underline",
// //                                                                                                             textUnderlineOffset: "0.3rem",
// //                                                                                                         },
// //                                                                                                         outline: "none",
// //                                                                                                     }}
// //                                                                                                 >
// //                                                                                                     {param2Item?.param2dataname}
// //                                                                                                 </Box>
// //                                                                                             ))}

// //                                                                                     </Box>
// //                                                                                 </Box>
// //                                                                             </>
// //                                                                         }
// //                                                                         )}
// //                                                                     </Masonry>
// //                                                                 </Box>
// //                                                             </Box>
// //                                                         </>
// //                                                     )}
// //                                                 </AnimatePresence>


// //                                             </Box>
// //                                         ))}
// //                                         {islogin && <Box
// //                                             sx={{ position: "relative" }}>
// //                                             <Box
// //                                                 component={Link}
// //                                                 to="/p/NewArrival/?N=TmV3QXJyaXZhbA=="
// //                                                 sx={{
// //                                                     px: 2,
// //                                                     py: 3,
// //                                                     bgcolor: "transparent",
// //                                                     border: "none",
// //                                                     cursor: "pointer",
// //                                                     fontSize: "0.8125rem",
// //                                                     fontWeight: 500,
// //                                                     letterSpacing: 0.8,
// //                                                     textDecoration: "none",
// //                                                     transition: "all 0.2s ease",
// //                                                     position: "relative",
// //                                                     color: isHovered || isScrolled ? "#000" : "#fff",
// //                                                     "&::after": {
// //                                                         content: '""',
// //                                                         position: "absolute",
// //                                                         top: 45,
// //                                                         left: "50%",
// //                                                         transform: "translateX(-50%)",
// //                                                         // width: hoveredItem === item?.menuname ? "80%" : "0%",
// //                                                         height: 2,
// //                                                         bgcolor: "#d4d4d4",
// //                                                         transition: "width 0.3s ease",
// //                                                     },
// //                                                     outline: "none",
// //                                                     boxShadow: "none",
// //                                                 }}
// //                                             >
// //                                                 New Arrivals
// //                                             </Box>
// //                                         </Box>}
// //                                         {islogin && <Box
// //                                             sx={{ position: "relative" }}>
// //                                             <Box
// //                                                 component={Link}
// //                                                 to="/offers"
// //                                                 sx={{
// //                                                     px: 2,
// //                                                     py: 3,
// //                                                     bgcolor: "transparent",
// //                                                     border: "none",
// //                                                     cursor: "pointer",
// //                                                     fontSize: "0.8125rem",
// //                                                     fontWeight: 500,
// //                                                     letterSpacing: 0.8,
// //                                                     textDecoration: "none",
// //                                                     transition: "all 0.2s ease",
// //                                                     position: "relative",
// //                                                     color: isHovered || isScrolled ? "#000" : "#fff",
// //                                                     "&::after": {
// //                                                         content: '""',
// //                                                         position: "absolute",
// //                                                         top: 45,
// //                                                         left: "50%",
// //                                                         transform: "translateX(-50%)",
// //                                                         // width: hoveredItem === item?.menuname ? "80%" : "0%",
// //                                                         height: 2,
// //                                                         bgcolor: "#d4d4d4",
// //                                                         transition: "width 0.3s ease",
// //                                                     },
// //                                                     outline: "none",
// //                                                     boxShadow: "none",
// //                                                 }}
// //                                             >
// //                                                 Offers
// //                                             </Box>
// //                                         </Box>}

// //                                     </Box>
// //                                 </>
// //                             )}

// //                             <RightSideMenu
// //                                 setSearchOpen={setSearchOpen}
// //                                 IsB2BWebsiteChek={IsB2BWebsiteChek}
// //                                 storeinit={storeinit}
// //                                 handleLogout={handleLogout}
// //                                 islogin={islogin}
// //                                 isMobile={isMobile}
// //                                 cartCount={cartCount}
// //                                 wishCount={wishCount}
// //                                 is768px={is768px}
// //                                 navigate={navigate} isHovered={isHovered} isScrolled={isScrolled} />
// //                         </Toolbar>
// //                     </Container>
// //                 </AppBar>
// //             </motion.div>

// //             <Drawer
// //                 anchor="left"
// //                 open={mobileOpen}
// //                 onClose={handleDrawerToggle}
// //                 sx={{
// //                     "& .MuiDrawer-paper": {
// //                         width: { xs: "85%", sm: 380 },
// //                         maxWidth: "100%",
// //                     },
// //                 }}
// //             >
// //                 {DrawerSearchOpen && <DrawerSearchBar
// //                     setSearchOpen={setDrawerSearchOpen}
// //                     searchDataFucn={searchDataFucn}
// //                 />}
// //                 <Box
// //                     sx={{
// //                         display: "flex",
// //                         justifyContent: "space-between",
// //                         alignItems: "center",
// //                         p: 2,
// //                         borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
// //                     }}
// //                 >
// //                     <Box component="img" src={compnyLogoM} alt="SHAYN" sx={{}} />

// //                     <Box
// //                         sx={{
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             gap: 0.6
// //                         }}
// //                     >
// //                         {islogin && <IconButton
// //                             onClick={() => setDrawerSearchOpen((prev) => !prev)}
// //                             sx={{
// //                                 color: "#000",
// //                             }}
// //                         >
// //                             <SearchIcon style={{ fontSize: "18px", color: "inherit" }} />
// //                         </IconButton>}
// //                         {islogin && <IconButton
// //                             sx={{
// //                                 color: "#000",
// //                             }}
// //                             onClick={() => navigateToMenu("/myWishList")}
// //                         >
// //                             <Badge badgeContent={wishCount || 10} color="error">
// //                                 <FavoriteIcon style={{ fontSize: "18px", color: "inherit" }} />
// //                             </Badge>
// //                         </IconButton>}
// //                         <IconButton onClick={handleDrawerToggle}>
// //                             <CloseIcon />
// //                         </IconButton>
// //                     </Box>
// //                 </Box>
// //                 <MobileMenu
// //                     activeMenu={activeMenu}
// //                     menuItems={menuItems}
// //                     handleMobileMenuClick={handleMobileMenuClick}
// //                     handleMobileBack={handleMobileBack}
// //                     handelMenu={handelMenu}
// //                     islogin={islogin}
// //                     storeinit={storeinit}
// //                     IsB2BWebsiteChek={IsB2BWebsiteChek}
// //                 />
// //             </Drawer>
// //         </>
// //     );
// // };

// // export default PremiumNavbar;


// // export default PremiumNavbar;
