import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import MaxHeader from "./Header";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useNavigate } from "react-router-dom";

const MaxCollection = ({ banner }) => {
  const navigate = useNavigate();
  const items = [
    { title: "Men", slug: "Men", image: `${storImagePath()}/Banner/categoryBanner/men.png` },
    { title: "Women", slug: "Women", image: `${storImagePath()}/Banner/categoryBanner/women.png` },
    { title: "Kids", slug: "KID", image: `${storImagePath()}/Banner/categoryBanner/kids.png` },
    // { title: "Gifts", image: banner?.image?.[3] },
  ];

  const handleNavigate = (name) => {

    let finalData = {
      menuname: name,
      FilterKey: "Category",
      FilterVal: name,
      FilterKey1: "",
      FilterVal1: "",
      FilterKey2: "",
      FilterVal2: "",
    };
    sessionStorage.setItem("menuparams", JSON.stringify(finalData));
    const queryParameters1 = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].filter(Boolean).join("/");
    const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`]
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
    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    navigate(url);
  };

  return (
    <Box
      id="elveeGiftMainId"
      name="elveeGiftMainId"
      sx={{
        width: "90%",
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <MaxHeader
          title={"Choose For Your Loved Ones"}
          alignment="center" />
      </Box>


      <Grid
        sx={{
          display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", }, gridTemplateRows: { md: "1fr 1fr", },
        }}
        container spacing={1} justifyContent="center">
        {items.map((item, index) => (
          // <Grid
          //   item
          //   key={index}
          //   xs={12}
          //   sm={6}
          //   md={6} // ✅ 4 items in one row
          // >
          //  </Grid> 
          <Box
            sx={{
              gridColumn: { md: item.title === "Women" ? "2 / 3" : "1 / 2", },
              gridRow: { md: item.title === "Men" ? "1 / 2" : item.title === "Kids" ? "2 / 3" : item.title === "Women" ? "1 / 3" : "auto", },
              position: "relative",
              overflow: "hidden",
              bgcolor: "#fafafa",
              transition: "all 0.35s ease",
              position: "relative",
              overflow: "hidden",
              borderRadius: 6,
              bgcolor: "#fafafa",
              transformStyle: "preserve-3d",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              "&:hover": { transform: "translateY(-5px) rotateX(10deg)", boxShadow: "0 30px 60px rgba(0,0,0,0.18)", },
              "&:hover img": { transform: "scale(1.11)", },
              "&:hover .title": { transform: "translateZ(30px)", textShadow: `0 2px 0 rgba(255,255,255,0.3),0 10px 30px rgba(0,0,0,0.6)`, },
            }}
            onClick={() => handleNavigate(item.slug)}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 6,
                transition: "transform 0.6s ease",
                transform: "scale(1)",
              }}
            />

            {/* Overlay Title */}
            <Box
              sx={{
                position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", p: 3,
                background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1), transparent)", borderRadius: 6,
              }}
            >
              <Typography
                className="title"
                sx={{
                  color: "#fff",
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 600,
                  letterSpacing: 1,
                  transform: "translateZ(0)",
                  transition: "all 0.4s ease",
                  textShadow: `0 1px 0 rgba(255,255,255,0.2),0 4px 12px rgba(0,0,0,0.4)`,
                }}
              >
                {item.title.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MaxCollection;
