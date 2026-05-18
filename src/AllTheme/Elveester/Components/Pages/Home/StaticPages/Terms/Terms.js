import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import "./Terms.modul.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import useHomeBannerImages from "../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IsSetupFor, isSetupforMax } from "../../../../Recoil/atom";

const Terms = () => {
    const { termsBanner } = useHomeBannerImages();
    const [firstImageLaod, setFirstImageLoad] = useState(false);
    const Title = IsSetupFor ? "SONASONS" : "Vimal Gold & Diamond";
    const Link = isSetupforMax ? "https://sonasons.optigoapps.com/" : "https://vimalgoldanddiamond.com/"

    const termsArr = [
        { title: "PRODUCT AVAILABILITY", desc: "All of our jewelry is designed and manufactured on-site. We develop new designs by brand wise such as modern jewellerires, high fashion jewelleries occassional orianted jewellery, plain gold jewelleries at every months. These new designs will appeare on our website also we present new products on gem and jewellery exhibitions at india and international sectors." },
        { title: "INFORMATION ON OUR SITE", desc: "We make every effort to ensure that our online catalog is as accurate and complete as possible. To allow you to view our pieces in full detail, some pieces may appear larger or smaller than their actual size and weight in our product images; and since every computer monitor is set differently, size may vary slightly." },
        { title: "RETURN POLICY", desc: "We committed to complete customer satisfaction. We take pride in the quality and workmanship of our merchandise manufactured in our state-of-the-art facility, and we are confident that you will be completely satisfied. The contents of the package must be in their original condition and secure within the box. For your security do not indicate the contents of the package on the exterior of the box." },
        { title: "SHIPPING POLICY", desc: "All of our shipments will be delivered using Indian Courier as well as international couriors. All custom orders will be shipped the following day when your order is completed." },
        { title: "LIMITED WARRANTY", desc: "Our guarantee is simple and straightforward. If something is wrong due to faulty workmanship, we take care of it. It's a fair way of doing business. That being said, precious metals erode and stones can become damaged over time. When normal wear occurs, repairs can be done in house by our expert staff at the normal repair fee. Any work performed by a jeweler other than Elvee automatically voids the warranty. It is the responsibility of the customer to maintain insurance against loss or damage not covered by the warranty." },
    ];

    const DemotermsArr = [
        {
            title: "TERMS AND CONDITIONS ACCEPTANCE",
            desc: `Before using our website located at ${Link} and any associated websites linked to it, please read these Terms and Conditions carefully. By accessing or using our website, you agree to be bound by the terms outlined below.`,
        },

        {
            title: "PRODUCT AVAILABILITY",
            desc: "We make every effort to ensure that all jewelry items displayed on our website are available for purchase. However, due to high demand or limited stock, certain items may become unavailable. In such cases, we will notify you promptly if an item is out of stock after your purchase.",
        },

        {
            title: "PRODUCT ACCURACY",
            desc: "We strive to provide accurate product descriptions, images, and pricing. However, slight variations may occur due to lighting conditions, screen settings, or natural material differences. Product images are for representation purposes only.",
        },

        {
            title: "ORDER PLACEMENT",
            desc: `Once you place an order on our website, you will receive an order confirmation email. This email does not indicate acceptance of your order. The contract between you and ${Title} is completed only once the product is shipped.`,
        },

        {
            title: "PRICING AND PAYMENTS",
            desc: "All prices listed on our website are subject to change without prior notice. Applicable taxes, shipping, and handling charges will be calculated during checkout. Payments are processed securely at the time of order confirmation using approved payment gateways.",
        },

        {
            title: "PAYMENT METHODS",
            desc: "We accept major credit cards, debit cards, and other supported payment methods through secure third-party payment processors.",
        },

        {
            title: "SHIPPING AND DELIVERY",
            desc: `We offer multiple shipping options displayed at checkout. Delivery timelines vary depending on location. ${Title} is not responsible for delays caused by courier services, customs, or unforeseen circumstances.`,
        },

        {
            title: "INTERNATIONAL SHIPPING",
            desc: "International shipping is available. Any customs duties, taxes, or import fees imposed by the destination country are the responsibility of the customer.",
        },

        {
            title: "LOST OR DAMAGED SHIPMENTS",
            desc: "If your order is lost or damaged during transit, please contact us immediately. We will assist you in resolving the issue as per our shipping partner policies.",
        },

        {
            title: "RETURN POLICY",
            desc: "Customer satisfaction is our priority. Products may be returned within the specified return period from the date of receipt, provided they are unused, in original condition, and with all original packaging and tags intact. Custom-made or final-sale items may not be eligible for return.",
        },

        {
            title: "EXCHANGE POLICY",
            desc: "Exchanges are permitted for items of equal value within the specified exchange period, subject to the same conditions as our return policy.",
        },

        {
            title: "REFUNDS",
            desc: "Approved refunds will be processed using the original payment method. Please allow the stated number of business days for the refund to reflect in your account.",
        },

        {
            title: "LIMITED WARRANTY",
            desc: "We provide a limited warranty covering manufacturing defects in materials or workmanship for a specified period from the date of purchase. Repairs or replacements will be handled at our discretion.",
        },

        {
            title: "WARRANTY EXCLUSIONS",
            desc: "The warranty does not cover damage due to misuse, normal wear and tear, accidental damage, or repairs performed by unauthorized parties.",
        },

        {
            title: "INTELLECTUAL PROPERTY",
            desc: `All content on this website, including images, logos, text, and designs, is the intellectual property of ${Title} and is protected by applicable copyright and trademark laws. Unauthorized use is strictly prohibited.`,
        },

        {
            title: "CUSTOMER RESPONSIBILITIES",
            desc: `Customers are responsible for maintaining the confidentiality of their account information and for providing accurate and complete details during transactions. ${Title} is not liable for issues arising from incorrect information.`,
        },

        {
            title: "PRIVACY AND DATA PROTECTION",
            desc: "We respect your privacy and are committed to protecting your personal data. Please refer to our Privacy Policy for detailed information on data collection and usage.",
        },

        {
            title: "LIMITATION OF LIABILITY",
            desc: `{Title} shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability shall not exceed the amount paid for the purchased product.`,
        },

        {
            title: "GOVERNING LAW",
            desc: "These Terms and Conditions are governed by and construed in accordance with the laws of the applicable jurisdiction.",
        },

        {
            title: "DISPUTE RESOLUTION",
            desc: "Any disputes arising from these Terms and Conditions shall be resolved through binding arbitration in the designated location, in accordance with applicable laws.",
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
                <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
                    <Container maxWidth="md">
                        {/* Header */}
                        <Box mb={5} textAlign="center">
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                Terms & Conditions
                            </Typography>

                            <Typography variant="body1" color="text.secondary" maxWidth={640} mx="auto">
                                Please read these terms carefully before using our website or purchasing any products. Your access and use of our services indicate acceptance of these terms.
                            </Typography>
                        </Box>

                        {/* Content Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                overflow: "hidden",
                            }}
                        >
                            {DemotermsArr?.map((item, index) => (
                                <Box key={index}>
                                    <Accordion
                                        disableGutters
                                        elevation={0}
                                        expanded
                                        sx={{
                                            "&:before": { display: "none" },
                                            px: { xs: 2, sm: 3 },
                                            py: 1,
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography fontWeight={600} fontSize="0.95rem" letterSpacing="0.02em">
                                                {item.title}
                                            </Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                                {item.desc}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    {index !== termsArr.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Paper>

                        {/* Footer note */}
                        <Box mt={6} textAlign="center">
                            <Typography variant="caption" color="text.secondary">
                                © {new Date().getFullYear()} {Title}. All rights reserved.
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }

    return (
        <div className="elv_terms_main_div">
            <div className="elv_terms_div">
                <div className="elv_terms_image_div">
                    <Suspense fallback="">
                        <img className="elv_terms_image_1" src={termsBanner?.image?.[0]} alt="terms.jpg" onLoad={() => setFirstImageLoad(true)} />
                        {/* <img className='elv_terms_image_1' src={`${storImagePath()}/images/HomePage/Terms-and-Condtions/TermConditionMainBanner.jpg`} alt="terms.jpg" onLoad={() => setFirstImageLoad(true)} /> */}
                    </Suspense>
                    {firstImageLaod && (
                        <div>
                            <Suspense fallback="">
                                <img className="elv_terms_image_2" src={termsBanner?.image?.[1]} alt="" />
                                {/* <img className='elv_terms_image_2' src={`${storImagePath()}/images/HomePage/Terms-and-Condtions/trans-logo.png`} alt="" /> */}
                            </Suspense>
                        </div>
                    )}
                </div>
                <div className="elv_terms_descriptions_div">
                    <h1 className="elv_terms_head_title">TERMS AND CONDITIONS</h1>
                    <div className="elv_terms_desc">
                        <p>These terms and conditions apply to Web site located at www.elvee.in and It is a basic terms and condition and please it carefully. By using the site, you agree to be bound by these TERMS AND CONDITIONS.</p>

                        {termsArr?.map((i, index) => {
                            return (
                                <>
                                    <div key={index} className="mt-5">
                                        <h3 className="elv_terms_title_main">{i?.title}</h3>
                                        <p className="elv_terms_para_main">{i?.desc}</p>
                                    </div>
                                </>
                            );
                        })}

                        <p className="my-5">* The policy of terms and condition will be change after you cover the membership and above policy is consider as basic policy for non-membership customers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
