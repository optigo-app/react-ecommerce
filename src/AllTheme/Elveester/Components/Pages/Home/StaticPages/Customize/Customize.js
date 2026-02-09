import React, { useEffect } from "react";
import "./Customize.modul.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import useHomeBannerImages from "../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { IsSetupFor } from "../../../../Recoil/atom";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Divider } from "@mui/material";

const Customize = () => {
    const { customizeBanner } = useHomeBannerImages();
    const custArr = [
        {
            image: `${customizeBanner?.image?.[1]}`,
            title: "Create New Design",
            para: "If you're the creative type and have a design of your own or have seen a method that has inspired you, we will assist you to place your ideas into precious metals and gemstones. Our designers can run through logistics, feasibility, durability, and affordability with you. This is often a really rewarding process that leads to an ingenious piece of fine jewelry of your own design.",
        },
        {
            image: `${customizeBanner?.image?.[2]}`,
            title: "Modify Existing Design",
            para: "Custom designs are mostly derived from existing jewelry, preferred with a different shape, size, or color stone. Frequently, our customers desire a piece of jewelry that they like, a touch thinner, longer, taller, or favor a special texture or pattern. We often face a challenge in finding ways to make similar jewelry at a price point that meets your budget. No problem, we will make it for you the way that you want it! You may have even found the right design except for its finishes. Simply switching the stone type or employing a different value could also be only enough to satisfy your personal taste.",
        },
    ];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    if (IsSetupFor) {
        return (
            <>
                <CustomizeDesign customizeBanner={customizeBanner} custArr={custArr} />
            </>
        );
    }

    return (
        <div className="elv_customize_maindiv">
            <div className="elv_customize_div">
                <img className="elv_customize_image_1" src={customizeBanner?.image?.[0]} alt="" />
                {/* <img className='elv_customize_image_1' src={`${storImagePath()}/images/HomePage/Customize/CustomizeMainBanner.jpg`} alt="" /> */}
                <div className="elv_customize_details_main">
                    <h1 className="elv_customise_head_title">BUILD YOUR OWN UNIQUE DESIGN</h1>
                    <div className="">
                        <h5 className="elv_customise_head_title_1">TYPES OF DESIGNS</h5>
                        <p className="elv_customize_title_para">Our designers will work with you and help you to confidently select the elements in jewelry that you will like. It is our responsibility to make sure that we discover your needs before we execute a project for you. We are so confident in the custom jewelry design process that we create all of our customized jewelry on approval.</p>
                    </div>
                    <div className="elv_customize_details_div">
                        {custArr?.map((items) => {
                            return (
                                <>
                                    <div className="elv_customize_det" key={items}>
                                        <div>
                                            <img className="elv_customize_det_image" src={items?.image} alt="customize images" />
                                        </div>
                                        <div className="elv_customize_det_desc">
                                            <span className="elv_customize_det_span">{items?.title}</span>
                                            <p className="elv_customize_det_para">{items?.para}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customize;

function CustomizeDesign({ customizeBanner, custArr = [] }) {
    return (
        <Box sx={{ bgcolor: "#fff", width: "100%" }}>
            {/* ================= Banner ================= */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 240, sm: 320, md: 440 },
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src={customizeBanner?.image?.[0]}
                    alt="Build Your Own Unique Design"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            {/* ================= Content ================= */}
            <Container maxWidth="lg">
                <Box sx={{ py: { xs: 5, md: 8 } }}>
                    {/* Headings */}
                    <Box textAlign="center" mb={5}>
                        <Typography variant="h4" fontWeight={700} letterSpacing="0.06em" gutterBottom>
                            BUILD YOUR OWN UNIQUE DESIGN
                        </Typography>

                        <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                            TYPES OF DESIGNS
                        </Typography>

                        <Typography variant="body1" color="text.secondary" maxWidth={820} mx="auto" mt={2} lineHeight={1.8}>
                            Our designers will work closely with you to help you confidently select the elements in jewelry that reflect your personal style. We take the time to understand your needs before executing your project, ensuring every custom piece is crafted to perfection.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: { xs: 4, md: 6 } }} />

                    {/* ================= Design Types ================= */}
                    <Grid container spacing={2}>
                        {custArr.map((item, index) => (
                            <Grid key={index} xs={12} display="flex">
                                <Card
                                    elevation={0}
                                    sx={{
                                        width: "100%",
                                        borderRadius: 3,
                                        border: "1px solid",
                                        borderColor: "grey.200",
                                        transition: "all 0.25s ease",
                                        mt:2
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item?.image}
                                        alt={item?.title}
                                        sx={{
                                            height: 220,
                                            objectFit: "cover",
                                        }}
                                    />

                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom textAlign="center">
                                            {item?.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            lineHeight={1.7}
                                            textAlign="center"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 5,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {item?.para}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
