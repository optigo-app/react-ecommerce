import React from "react";
import { Box, Grid, Typography, Divider, Container } from "@mui/material";

const stats = [
  {
    title: "Established Excellence",
    subtitle:
      "A legacy of success, driven by passion and innovation",
    isText: true,
  },
  { title: "Working Year", value: "7" },
  { title: "Happy Retailers", value: "300+" },
  { title: "Design", value: "20000+" },
  { title: "Sq Feet Factory Size", value: "75000+" },
];

// test commit

const EstablishedExcellence = () => {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "#f6f6f6",     
          py: { xs: 6, md: 8 },
          borderRadius:4
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 4, md: 0 }}
        >
          {stats.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={item.isText ? 3 : 2}
              sx={{ display: "flex" }}
            >
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  px: { xs: 1, md: 2 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {item.isText ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: { xs: 18, md: 20 },
                        fontWeight: 600,
                        color: "#2b3a67",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#5b6b8c",
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontSize: { xs: 26, md: 30 },
                        fontWeight: 600,
                        color: "#2b3a67",
                        mb: 0.5,
                      }}
                    >
                      {item.value}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 15,
                        color: "#5b6b8c",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </>
                )}
              </Box>

              {/* Divider only on desktop */}
              {index !== stats.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: "none", md: "block" },
                    bgcolor: "#ddd",
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EstablishedExcellence;
