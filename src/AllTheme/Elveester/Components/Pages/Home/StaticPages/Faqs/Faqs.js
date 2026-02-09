import React, { useEffect } from "react";
import "./Faqs.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import FaqSecData from "../FaqData/FaqSecData";
import useHomeBannerImages from "../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { websiteFaqs, productFaqs, careRepairFAQ, customerServiceFaq, designCustoFaq, qualityAssuranceFaq, paymentFaq, shippingFaq, contactFaq, anyOtherQues, sonasonsFaqs } from "../../../Constants/Faqlist";
import { Helmet } from "react-helmet-async";
import { IsSetupFor } from "../../../../Recoil/atom";

const allFaqs = [...websiteFaqs, ...productFaqs, ...careRepairFAQ, ...customerServiceFaq, ...designCustoFaq, ...qualityAssuranceFaq, ...paymentFaq, ...shippingFaq, ...contactFaq, ...anyOtherQues];

export const generateFAQJsonLd = (faqArray) => {
    const structured = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqArray.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: Array.isArray(faq.answer)
                    ? faq.answer.join("<br/>") // join multi-line answers
                    : faq.answer,
            },
        })),
    };

    return structured;
};

const Faqs = () => {
    const { faqBanner } = useHomeBannerImages();
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
        });
    }, []);

    const jsonLd = generateFAQJsonLd(allFaqs);

    if (IsSetupFor) {
        return <>
            <NewFaq faqBanner={faqBanner} />
        </>
    }

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(jsonLd, null, 2)}</script>
            </Helmet>
            <div className="elv_FaqSection">
                <div className="image_bar">
                    <img src={faqBanner?.image?.[0]} alt="faq.png" />
                    {/* <img src={`${storImagePath()}/images/HomePage/Faq/FAQ_Banner.jpg`} alt="faq.png" /> */}
                </div>
                <FaqSecData />
            </div>
        </>
    );
};

export default Faqs;

const NewFaq = ({faqBanner}) => {
    return (
        <>
            <>
                {/* ================= SEO ================= */}
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify(generateFAQJsonLd(sonasonsFaqs))}</script>
                </Helmet>

                {/* ================= Banner ================= */}
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: 220, sm: 300, md: 420 },
                        overflow: "hidden",
                    }}
                >
                    <Box
                        component="img"
                        src={faqBanner?.image?.[0]}
                        alt="Jewelry FAQs"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* ================= FAQ Content ================= */}
                <Container maxWidth="md">
                    <Box sx={{ py: { xs: 5, md: 8 } }}>
                        {/* Header */}
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" fontWeight={700} letterSpacing="0.05em" gutterBottom>
                                Frequently Asked Questions
                            </Typography>

                            <Typography variant="body1" color="text.secondary" maxWidth={720} mx="auto" lineHeight={1.8}>
                                Find answers to common questions about our jewelry, craftsmanship, orders, payments, shipping, customization, and after-sales services.
                            </Typography>
                        </Box>

                        {/* FAQ Accordions */}
                        <Box
                            sx={{
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "grey.200",
                                overflow: "hidden",
                            }}
                        >
                            {sonasonsFaqs?.map((faq, index) => (
                                <Box key={index}>
                                    <Accordion
                                        disableGutters
                                        elevation={0}
                                        sx={{
                                            "&:before": { display: "none" },
                                            px: { xs: 2, sm: 3 },
                                            py: 1,
                                        }}
                                        expanded
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography fontWeight={600} fontSize="0.95rem">
                                                {faq.question}
                                            </Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                                                {Array.isArray(faq.answer)
                                                    ? faq.answer.map((line, i) => (
                                                        <Box key={i} mb={1}>
                                                            {line}
                                                        </Box>
                                                    ))
                                                    : faq.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    {index !== allFaqs.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>

                        {/* Footer Note */}
                        <Box mt={6} textAlign="center">
                            <Typography variant="caption" color="text.secondary">
                                Still have questions? Contact Sonasons customer support — we’re happy to help.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </>
        </>
    );
};
