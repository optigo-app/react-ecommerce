import React, { useState } from "react";
import { Box } from "@mui/material";
import Customtab from "./ui/Customtab";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import { tabAtom } from "./../../../../../../../../hooks/usePersistentTab";
import { useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Wrapper = ({ children, activeTab }) => {
    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
};

const TabBasedNewSection = ({ carousel,
    isLogin,
    socialMediaBanner,
    banner }) => {
    const activeTab = useRecoilValue(tabAtom);

    return (
        <>
            <Box>
                <Customtab />

                <Box sx={{ mt: 1 }}>
                    {activeTab === 0 && (
                        <Wrapper activeTab={activeTab}>
                            <Tab1
                                carousel={carousel}
                                isLogin={isLogin}
                                socialMediaBanner={socialMediaBanner}
                                banner={banner}
                            />
                        </Wrapper>
                    )}
                    {activeTab === 1 && (
                        <Wrapper activeTab={activeTab}>
                            <Tab2
                                carousel={carousel}
                                isLogin={isLogin}
                                socialMediaBanner={socialMediaBanner}
                                banner={banner}
                            />
                        </Wrapper>
                    )}
                    {activeTab === 2 && (
                        <Wrapper activeTab={activeTab}>
                            <Tab3 />
                        </Wrapper>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default TabBasedNewSection;
