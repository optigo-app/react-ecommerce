import React, { useEffect, useState, useRef } from "react";
import "./elv_cartPage.scss";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { Box, Checkbox, IconButton, Skeleton, useMediaQuery } from "@mui/material";
import noImageFound from "../../Assets/image-not-found.jpg";
import { el_CartCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import { Link, useFormAction } from "react-router-dom";
import RemarkDialog from "./OrderRemarkDialog";
import ItemRemarkDialog from "./ItemRemarkDialog";
import ConfirmationDialog from "../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatter, formatTitleLine } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { useBroadcaster } from "../../utils/BoardCastContext";

const CartItem = ({ item, index, CartCardImageFunc, onSelect, CurrencyData, showRemark1, decodeEntities, isSelected, selectedItem, selectedItemsLength, isActive, border, handleBorder, multiSelect, onRemove, itemLength, showRemark, productRemark, handleAddRemark, handleRemarkChange, handleSave, handleCancel, openHandleUpdateCartModal }) => {
  const [remark, setRemark] = useState(item.Remarks || "");
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(el_CartCount);
  const [storeInitData, setStoreInitData] = useState();
  const [open1, setOpen1] = useState(false);
  const visiterId = Cookies.get("visiterId");
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const CDNDesignImageFolThumb = storeInitData?.CDNDesignImageFolThumb;
  // const fullImagePath = `${CDNDesignImageFolThumb}${item?.designno}~1.${item?.ImageExtension}`;
  const fullImagePath = `${CDNDesignImageFolThumb}${item?.designno}~1.jpg`;
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const { broadcast } = useBroadcaster(); // Get the broadcaster

  const isLoading = item?.loading;

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLargeScreen = useMediaQuery("(min-width: 1600px)");
  const isMediumScreen = useMediaQuery("(min-width: 1038px) and (max-width: 1599px)");
  const isMobileScreen = useMediaQuery("(min-width: 320px) and (max-width: 1037px)");
  const mobileScreen = useMediaQuery("(max-width: 710px)");

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
    const isCartUpdateStatus = sessionStorage.getItem("cartUpdation");
    setCountStatus(isCartUpdateStatus);
  }, [onRemove]);

  // useEffect(() => {
  //   if (storeInitData?.Themeno !== 3) {
  //     if (item?.ImageCount > 0) {
  //       CartCardImageFunc(item).then((src) => {
  //         setImageSrc(src);
  //       });
  //     } else {
  //       setImageSrc(undefined);
  //     }
  //   }
  // }, [item])

  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(item);
    handleClose1();
  };

  useEffect(() => {
    handleIsSelected();
  }, [isSelected]);

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id;
    setIsSelectedItems(isselected);
  };

  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
           broadcast('UPDATE_CART_COUNT', res?.cartcount , item?.autocode , "cart", false );
      });
    }
  };

  const handleConfirm = () => {
    handleRemoveItem(item, index);
    handleClose();
  };

  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef(null);

  const handlePress = (action) => {
    return () => {
      // if (!multiSelect && selectedItemsLength === 0) return;
      // else if (multiSelect && selectedItemsLength === 0) return;
      pressTimer.current = setTimeout(() => {
        // openHandleUpdateCartModal();
        // console.log('selectedItemsssssss', selectedItemsLength);
        alert("Long Pressed Detected...");
      }, 5000);
      setPressing(action === "start");
    };
  };

  const cancelPress = () => {
    clearTimeout(pressTimer.current);
    setPressing(false);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  // const width = isLargeScreen && itemLength <= 3 ? '390px' :
  //   isMediumScreen && itemLength <= 3 ? '330px' : isMobileScreen && itemLength == 1 ? '300px' :
  //     '100%';

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  //  <Box
  //       sx={{
  //         position: "relative",
  //         width: "100%",
  //         height: "100%",
  //         borderRadius: 4,
  //         overflow: "hidden",
  //         aspectRatio: {
  //           xs: "3 / 4",     // mobile
  //           sm: "4 / 5",     // small screens
  //           md: "5 / 6",     // medium screens
  //           lg: "6 / 7",     // large screens
  //         },
  //         bgcolor: '#fff9f266'
  //       }}
  //     >
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "1px solid #e5e5e5",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && "#c20000 1px 1px 1px 0px, #c20000 0px 0px 0px 1px !important",
      }}
    >
      {/* Delete Icon */}
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          bgcolor: "#dbdbdb38",
          backdropFilter: "blur(4px)",
          "&:hover": { background: "rgba(255,255,255,0.9)" },
        }}
        onClick={handleOpen}
      >
        <RiDeleteBinLine />
      </IconButton>

      {/* Image Wrapper */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          aspectRatio: {
            xs: "3 / 3",
            sm: "1 / 1",
            md: "1 / 1",
          },
          bgcolor: "#fff9f266",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(storeInitData?.Themeno !== 3 ? imageSrc === undefined : isLoading) ? (
          <Skeleton variant="rectangular" sx={{ width: "100%", height: "100%", bgcolor: "#fafafa" }} />
        ) : (
          <CardMedia
            component="img"
            image={item?.images}
            draggable={false}
            onClick={() => onSelect(item)}
            onContextMenu={(e) => e.preventDefault()}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
            onError={(e) => {
              const current = e.target.src;
              if (!current.includes(fullImagePath) && item?.ImageCount > 0) {
                e.target.src = fullImagePath;
                return;
              }
              if (!current.includes("image-not-found.jpg")) {
                e.target.src = noImageFound;
              }
            }}
          />
        )}
      </Box>

      <Box sx={{ width: "100%", px: 2, py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Title */}
        {/* <Typography fontWeight={600} fontSize={16} sx={{ lineHeight: 1.3 }}>
          {item?.designno}
          {item?.StockNo && (
            <Typography component="span" sx={{
              color: "text.secondary",
              fontSize: {
                xs: 10,   // small phones
                sm: 13,   // big phones / small tablets
                md: 14,   // tablet / laptop default
                lg: 14,
                xl: 14,
              },
              lineHeight: 1.4,
            }}>
              {" "}({item?.StockNo})
            </Typography>
          )}
        </Typography> */}

        {/* ================================
        FIXED 2×2 GRID (NO COLLAPSE)
     ================================ */}
        {/* <Grid container spacing={1}>

          <Grid item xs={6}>
            <Typography sx={{
              color: "text.secondary",
              fontSize: {
                xs: 10,   // small phones
                sm: 13,   // big phones / small tablets
                md: 14,   // tablet / laptop default
                lg: 14,
                xl: 14,
              },
              lineHeight: 1.4,
            }}>
              {Number(item?.Nwt) !== 0
                ? `NWT: ${(item?.Nwt || 0).toFixed(3)}`
                : ""}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography sx={{
              color: "text.secondary",
              fontSize: {
                xs: 10,   // small phones
                sm: 13,   // big phones / small tablets
                md: 14,   // tablet / laptop default
                lg: 14,
                xl: 14,
              },
              lineHeight: 1.4,
            }}>
              {storeInitData?.IsDiamondWeight == 1 &&
                (item?.Dwt !== "0" || item?.Dpcs !== "0")
                ? `DWT: ${(item?.Dwt || 0).toFixed(3)} / ${(item?.Dpcs || 0)}`
                : ""}
            </Typography>
          </Grid>

        
          <Grid item xs={6}>
            <Typography sx={{
              color: "text.secondary",
              fontSize: {
                xs: 10,   // small phones
                sm: 13,   // big phones / small tablets
                md: 14,   // tablet / laptop default
                lg: 14,
                xl: 14,
              },
              lineHeight: 1.4,
            }}>
              {storeInitData?.IsStoneWeight == 1 &&
                (item?.CSwt !== "0" || item?.CSpcs !== "0")
                ? `CWT: ${(item?.CSwt || 0).toFixed(3)} / ${(item?.CSpcs || 0)}`
                : ""}
            </Typography>
          </Grid>

          
          <Grid item xs={6}>
            <Typography sx={{
              color: "text.secondary",
              fontSize: {
                xs: 10,   // small phones
                sm: 13,   // big phones / small tablets
                md: 14,   // tablet / laptop default
                lg: 14,
                xl: 14,
              },
              lineHeight: 1.4,
            }}>
              {storeInitData?.IsGrossWeight == 1 &&
                Number(item?.Gwt) !== 0
                ? `GWT: ${(item?.Gwt || 0).toFixed(3)}`
                : ""}
            </Typography>
          </Grid>

        </Grid> */}
        {/* ===========================
{/* ===========================
   TITLE + STOCK NO
=========================== */}
        {/* <Typography
          sx={{
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#0a1f47",
            textAlign: "center",
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "1.3em",
            fontSize: { xs: "0.82rem", sm: "0.9rem", md: "0.94rem", lg: "1rem" },
          }}
        >
          {item?.designno}

          {item?.StockNo && (
            <Typography
              component="span"
              sx={{
                fontSize: { xs: 10, sm: 13, md: 14 },
                lineHeight: 1.4,
                ml: 0.3,
                fontWeight: 500,
                fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
                letterSpacing: "0.02em",
              }}
            >
              ({item.StockNo})
            </Typography>
          )}
        </Typography> */}

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#0a1f47",
            textAlign: "center",
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "1.3em",
            fontSize: { xs: "0.82rem", sm: "0.9rem", md: "0.94rem", lg: "1rem" },
          }}
        >
          {formatTitleLine(item?.TitleLine)}
        </Typography>
        {item?.StockNo && (
          <Typography
            component="span"
            sx={{
              fontSize: { xs: 10, sm: 13, md: 14 },
              lineHeight: 1.4,
              ml: 0.3,
              fontWeight: 500,
              fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
              letterSpacing: "0.02em",
            }}
          >
            ({item.StockNo})
          </Typography>
        )}
        {/* ===========================
   NEW ARRIVAL GRID FEELING
   3 ROWS — ALWAYS SAME HEIGHT
=========================== */}
        <Grid container spacing={0.8}>
          {/* DWT (SLOT 1) */}
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
                  color: item?.designno ? "#000" : "transparent",
                  letterSpacing: "0.02em",
                }}
              >
                {item?.designno}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
                  color: item?.Dwt ? "#000" : "transparent",
                  letterSpacing: "0.02em",
                }}
              >
                DWT&nbsp;:
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
                  color: item?.Dwt ? "#000" : "transparent",
                }}
              >
                {storeInitData?.IsDiamondWeight == 1
                  ? item?.Dwt !== "0" || item?.Dpcs !== "0"
                    ? `${(item?.Dwt || 0).toFixed(3)} / ${item?.Dpcs || 0}`
                    : "" // EMPTY BUT SPACE PRESERVED
                  : ""}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {storeInitData?.IsPriceShow == 1 ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                    color: item?.FinalCost ? "#000" : "transparent",
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        decodeEntities(
                          loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode
                        ) + " ",
                    }}
                  />
                  {formatter(item?.FinalCost)}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                    color: "#000",
                  }}
                >
                  --
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.85rem" },
                  color: item?.Nwt ? "#000" : "transparent",
                  letterSpacing: "0.02em",
                }}
              >
                NWT&nbsp;:
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                  color: item?.Nwt ? "#000" : "transparent",
                }}
              >
                {item?.Nwt?.toFixed(3) || "0"}
              </Typography>
            </Box>
          </Grid>


          {/* CWT (SLOT 2) */}
          {/* <Grid item xs={6}>
            <Typography
              sx={{
                color: "#000",
                fontSize: { xs: 10, sm: 13, md: 14 },
                lineHeight: 1.4,
                minHeight: "1.4em",
                justifyContent: "flex-end",
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              {storeInitData?.IsStoneWeight == 1 ? (item?.CSwt !== "0" || item?.CSpcs !== "0" ? `CWT: ${(item?.CSwt || 0).toFixed(3)} / ${item?.CSpcs || 0}` : "") : ""}
            </Typography>
          </Grid> */}

          {/* GWT (SLOT 3 — Bottom Row) */}
          {/* <Grid item xs={6}>
            <Typography
              sx={{
                color: "#000",
                fontSize: { xs: 10, sm: 13, md: 14 },
                lineHeight: 1.4,
                minHeight: "1.4em",
                fontWeight: 500,
              }}
            >
              {storeInitData?.IsGrossWeight == 1 ? (Number(item?.Gwt) !== 0 ? `GWT: ${(item?.Gwt || 0).toFixed(3)}` : "") : ""}
            </Typography>
          </Grid> */}
        </Grid>

        {/* ================================
       REMARK — KEEP SPACING STABLE
     ================================ */}
        <Box sx={{ minHeight: 22, display: "flex", alignItems: "center" }}>
          {item?.Remarks ? (
            <Typography fontSize={14}>
              <strong>Remark: </strong>
              {truncateText(item?.Remarks || productRemark, 40)}
            </Typography>
          ) : (
            <Typography fontSize={14} color="transparent" sx={{ userSelect: "none" }}>
              empty
            </Typography>
          )}
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography
            onClick={handleOpen1}
            sx={{
              fontSize: 14,
              color: "#1a73e8",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {item?.Remarks ? "Edit Remark" : "Add Remark"}
          </Typography>

          <Box
            sx={{
              px: 2,
              py: 0.6,
              bgcolor: "#f3f3f3",
              borderRadius: 20,
              fontSize: 13,
              minWidth: "88px",
              textAlign: "center",
            }}
          >
            In Cart
          </Box>
        </Box>
      </Box>

      {/* Modals */}
      <ItemRemarkDialog handleClose1={handleClose1} open1={open1} remark={remark} onRemarkChange={handleRemarkChangeInternal} onSave={handleSaveInternal} />

      <ConfirmationDialog open={open} onClose={handleClose} onConfirm={handleConfirm} title={"Confirm"} content={"Are You Sure to Delete this items?"} />
    </Card>
  );
};

