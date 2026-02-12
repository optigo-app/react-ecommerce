import { useState, useEffect } from 'react';
import './Css/ShopBanner.modul.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { el_loginState } from '../../../../Recoil/atom';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import noimagefound from '../../../../Assets/image-not-found.jpg';
import { FiChevronRight } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import MaxHeader from './Header';
import { Box, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

const MaxShopBanner = () => {
  const [storeInit, setStoreInit] = useState();
  const islogin = useRecoilValue(el_loginState);
  const [imageUrl, setImageUrl] = useState();
  const [albumList, setAlbumList] = useState([]);
  const loginUserDetail = JSON?.parse(sessionStorage?.getItem("loginUserDetail"));

  const apiCall = () => {
    const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
    setImageUrl(storeInit?.AlbumImageFol);
    setStoreInit(storeInit);
    const visiterID = Cookies.get("visiterId");
    let finalID;

    if (storeInit?.IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumList(response?.Data?.rd);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  if (albumList?.length === 0) {
    return null;
  }

  return (
    <CategoryGrid
      data={albumList}
      imageUrl={imageUrl}
      title="Album"
    />
  );
};
export default MaxShopBanner;



export const CategoryGrid = ({
  AlbumShowMore,
  More,
  Toglefun,
  title = "Find Your Forever Ring",
  data,
  imageUrl,
}) => {
  const navigation = useNavigate();
  const loginUserDetail = JSON?.parse(sessionStorage?.getItem("loginUserDetail"));

  const GenrateImage = (data) => {
    let Image;
    Image = imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName;
    return Image;
  };

  const handleNavigate = (name) => {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  };

  // const compressAndEncode = (inputString) => {
  //   try {
  //     const uint8Array = new TextEncoder().encode(inputString);
  //     const compressed = Pako.deflate(uint8Array, { to: "string" });
  //     return btoa(String.fromCharCode.apply(null, compressed));
  //   } catch (error) {
  //     console.error("Error compressing and encoding:", error);
  //     return null;
  //   }
  // };


  const CountTotalProducts = (alb) => {
    if (alb) {
      const res = alb && JSON?.parse(alb?.Designdetail);
      const totalresults = res?.length;
      return totalresults;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '95%',
          margin: '0 auto',
          padding: { xs: '20px 0', md: '0px 0' },
          boxSizing: 'border-box'
        }}
      >
        <MaxHeader
          title={title}
          alignment="center" />
        <Swiper
          loop
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }} style={{padding:"20px 0 20px 20px",display:"flex",justifyContent:"center"}}>
          {data?.slice(0, AlbumShowMore)?.map((val, i) => {
            return (
              <SwiperSlide style={{boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",minHeight:"400px"}}>
                <div key={i} className="elvee_card-grid">
                  <div className="details_elvee_overlay" onClick={() => handleNavigate(val?.AlbumName)}>
                    <div className="total_Album_elvee">
                      <h2>{CountTotalProducts(val)} Products</h2>
                    </div>

                    <div className="view_colllec_elvee">
                      <span>
                        View The Album <FiChevronRight />
                      </span>
                    </div>
                  </div>
                  <div className="title" onClick={() => handleNavigate(val?.AlbumName)}>
                    <h1>{val?.AlbumName}</h1>
                  </div>
                  <img
                    src={GenrateImage(val)}
                    onError={(e) => {
                      e.target.src = noimagefound;
                      e.target.alt = "no-image-found";
                    }}
                    loading="lazy"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
{/* //only when make expandable
        {data?.length > 2 && (
          <div className="show_mlore_btn_elvee">
            <button onClick={Toglefun}>
              Show {More ? "Less" : "More"} {More ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        )} */}
      </Box>
    </>
  );
};
