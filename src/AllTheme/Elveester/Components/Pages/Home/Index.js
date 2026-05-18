import React, { lazy } from "react";
import { useRecoilValue } from "recoil";
import { el_companyLogo, el_loginState } from "../../Recoil/atom";
import { Helmet } from "react-helmet-async";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { createSchema, breadcrumbData } from "../../meta/content";

const NewTopSection = lazy(() => import("./TopSection/New/NewTopSection"));
const TabBasedNewSection = lazy(() => import("./TopSection/New/TabBasedNewSection"));
const TopSection = lazy(() => import("./TopSection/TopSection"));
const PromoComponent1 = lazy(() => import("./PromoComponent/PromoComponent/PromoComponent1"));
const BrandsComponent = lazy(() => import("./PromoComponent/BrandsComponent/BrandsComponent"));
const PromoComponent2 = lazy(() => import("./PromoComponent/PromoComponent/PromoComponent2"));
const Collection = lazy(() => import("./Collection/Collection"));
const OldCollection = lazy(() => import("./Collection/OldCollection"));
const Craftmenship = lazy(() => import("./Craftmenship/Craftmenship"));
const GaleryView = lazy(() => import("./GaleryView/GaleryView"));
const CompanyData = lazy(() => import("./ComapnayData/CompanyData"));
const AffiliationData = lazy(() => import("./PromoComponent/BrandsComponent/AffiliationData"));
const SocialMediaSection = lazy(() => import("./SocialMediaSection/SocialMediaSection"));



function Home() {
  const banner = useHomeBannerImages();
  const compnyLogo = useRecoilValue(el_companyLogo);
  const isLogin = useRecoilValue(el_loginState);
  const Schema = createSchema({ logoUrl: compnyLogo });
  const generateBreadcrumbJsonLd = (bcd) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: bcd?.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
  };

  const jsonLd = generateBreadcrumbJsonLd(breadcrumbData);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={breadcrumbData[0].url} />
        {/* <script type="application/ld+json">{JSON.stringify(Schema, null, 2)}</script> */}
        {Schema.map((item, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(item)}
          </script>
        ))}
        <script type="application/ld+json">{JSON.stringify(jsonLd, null, 2)}</script>
      </Helmet>
      <div style={{ position: "relative !important" }}>
        {isLogin ? (
          <>
            {/* <NewTopSection
              bannerlist={banner}
              demoVideo={banner?.demoVideo}
              carousel={banner?.carousel?.image} isLogin={isLogin} socialMediaBanner={banner?.socialMediaBanner2} banner={banner?.mainBanner} /> */}
            {/* <TabBasedNewSection

              carousel={banner?.carousel?.image}
              isLogin={isLogin}
              socialMediaBanner={banner?.socialMediaBanner2}
              banner={banner?.mainBanner}
            /> */}
            <TopSection banner={banner?.mainBanner} />

          </>

        ) : (
          <>
            <TopSection banner={banner?.mainBanner} />
            <PromoComponent1 banner={banner?.middleBanner} />
            <BrandsComponent banner={banner?.brandlogo} />
            <PromoComponent2 banner={banner?.collectionBanner} />
            <OldCollection banner={banner?.categoryBanner} />
            <Craftmenship banner={banner?.promotionalBanner} />
            <GaleryView banner={banner?.photoGallery} />
            <CompanyData />
            <AffiliationData banner={banner?.affiliation} />
            <SocialMediaSection banner={banner?.socialMediaBanner2} />

            {/* <NewTopSection
              bannerlist={banner}
              middleBanner={banner?.middleBanner}
              demoVideo={banner?.demoVideo}
              isLogin={isLogin} carousel={banner?.carousel?.image} socialMediaBanner={banner?.socialMediaBanner2} banner={banner?.mainBanner} /> */}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
