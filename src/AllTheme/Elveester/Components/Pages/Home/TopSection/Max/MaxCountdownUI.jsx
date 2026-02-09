import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { timerExpiredState } from "../../../../Recoil/atom";

const MaxCountdownUI = () => {
  const countdown = useRecoilValue(timerExpiredState);

  const timeBlocks = [
    {
      label: "Days",
      value: countdown?.showTimer ? countdown?.countdown?.days : 0,
    },
    {
      label: "Hours",
      value: countdown?.showTimer ? countdown?.countdown?.hours : 0,
    },
    {
      label: "Minutes",
      value: countdown?.showTimer ? countdown?.countdown?.minutes : 0,
    },
  ];

  return (
    /* 🔹 FULL-WIDTH PREMIUM STRIP */
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(180deg, #f8f9fb 0%, #eef1f6 100%)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        {/* HEADLINE */}
        <Typography
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: 500,
            color: "#5b6b8c",
            mb: 1,
          }}
        >
          Limited Time Event
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 26, md: 34 },
            fontWeight: 600,
            color: "#1d3258",
            mb: 4,
          }}
        >
          Shop Before It Ends
        </Typography>

        {/* TIMER */}
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          {timeBlocks.map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: { xs: 80, md: 100 },
                py: 2,
                px: 2,
                borderRadius: 3,
                bgcolor: "#ffffff",
                boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 600,
                  color: "#1d3258",
                  lineHeight: 1.1,
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#6b7a99",
                  mt: 0.5,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MaxCountdownUI;
