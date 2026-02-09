import { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Marquee from "react-fast-marquee";
import FeatherLogo from "../../../../Assets/logo.png";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { IsSetupFor } from "../../../../Recoil/atom";

const InfoMarquee = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [MarqueeItems, setMarqueeItems] = useState([]);

  const path = storImagePath() + "/json/offers.json";
  const Logo = IsSetupFor ? storImagePath() + "/logoIcon/androidCh1.png" : FeatherLogo;
  // storImagePath()

  useEffect(() => {
    let isMounted = true;
    fetch(path, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Invalid response");
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        const cleanOffers = Array.isArray(data?.offers)
          ? data.offers.filter((o) => typeof o === "string" && o.trim() !== "")
          : [];

        setMarqueeItems([...cleanOffers, ...cleanOffers, ...cleanOffers, ...cleanOffers, ...cleanOffers, ...cleanOffers]);
      })
      .catch(() => {
      });

    return () => {
      isMounted = false;
    };
  }, [path]);


  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f8f6f4",
        height: "79px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Marquee
        gradient={false}
        speed={isMobile ? 25 : 40}
        pauseOnHover
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, sm: 6 },
            px: { xs: 2, sm: 4 },
            height: "100%",
          }}
        >
          {MarqueeItems?.map((text, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
                textTransform: "uppercase",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  color: "#222",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {text}
              </Typography>
              {index !== MarqueeItems.length - 1 && (
                <Box
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    color: "#222",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    ...(IsSetupFor ? { width: "40px", height: "40px" } : {
                      width: "60px",
                      height: "60px",
                    }),
                  }}
                  component={"img"}
                  src={Logo}
                />
              )}
            </Box>
          ))}
        </Box>
      </Marquee>
    </Box>
  );
};

export default InfoMarquee;
