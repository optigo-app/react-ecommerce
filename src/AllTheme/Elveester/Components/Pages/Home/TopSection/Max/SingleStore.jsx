import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import MaxHeader from "./Header";

const StoreLocator = () => {
    const Storeimage = storImagePath() + "/images/store.jpg";

    return (
        <>
        
            <Box
                sx={{
                    width: "100%",
                    py: 8,
                    bgcolor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection:'column'
                }}
            >
                <MaxHeader title="Physical Store " alignment="center" />
                <Container maxWidth="xl">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Box
                                component="img"
                                src={Storeimage}
                                alt="Discover our store"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    aspectRatio: { xs: "16/9", md: "16/9" },
                                    objectFit: "cover",
                                    borderRadius: 4,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    display: "block",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: { xs: "center", md: "center" },
                                    textAlign: { xs: "center", md: "center" },
                                    gap: 1.5,
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    fontWeight={600}
                                    sx={{
                                        fontSize: {
                                            xs: "1.75rem",   // Mobile
                                            sm: "2.25rem",   // Tablet
                                            md: "2.75rem",   // Small desktop
                                            lg: "3.25rem",   // Desktop
                                            xl: "3.75rem",   // Large desktop
                                        },
                                        textAlign: { xs: "center", md: "center" },
                                        mb: { xs: 2, md: 2 },
                                    }}
                                >
                                    Discover Our Store
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        // Responsive padding
                                        px: { xs: 6, sm: 10, md: 12, lg: 15 },
                                        py: { xs: 1.2, sm: 1.5 },

                                        // Responsive font size
                                        fontSize: { xs: "0.85rem", sm: "0.9rem" },
                                        fontWeight: 700,
                                        textTransform: "none",
                                        borderRadius: "6px",
                                        boxShadow: "none",
                                        bgcolor: "black",

                                        // Full width on mobile, auto on larger screens
                                        width: { xs: "100%", sm: "auto" },
                                        minWidth: { sm: "200px", md: "280px" },

                                        // Center on mobile, left align on desktop
                                        display: "block",
                                        mx: { xs: "auto", md: 0 },

                                        "&:hover": {
                                            backgroundColor: "#1a1a1aff",
                                            boxShadow: "0 4px 12px rgba(51, 75, 73, 0.4)",
                                        },
                                    }}
                                >
                                    Find Store
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default StoreLocator;
