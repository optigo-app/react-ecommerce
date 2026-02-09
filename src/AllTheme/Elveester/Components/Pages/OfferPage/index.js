import React, { useState, useCallback, useEffect } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import CouponCard from "./CouponCard";
import { styled } from "@mui/material/styles";
import Discount from "./discount.webp";
import { DiscountMasterAPI } from "../../../../../utils/API/DiscountMaster/DiscountMaster";
import Cookies from "js-cookie";

const HeaderGradient = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg,#10264E 0%, #10264E 100%)`,
  color: theme.palette.common.white,
  textAlign: "center",
  padding: theme.spacing(8, 2),
}));

export const couponColors = [
  "#4F46E5", // Indigo
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Green
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#F97316", // Orange
  "#14B8A6", // Teal
  "#22D3EE", // Cyan
  "#6366F1", // Indigo Light
  "#F43F5E", // Rose
  "#FBBF24", // Yellow
  "#34D399", // Green Light
  "#60A5FA", // Blue Light
  "#F87171", // Red Light
  "#A78BFA", // Purple
  "#FB923C", // Orange Light
  "#2DD4BF", // Teal Light
  "#22C55E", // Green Emerald
];

const CouponPage = () => {
  const theme = useTheme();
  const [copiedCode, setCopiedCode] = useState("");
  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
    const visiterID = Cookies.get("visiterId");

    const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";
    console.log(finalID);
    const fetchCouponData = async () => {
      const response = await DiscountMasterAPI(finalID);
      if (response?.Data?.rd) {
        const repeatdata = [...response?.Data?.rd , ...response?.Data?.rd , ...response?.Data?.rd , ...response?.Data?.rd , ...response?.Data?.rd];
        setCouponData(response?.Data?.rd);
      } else {
        setCouponData([]);
      }
    };
    fetchCouponData();
  }, []);

  const handleCopy = useCallback((code) => {
    setCopiedCode(code);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 6, overflow: "hidden !important", width: "100%" }}>
      <HeaderGradient>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              letterSpacing: "-0.5px",
              fontSize: { xs: "2rem", md: "2.5rem", lg: "2.5rem" },
            }}
          >
            Exclusive Coupon Codes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1.5,
              color: theme.palette.info.light,
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "0.7rem", md: "1rem" },
            }}
          >
            Here are the latest deals and discounts to help you save on your next purchase. Happy shopping!
          </Typography>
        </Container>
      </HeaderGradient>

      {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <img src={Discount} alt="Discount" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
      </Box> */}
      {/* Coupons Grid */}
      <Container
        maxWidth="xl"
        sx={{
          mt: 6,
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {couponData?.map((coupon, index) => {
            const colorIndex = index % couponColors.length;
            const cardColor = couponColors[colorIndex];
            return (
              <Grid item xs={12} sm={6} lg={4} key={coupon.id}>
                <CouponCard coupon={coupon} onCopy={handleCopy} cardColor={cardColor} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default CouponPage;
