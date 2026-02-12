import React, { useEffect, useState } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { el_loginState, IsSetupFor, isSetupforMax } from "../../../../Recoil/atom";
import MarqueeBar from "./Marquee";
import JewelryShowcase from "./Category";
import NewArrivalsSection from "./NewArrival";
import SocialMediaSection from "../../SocialMediaSection/SocialMediaSection";
import { HomeCollectionApi } from "../../../../../../../utils/API/Home/HomeCollectionApi/HomeCollectionApi";
import { HomeCategoryApi } from "../../../../../../../utils/API/Home/HomeCategoryApi/HomeCategoryApi";
import Cookies from "js-cookie";
import HeroMediaSlider from "./HeroMediaSlider";
import PromoComponent1 from "../../PromoComponent/PromoComponent/PromoComponent1";
import "./index.scss";
import MaxBrandsComponent from "../Max/BrandComponent";
import ProTwo from '../Max/PromoTwo'
import MaxCollection from "../Max/Maxcollection";
import MaxCraftmenship from "../Max/MaxCraftmenship";
import MaxGalleryView from "../Max/MaxGallery";
import MaxEstablishedExcellence from "../Max/MaxEstablishedExcellence";
import MaxAffiliation from "../Max/MaxAffiliation";
import MaxCountdownUI from "../Max/MaxCountdownUI";
import CategorySlider from "../Max/Category";
import CollectionsSlider from "../Max/CollectionsSlider";
import MaxDesignSet from "../Max/MaxDesignSet";
import MaxNewArrivalsSection from '../Max/MaxNewArrival';
import MaxBestSeller from "../Max/MaxBestSeller";
import MaxStore from "../Max/MaxStore";
import StoreLocator from "../Max/SingleStore";
import MaxShopBanner from "../Max/MaxShopBanner";



const NewTopSection = ({ bannerlist, banner, socialMediaBanner, carousel, isLogin, middleBanner, demoVideo }) => {
  const islogin = useRecoilValue(el_loginState);
  const [loading, setLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [SectionData, setSectionData] = useState({
    collection: [],
    category: [],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoPlay = () => setVideoStarted(true);
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageLoaded(false);

  const fetchHomeCollection = async () => {
    try {
      const loginUserDetail = JSON?.parse(sessionStorage?.getItem("loginUserDetail"));
      const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
      const { IsB2BWebsite } = storeInit;
      const visiterID = Cookies.get("visiterId");
      let finalID;
      if (IsB2BWebsite == 0) {
        finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
      } else {
        finalID = loginUserDetail?.id || "0";
      }
      const response = await HomeCollectionApi(finalID);
      const Response = await HomeCategoryApi(finalID);
      setSectionData({
        collection: response?.Data?.rd ?? [],
        category: Response?.Data?.rd ?? [],
      });
    } catch (error) {
      console.error("Error fetching home collection:", error);
    }
  };

  useEffect(() => {
    fetchHomeCollection();
  }, []);

  // const isVideo = !islogin; //if want to play video on not logged in
  const isVideo = false;
  const isDemo =  IsSetupFor ? false : isVideo;
  const mediaData = isDemo
    ? [
      {
        type: "video",
        src: banner?.video?.[0],
        poster: banner?.image?.[0] || "fallback.jpg",
      },
    ]
    : carousel?.map((img) => ({
      type: "image",
      src: img,
    })) || [];

  const showMarquee = isLogin && !isSetupforMax;

  const ShowBeforeLogin = !IsSetupFor && !isLogin ;


  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.default",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          zIndex: 10,
          bgcolor: "transparent ",
          marginTop: IsSetupFor ? 0 : "-120px !important",
          height: "100%",
          "@media (min-width:1200px) and (max-width:1376px)": {
            marginTop: IsSetupFor ? 0 : "-120px !important",
          },
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <HeroMediaSlider
            media={mediaData}
            isVideo={isVideo}
          />

          {showMarquee && <MarqueeBar />}
          {showMarquee && <JewelryShowcase data={SectionData} />}
          {showMarquee && <NewArrivalsSection />}
          {/* {ShowBeforeLogin && <PromoComponent1 banner={middleBanner} />} */}
          {isSetupforMax && (
            <>
              <CategorySlider />
              {/* <MaxCollection banner={bannerlist?.categoryBanner} /> */}
              <MaxShopBanner />
              <CollectionsSlider/>
              <MaxDesignSet/>
              <MaxGalleryView banner={bannerlist?.photoGallery} />
              <MaxNewArrivalsSection />
              <MaxBestSeller />
              {/* <MaxStore/> */}
              <StoreLocator/>
             {isLogin && <SocialMediaSection banner={socialMediaBanner} demoVideo={demoVideo?.video} />}
              {/* <MaxDesignSet data={banner?.lookbookBanner} /> */}
              {/* {!isLogin && <MaxBrandsComponent banner={bannerlist?.brandlogo} />} */}
              {/* {!isLogin && <ProTwo banner={bannerlist?.collectionBanner} />} */}
              {/* {!islogin && <MaxCraftmenship banner={bannerlist?.promotionalBanner} />} */}
              {/* {!islogin && <MaxEstablishedExcellence />} */}
              {/* {!islogin && <MaxAffiliation banner={bannerlist?.affiliation} />} */}
              {/* {islogin && <MaxCountdownUI />} */}
            </>
          )}
          {!isLogin && <SocialMediaSection banner={socialMediaBanner} demoVideo={demoVideo?.video} />}
        </Container>
      </Box>
    </Box>
  );
};

export default NewTopSection;
