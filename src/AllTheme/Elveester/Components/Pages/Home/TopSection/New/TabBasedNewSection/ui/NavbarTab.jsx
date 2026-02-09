import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { tabAtom } from "../../../../../../../../../hooks/usePersistentTab";

const defaultGradients = [
  {
    bg: "linear-gradient(135deg, #FFF5F8 0%, #FDECF2 40%, #F8DDE7 100%)",
    color: "#7A3E55",
  },
  {
    bg: "linear-gradient(135deg, #FFF4DA 0%, #F7E6BC 45%, #E8CF92 100%)",
    color: "#7A5A21",
  },
  {
    bg: "linear-gradient(135deg, #F1FFF7 0%, #E2F7ED 45%, #CFF2DF 100%)",
    color: "#2A6F56",
  },
];

const Customtab = ({ Color, MenuList = [] }) => {
  const [activeTab, setActiveTab] = useRecoilState(tabAtom);

  // 🔥 Take only the first 3 items from API
  const firstThree = MenuList.slice(0, 3);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          bgcolor: "transparent",
          border: "none",
          gap: 1.2,
        }}
      >
        {firstThree.map((tab, index) => {
          const isActive = activeTab === index;
          const gradient = defaultGradients[index]; // Assign gradient by index

          return (
            <Box
              key={tab.ProductTypeId}
              onClick={() => setActiveTab(index)}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                borderRadius: "99px",
                transition: "color 0.3s ease",
                color: isActive ? gradient.color : Color,
                py: 1,
                px: 2.4,
                whiteSpace: "nowrap",
              }}
            >
              {/* 🔥 Animated Pill */}
              {isActive && (
                <Box
                  component={motion.div}
                  layoutId="activePill"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "99px",
                    background: gradient.bg,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                    zIndex: -1,
                  }}
                />
              )}

              {/* TEXT ONLY (no icon) */}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "15px",
                }}
              >
                {tab.ProductTypeName}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Customtab;