export default CartItem;

// <Grid item
//   xs={12}
//   sm={itemLength <= 2 ? 6 : 6}
//   md={itemLength <= 2 ? 6 : 6}
//   lg={itemLength <= 2 ? 6 : 4}
//   xxl={itemLength <= 2 ? 6 : 3}
// >
// <Card sx={{width:'100%'}}>
//   <div className='elv_ProductCards'
//     // onClick={() => onSelect(item)}
//     onMouseDown={handlePress('start')}
//     onMouseUp={cancelPress}
//     onMouseLeave={cancelPress}
//     onTouchStart={handlePress('start')}
//     onTouchEnd={cancelPress}
//     style={{
//       boxShadow:
//         !multiSelect &&
//         !isMobileScreen &&
//         selectedItem?.id == item?.id &&
//         "#c20000 1px 1px 1px 0px, #c20000 0px 0px 0px 1px !important",
//       border: selectedItem?.id == item?.id && '1px solid #c20000',
//       // border: isSelectedItems ? '1px solid brown' : '1px solid #e1e1e1'
//     }}
//   >
//     {item?.StockId != 0 &&
//       <div className="elv_inStockbadgeDiv">
//         <span className="elv_inStockbadgeSpan">In Stock</span>
//       </div>
//     }
//     <div className='elv_cardImage_div' >
//       {(storeInitData?.Themeno !== 3 ? imageSrc === undefined : isLoading === true) ? (
//         <Skeleton
//           sx={{
//             width: '13rem',
//             height: '11rem',
//             '@media (max-width: 1550px)': { width: '11rem' },
//             '@media (max-width: 1110px)': { width: '9rem', height: '9rem' },
//             '@media (max-width: 710px)': { width: '9rem', height: '12rem' },
//             '@media (max-width: 650px)': { width: '8rem', height: '12rem' },
//           }}
//           animation="wave"
//           variant="rectangular"
//         />
//       ) : (
//         <CardMedia
//           component="img"
//           className='elv_cart_image'
//           alt=""
//           sx={{
//             width: '13rem',
//             height: '11rem',
//             objectFit: 'cover',
//             '@media (max-width: 1550px)': { width: '11rem' },
//             '@media (max-width: 1110px)': { width: '9rem', height: '9rem' },
//             '@media (max-width: 710px)': { width: '9rem', height: '12rem' },
//             '@media (max-width: 650px)': { width: '8rem', height: '12rem' },
//           }}
//           image={item?.images}
//           onClick={() => onSelect(item)}
//           draggable={false}
//           onContextMenu={(e) => e.preventDefault()}
//           // onError={(e) => {
//           //   if (item?.ImageCount > 0) {
//           //     e.target.src = fullImagePath ? fullImagePath : noImageFound;
//           //   } else {
//           //     e.target.src = noImageFound;
//           //   }
//           // }}
//           onError={(e) => {
//             const img = e.currentTarget;

