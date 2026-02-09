import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";
import './OurStory.scss';
import { useMediaQuery } from "@mui/material";
import { Container, Typography, Box } from "@mui/material";


export default function OurStory() {
  const [htmlContent, setHtmlContent] = useState("");
  const MediaQuery768 = useMediaQuery('(max-width: 1000px)')

  useEffect(() => {
    fetch(`${storImagePath()}/static-html-page/Story.html`)
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
      top: 0
    })
  }, [])
  return (
    <div className="hoq_ourStory">
      {/* <div>
        <div
          style={{
            padding: "0 15px",
            width: MediaQuery768 ? "95%" : "70%",
            margin: "0 auto"
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div> */}
      <div class="hoq_story_header">
        <h1>Our Story</h1>
    </div>
      <AboutShanthaJewellers/>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}




const AboutShanthaJewellers = () => {
  return (
    <Container maxWidth="md" className="hoq_conatiner">
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom className="hoq_conatiner">
          A Legacy of Trust Since 1978
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph className="hoq_conatiner">
          Shantha Jewellers is a name built on trust, craftsmanship, and
          relationships that span generations.
        </Typography>

        <Typography variant="body1" paragraph className="hoq_conatiner">
          Established in 1978, Shantha Jewellers began as a humble family-run
          jewellery store with a clear philosophy — honesty in purity,
          transparency in pricing, and excellence in craftsmanship. Over the
          decades, this commitment has earned us the trust of countless families,
          many of whom have celebrated life’s most precious moments with
          jewellery from us.
        </Typography>

        <Typography variant="body1" paragraph className="hoq_conatiner">
          Rooted in tradition and evolving with time, Shantha Jewellers blends
          classic artistry with modern design and technology. Our collections are
          thoughtfully curated, quality-certified, and crafted to reflect both
          heritage and contemporary elegance.
        </Typography>

        <Typography variant="body1" paragraph className="hoq_conatiner">
          As we step into the digital world, our promise remains unchanged — to
          deliver jewellery that symbolizes trust, value, and timeless beauty.
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: 600 }} className="hoq_conatiner">
          Shantha Jewellers is not just a brand. It is a legacy passed on with
          pride.
        </Typography>
      </Box>
    </Container>
  );
};
