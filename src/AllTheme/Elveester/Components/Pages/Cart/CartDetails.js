import React, { useEffect, useState } from 'react';
import './elv_cartPage.scss';
import Customization from './Customization';
import noImageFound from "../../Assets/image-not-found.jpg"
import { Box, CardMedia, Skeleton, Typography } from '@mui/material';

const CartDetails = ({
  ispriceloding,
  selectedItem,
  CartCardImageFunc,
  qtyCount,
  handleIncrement,
  handleDecrement,
  multiSelect,
  handleAddReamrk,
  productRemark,
  sizeCombo,
  showRemark,
  CurrencyData,
  mrpbasedPriceFlag,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  onUpdateCart,
  decodeEntities,
  handleMoveToDetail }) => {

  // useEffect(() => {
  //   console.log("TCL: selectedItem", selectedItem)
  // }, [selectedItem])

  const [storeInitData, setStoreInitData] = useState();

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

  const CDNDesignImageFolThumb = storeInitData?.CDNDesignImageFolThumb;
  // const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.${selectedItem?.ImageExtension}`;
  const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`;

  const isLoading = selectedItem?.loading;

  const [imageSrc, setImageSrc] = useState();

  // useEffect(() => {
  //   if (storeInitData?.Themeno !== 3) {
  //     if (selectedItem?.ImageCount > 0) {
  //       CartCardImageFunc(selectedItem).then((src) => {
  //         setImageSrc(src);
  //       });
  //     } else {
  //       setImageSrc(noImageFound);
  //     }
  //   }
  // }, [selectedItem, storeInitData]);

  return (
    <Box className="elv_cart-container"
    sx={{
      width:'100%',
      bgcolor:'#f4f4f4e8',
      borderRadius:4 ,
      py:2  ,
      px:2 ,
      position:'sticky',
      top:85,
      zIndex:100
    }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 ,bgcolor:'#fff',py:2,width:'100%',borderRadius:4,mb:1.6 }}>
              <Box>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: 700, letterSpacing: -0.2 ,px:2 }}
                >
                   Customization 
                </Typography>
              </Box>
            </Box>
      <div className="elv_Cart-imageDiv">

        {/* {imageSrc !== undefined && (
          <img src={imageSrc} alt="Cluster Diamond" className='elv_cartImage' onClick={() => handleMoveToDetail(selectedItem)} />
        )} */}
        {(storeInitData?.Themeno !== 3 ? imageSrc === undefined : isLoading === true) ? (
          <CardMedia
            width="100%"
            height={400}
            sx={{
              width: "100%",
              height: "400px !important",
              '@media (max-width: 1750px)': {
                width: "100%",
                height: "350px !important",
              },
              '@media (max-width: 1500px)': {
                width: "100%",
                height: "300px !important",
              },
              '@media (max-width: 1100px)': {
                width: "100%",
                height: "250px !important",
              },
            }}
          >
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="100%"
            />
          </CardMedia>
        ) : (
          <img
            src={selectedItem?.images ? selectedItem?.images :
              selectedItem?.ImageCount > 1 ? `${storeInitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1~${selectedItem?.metalcolorname}.jpg` :
                `${storeInitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`
            }
            alt=""
            className='elv_cartImage'
            onClick={() => handleMoveToDetail(selectedItem)}
            onError={(e) => {
              const current = e.target.src;

              // Level 1 → try CDN path
              if (!current.includes(fullImagePath) && selectedItem?.ImageCount > 0) {
                e.target.src = fullImagePath;
                return;
              }

              // Level 2 → try noImageFound
              if (!current.includes('image-not-found.jpg')) {
                e.target.src = noImageFound;
                return;
              }
            }}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            loading='lazy'
          />
        )}

      </div>
      <Box
        sx={{
          width: '100%',
          py: 1,
          display: 'flex',
          alignItems: 'center',
          px: 1
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: 600,
            color: "#1A1A1A", // modern deep-dark tone
            fontSize: {
              xs: 14,   // mobile
              sm: 15,   // small screens
              md: 16,   // medium screens
              lg: 17,   // desktops
            },
            lineHeight: 1.3,
            letterSpacing: "0.2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {selectedItem?.designno}
        </Typography>
      </Box>

      <Customization
        ispriceloding={ispriceloding}
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        sizeCombo={sizeCombo}
        CurrencyData={CurrencyData}
        mrpbasedPriceFlag={mrpbasedPriceFlag}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleMetalTypeChange={handleMetalTypeChange}
        handleMetalColorChange={handleMetalColorChange}
        handleDiamondChange={handleDiamondChange}
        handleColorStoneChange={handleColorStoneChange}
        handleSizeChange={handleSizeChange}
        decodeEntities={decodeEntities}
        onUpdateCart={onUpdateCart}
      />
    </Box>
  );
};

export default CartDetails;