//             // If fallback already applied → stop.
//             if (img.dataset.fallback === "1") return;
//             img.dataset.fallback = "1";

//             // Decide fallback URL
//             const fallbackSrc =
//               item?.ImageCount > 0
//                 ? (fullImagePath || noImageFound)
//                 : noImageFound;

//             // Create a new Image object to verify fallback
//             const testImg = new Image();
//             testImg.src = fallbackSrc;

//             testImg.onload = () => {
//               img.src = fallbackSrc;   // fallback is valid → show
//             };

//             testImg.onerror = () => {
//               img.src = noImageFound;  // fallback ALSO broken → use final backup
//             };
//           }}

//           loading="lazy"
//         />
//       )}
//     </div>
//     <div className='elv_ProductCard_details'>
//       <div className={`elv_Product_details ${mobileScreen && item?.Remarks !== '' ? 'with-remarks' : ''}`}>
//         <div>
//           <span className='elv_ProdDesignno'>{item?.designno}&nbsp;{item?.StockNo != "" &&
//             <span className='smr_DesignNoTExt'>({item?.StockNo})</span>
//           }</span>
//           <div className='elv_ProdWeights_div'>
//             <div className='elv_ProdWt1_div'>
//               <div>
//                 {(Number(item?.Nwt)) !== 0 && (<><span className='elv_prodWeights_label'>NWT&nbsp;: </span> <span className='elv_prodWeights_data'>&nbsp;{(item?.Nwt || 0).toFixed(3)}{' '}</span></>)}
//               </div>
//               <div>
//                 {storeInitData?.IsDiamondWeight == 1 &&
//                   <>
//                     {(item?.Dwt != "0" || item?.Dpcs != "0") &&
//                       <>
//                         <span className='elv_prodWeights_label'>DWT&nbsp;:</span> <span className='elv_prodWeights_data'>{(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0)}</span>
//                       </>
//                     }
//                   </>
//                 }
//               </div>
//             </div>
//             <div className='elv_ProdWt1_div'>
//               <div >
//                 {storeInitData?.IsStoneWeight == 1 &&
//                   <>
//                     {(item?.CSwt != "0" || item?.CSpcs != "0") &&
//                       <>
//                         <span className='elv_prodWeights_label'>CWT: </span> <span className='elv_prodWeights_data'>{(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0)}{' '}</span>
//                       </>
//                     }
//                   </>
//                 }
//               </div>
//               <div >
//                 {storeInitData?.IsGrossWeight == 1 &&
//                   <>
//                     {(item?.Gwt != 0) &&
//                       <>
//                         <span className='elv_prodWeights_label'>GWT: </span> <span className='elv_prodWeights_data'>{(item?.Gwt || 0).toFixed(3)}</span>
//                       </>
//                     }
//                   </>
//                 }
//               </div>
//             </div>
//           </div>
//           <div className='elv_itemsRemark_div'>

//             {item?.Remarks !== "" && (
//               <div className='elv_remarktext'>
//                 <div style={{ fontWeight: 'bold' }}>Remark:</div> <span className='elv_remmark_div'>{truncateText(item?.Remarks || productRemark, 40)}</span>
//               </div>
//             )}
//             <div className='elv_remarks_remove_div'>
//               <span className='elv_remark_modal_title' onClick={handleOpen1}>{item?.Remarks ? 'Edit Remark' : 'Add Remark'}</span>
//               <span className='elv_remove_items' onClick={handleOpen}>Remove</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <ItemRemarkDialog
//       handleClose1={handleClose1}
//       open1={open1}
//       remark={remark}
//       onRemarkChange={handleRemarkChangeInternal}
//       onSave={handleSaveInternal}
//     />
//     <ConfirmationDialog
//       open={open}
//       onClose={handleClose}
//       onConfirm={handleConfirm}
//       title={"Confirm"}
//       content={"Are You Sure to Delete this items?"}
//     />
//   </div>
// </Card>
