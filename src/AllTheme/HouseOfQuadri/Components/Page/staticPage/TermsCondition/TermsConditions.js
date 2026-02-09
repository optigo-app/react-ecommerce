import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TermsConditions.scss";
import { Link } from "react-router-dom";
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function TermsConditionPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/html/terms.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="hoq_terms">
      {/* <div>
        <div
          className="terms"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div> */}
      <TermsAndConditions />
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" className="font-tenor">
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" className="font-tenor">
          Terms and Conditions
        </Typography>

        <Typography variant="body1" paragraph className="font-tenor">
          Welcome to Shantha Jewellers. By accessing or using our website, mobile application, or online services, you agree to be bound by the following Terms and Conditions.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 1. General */}
        {/* 1. General */}
        <Typography variant="h6" gutterBottom className="font-tenor">
          1. General
        </Typography>

        <BulletList items={["Shantha Jewellers provides online viewing, purchase, and related jewellery services.", "Users must provide accurate personal and transaction information.", "Any misuse of the platform may lead to suspension or cancellation of access."]} />

        {/* 2. Product Information */}
        {/* 2. Product Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }} className="font-tenor">
          2. Product Information
        </Typography>

        <BulletList items={["All jewellery details including weight, purity, stone quality, and pricing are displayed with utmost care.", "Minor variations may occur due to handcrafted processes or photography limitations.", "Certification details will be provided where applicable."]} />

        {/* 3. Pricing & Payments */}
        {/* 2. Product Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }} className="font-tenor">
          3. Pricing & Payments
        </Typography>

        <BulletList items={["Prices are subject to change based on gold rates, diamond prices, and market conditions.", "All payments must be completed through approved payment gateways.", "Orders are confirmed only after successful payment."]} />

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }} className="font-tenor">
          4. Orders & Cancellations
        </Typography>

        <BulletList items={["Once an order is confirmed, cancellations may not be permitted unless explicitly stated.", "Custom-made or personalized jewellery cannot be cancelled or returned."]} />

        {/* 5. Shipping & Delivery */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }} className="font-tenor">
          5. Shipping & Delivery
        </Typography>

        <BulletList items={["Delivery timelines are indicative and may vary due to logistics or external factors.", "Customers must ensure availability at the delivery address.", "Shantha Jewellers is not responsible for delays beyond its control."]} />

        {/* 6. Returns & Exchanges */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }} className="font-tenor">
          6. Returns & Exchanges
        </Typography>

        <BulletList items={["Returns or exchanges are subject to store policies and product condition.", "Any defects must be reported immediately upon delivery."]} />
      </Box>
    </Container>
  );
};

const BulletList = ({ items }) => (
  <List
    component="ul"
    sx={{
      pl: 3,
      listStyleType: "disc",
    }}
    className="font-tenor"
  >
    {items.map((text, index) => (
      <ListItem key={index} component="li" className="font-tenor" sx={{ display: "list-item" }} disablePadding>
        <ListItemText primary={text} className="font-tenor" />
      </ListItem>
    ))}
  </List>
);
