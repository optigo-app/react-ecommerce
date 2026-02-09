import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Divider,
    Stack,
    ThemeProvider,
    Container,
    Paper,
    Avatar,
    Link,
    Skeleton,
    Chip,
    IconButton,
    FormHelperText,
} from '@mui/material';
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import CloseIcon from "@mui/icons-material/CloseRounded";


import { theme } from './Theme';
import usePaymentLogic from './PaymentLogic';
import OrderRemarkModal from '../Glob_Functions/OrderRemark/OrderRemark';
import EnhancedPaymentDialog from './PaymentDialog';
// import './Payment.scss'

export default function PaymentComponent({ bgcolor, textColor, top, elvee = false }) {
    const {
        handlePay,
        handleSaveInternal,
        handleRemarkChangeInternal,
        handleOpen,
        handleClose,
        handleChangeAddr,
        open,
        selectedPayment,
        selectedAddrData,
        taxAmmountData,
        orderRemakdata,
        orderRemark,
        currCode,
        formatter,
        errorMsg,
        selectedMode,
        setSelectedPayment,
        paymentMethods,
        isloding,
        isloder,
        isPloding,
        setRefetchEstimateTax
    } = usePaymentLogic();

    const { IsPriceShow } = JSON?.parse(sessionStorage?.getItem("storeInit")) ?? {};
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const ElveeMessage = 'Subject to minor rounding differences in the final total.';

    const round = (num) => Number(num.toFixed(3));

    const getCartSummary = () => {
        try {
            const raw = sessionStorage.getItem("CartSummary");
            if (!raw) return null;

            const s = JSON.parse(raw);

            return {
                ...s,
                totalGwt: round(s.totalGwt),
                totalNwt: round(s.totalNwt),
                totalDwt: round(s.totalDwt),
                dwtPerPiece: round(s.dwtPerPiece),
                cswtPerPiece: round(s.cswtPerPiece),
            };

        } catch {
            return null;
        }
    };

    const summary = getCartSummary()


    const RemoveCoupon = () => {
        sessionStorage.removeItem("AppliedCoupon");
        setAppliedCoupon(null);
        setRefetchEstimateTax((prev) => !prev);
    };

    useEffect(() => {
        const storedCoupon = sessionStorage.getItem("AppliedCoupon");
        if (storedCoupon) {
            setAppliedCoupon(storedCoupon);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6, marginTop: top ?? "" }}>
                <Container maxWidth="xl">
                    {/* <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                        Complete Your Purchase
                    </Typography> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                                <Card sx={{
                                    maxHeight: '500px',
                                    overflow: 'auto'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Payment Method
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            Choose your preferred payment option
                                        </Typography>
                                        <RadioGroup
                                            value={selectedPayment}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                        >
                                            <Grid container spacing={2}>
                                                {paymentMethods.map((method) => (
                                                    <Grid item xs={12} sm={12} md={12} key={method.id}>
                                                        <Paper
                                                            elevation={selectedPayment === method.id ? 3 : 1}
                                                            sx={{
                                                                p: 2,
                                                                boxShadow: 'rgba(99, 99, 99, 0.1) 0px 2px 8px 0px',
                                                                transition: 'all 0.3s',
                                                                border: selectedPayment == method.id ? '1px solid #000' : '1px solid transparent',
                                                                '&:hover': {
                                                                    bgcolor: 'action.hover',
                                                                },
                                                                bgcolor: selectedPayment == method.id ? '#f0f0f0' : 'transparent',
                                                            }}
                                                        >
                                                            <FormControlLabel
                                                                value={method.id}
                                                                control={<Radio sx={{ color: selectedPayment === method.id ? '#7d7f85' : 'grey' }} />}
                                                                label={
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                        <Avatar sx={{ bgcolor: method.color }}>
                                                                            <Box sx={{ color: '#fff' }}>
                                                                                {method.icon}
                                                                            </Box>
                                                                        </Avatar>
                                                                        <Box>
                                                                            <Typography variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize', color: '#000' }}>
                                                                                {method.GatewayName}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {method.description}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                }
                                                                sx={{ m: 0, width: '100%' }}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>

                                        </RadioGroup>

                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Billing Address
                                        </Typography>
                                        <Grid container spacing={3} sx={{ mt: 1 }}>
                                            <Grid item xs={12}>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="fullName">Full Name</label>
                                                <TextField
                                                    disabled
                                                    readOnly
                                                    fullWidth
                                                    placeholder='Enter your full name'
                                                    value={`${selectedAddrData?.shippingfirstname || ''} ${selectedAddrData?.shippinglastname || ''}`}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="email">Email</label>
                                                <TextField
                                                    disabled
                                                    readOnly
                                                    fullWidth
                                                    placeholder='Enter your address'
                                                    value={selectedAddrData?.street}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="city">City</label>
                                                <TextField
                                                    disabled
                                                    readOnly
                                                    fullWidth
                                                    placeholder='Enter your city'
                                                    value={selectedAddrData?.city}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="state">State</label>
                                                <TextField
                                                    disabled
                                                    readOnly
                                                    fullWidth
                                                    placeholder='Enter your state'
                                                    value={selectedAddrData?.state}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="zip">Mobile No</label>
                                                <TextField
                                                    disabled
                                                    readOnly
                                                    fullWidth
                                                    placeholder='Enter your mobile number'
                                                    value={selectedAddrData?.shippingmobile}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                                {IsPriceShow == 1 && <Card>
                                    <CardContent>
                                        {/* --- Header Section --- */}
                                        <Typography variant="h6" gutterBottom>
                                            Order Summary
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            Review your order details
                                        </Typography>

                                        {/* --- Financial Details Stack --- */}
                                        <Stack spacing={2}>
                                            {elvee && (
                                                <>
                                                    {/* 1. Add a Divider to separate Money from Metal */}

                                                    {/* 2. Use Grid with xs={4} sm={4} so the 3 items fit perfectly in one row */}
                                                    <Grid container spacing={1}>

                                                        {/* Gross Weight */}
                                                        <Grid item xs={4} sm={4}>
                                                            <Box sx={{
                                                                bgcolor: '#F7F8FA', display: 'flex', alignItems: 'center', flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                p: 2,
                                                                borderRadius: 2
                                                            }}>
                                                                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", textTransform: 'uppercase', mb: 0.5 }}>
                                                                    Gross Wt
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#0a1f47" }}>
                                                                    {summary.totalGwt?.toFixed(3)}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>

                                                        {/* Net Weight */}
                                                        <Grid item xs={4} sm={4}>
                                                            <Box sx={{
                                                                bgcolor: '#F7F8FA', display: 'flex', alignItems: 'center', flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                p: 2,
                                                                borderRadius: 2
                                                            }}>
                                                                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", textTransform: 'uppercase', mb: 0.5 }}>
                                                                    Net Wt
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#0a1f47" }}>
                                                                    {summary.totalNwt?.toFixed(3)}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>

                                                        {/* Diamond Weight */}
                                                        <Grid item xs={4} sm={4}>
                                                            <Box sx={{
                                                                bgcolor: '#F7F8FA', display: 'flex', alignItems: 'center', flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                p: 2,
                                                                borderRadius: 2
                                                            }}>
                                                                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", textTransform: 'uppercase', mb: 0.5 }}>
                                                                    Diamond Wt
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#0a1f47" }}>
                                                                    {summary.totalDwt?.toFixed(3)}
                                                                    {/* Make the secondary part smaller and lighter */}
                                                                    <Typography component="span" sx={{ color: "text.disabled", fontSize: 13, fontWeight: 500, ml: 0.5 }}>
                                                                        / {summary?.totalDpcs}
                                                                    </Typography>
                                                                </Typography>
                                                            </Box>
                                                        </Grid>

                                                    </Grid>
                                                    <Divider sx={{ my: 2 }} />

                                                </>
                                            )}
                                            {/* Subtotal */}
                                            {elvee && <>
                                                {Number.isFinite(summary?.MetalCost) && summary.MetalCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>Metal Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.MetalCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}
                                                {Number.isFinite(summary?.DiamondCost) && summary.DiamondCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>Diamond Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.DiamondCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}
                                                  {Number.isFinite(summary?.ColorStoneCost) && summary.ColorStoneCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>ColorStone Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.ColorStoneCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}
                                                 {Number.isFinite(summary?.MiscCost) && summary.MiscCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>Misc Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.MiscCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}
                                                {Number.isFinite(summary?.LabourCost) && summary.LabourCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>Labour Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.LabourCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}                                               
                                                {Number.isFinite(summary?.OtherCost) && summary.OtherCost > 0 && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, margin: 0 }}>
                                                    <Typography>Other Cost</Typography>
                                                    {!isPloding ? (
                                                        <Typography fontWeight="bold">{currCode} {summary?.OtherCost?.toLocaleString()}</Typography>
                                                    ) : (
                                                        <Skeleton variant="text" height={30} width={100} />
                                                    )}
                                                </Box>}

                                                <Divider sx={{ my: 2 }} />
                                            </>}



                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography>Subtotal</Typography>
                                                {!isPloding ? (
                                                    <Typography fontWeight="bold">{currCode} {formatter(taxAmmountData?.TotalAmount)}</Typography>
                                                ) : (
                                                    <Skeleton variant="text" height={30} width={100} />
                                                )}
                                            </Box>

                                            {/* Coupon Logic (Kept as is) */}
                                            {appliedCoupon && taxAmmountData && (
                                                <Stack
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: 2,
                                                        backgroundColor: "#E9F7EF",
                                                        boxShadow: 1,
                                                        py: 2,
                                                        px: 2,
                                                    }}
                                                    spacing={1.5}
                                                >

                                                    {/* ================= COUPON (TOP) ================= */}
                                                    {taxAmmountData.CoupDisAmount > 0 && (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <LocalOfferIcon sx={{ fontSize: 18, color: "primary.main" }} />

                                                                <Typography fontWeight={600}>
                                                                    Coupon ({appliedCoupon})
                                                                </Typography>

                                                                {/* Expandable Remove Button */}
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={RemoveCoupon}
                                                                    sx={{
                                                                        ml: 0.5,
                                                                        transition: "all 0.3s",
                                                                        "&:hover": {
                                                                            backgroundColor: "error.light",
                                                                            color: "#fff",
                                                                        },
                                                                    }}
                                                                >
                                                                    <CloseIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>

                                                            {!isPloding ? (
                                                                <Typography fontWeight={600} color="primary.main">
                                                                    - {currCode} {formatter(taxAmmountData.CoupDisAmount)}
                                                                </Typography>
                                                            ) : (
                                                                <Skeleton width={80} />
                                                            )}
                                                        </Box>
                                                    )}

                                                    {/* ================= DIAMOND ================= */}
                                                    {taxAmmountData.DiaDiscAmount > 0 && (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Typography fontWeight={500}>
                                                                You save on Diamond
                                                            </Typography>

                                                            {!isPloding ? (
                                                                <Typography fontWeight={600} color="success.main">
                                                                    {currCode} {formatter(taxAmmountData.DiaDiscAmount)}
                                                                </Typography>
                                                            ) : (
                                                                <Skeleton width={80} />
                                                            )}
                                                        </Box>
                                                    )}

                                                    {/* ================= LABOUR ================= */}
                                                    {taxAmmountData.LabDiscAmount > 0 && (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Typography fontWeight={500}>
                                                                You save on Labour
                                                            </Typography>

                                                            {!isPloding ? (
                                                                <Typography fontWeight={600} color="success.main">
                                                                    {currCode} {formatter(taxAmmountData.LabDiscAmount)}
                                                                </Typography>
                                                            ) : (
                                                                <Skeleton width={80} />
                                                            )}
                                                        </Box>
                                                    )}
                                                </Stack>
                                            )}



                                            {/* Tax */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography>Estimated Tax</Typography>
                                                {!isPloding ? (
                                                    <Typography fontWeight="bold">{currCode} {formatter(taxAmmountData?.TaxAmount)}</Typography>
                                                ) : (
                                                    <Skeleton variant="text" height={30} width={100} />
                                                )}
                                            </Box>

                                            <Divider />

                                            {/* Total Amount */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="h6">Total Amount</Typography>
                                                {!isPloding ? (
                                                    <Typography variant="h6" color="primary.main" fontWeight={700} sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-end'
                                                    }}  >
                                                        {currCode} {formatter(Number((taxAmmountData?.TotalAmountWithTax)?.toFixed(3)))} <br />
                                                        {elvee &&  <FormHelperText>{ElveeMessage}</FormHelperText>}
                                                    </Typography>
                                                ) : (
                                                    <Skeleton variant="text" height={30} width={100} />
                                                )}
                                            </Box>
                                        </Stack>

                                        {/* --- Metal/Weight Details Section --- */}

                                    </CardContent>
                                </Card>}

                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <Box>
                                                <Typography variant="h6" gutterBottom>
                                                    Shipping Address
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                    Where should we deliver?
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                className='btnColorProCat'
                                                onClick={handleChangeAddr}
                                                sx={{
                                                    // bgcolor: bgcolor ? bgcolor : '',
                                                    fontSize: {
                                                        sm: '10px !important',
                                                        md: '14px !important',
                                                        xs: '10px !important',
                                                    },
                                                    // color: textColor,
                                                    // '&:hover': {
                                                    //     backgroundColor: bgcolor,
                                                    // },
                                                }}
                                            >
                                                Change Address
                                            </Button>
                                        </Box>
                                        {!isPloding ? (
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    bgcolor: '#f5f5f5',
                                                    p: 2,
                                                    borderRadius: 2,
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                                                    {`${selectedAddrData?.shippingfirstname || ''} ${selectedAddrData?.shippinglastname || ''}`}

                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" >
                                                    {selectedAddrData?.street}
                                                    <br />
                                                    {selectedAddrData?.city}-{selectedAddrData?.zip}
                                                    <br />
                                                    {selectedAddrData?.state}
                                                    <br />
                                                    {selectedAddrData?.shippingmobile}
                                                </Typography>
                                            </Paper>
                                        ) :
                                            <Skeleton variant="image" height="120px" width='100%' />
                                        }
                                        <>
                                            <Link
                                                className="proCat_addorderRemarkbtn"
                                                variant="body2"
                                                onClick={handleOpen}
                                                sx={{ color: '#000', display: 'flex', justifyContent: 'end', cursor: 'pointer' }}
                                            >
                                                {orderRemakdata == "" ? "Add order Remark" : "Update order Remark"}
                                            </Link>
                                        </>
                                        {orderRemakdata &&
                                            <>
                                                <label style={{ fontWeight: 'bold', color: '#7d7f85' }} htmlFor="orderRemark">Order Remarks</label>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        bgcolor: '#f5f5f5',
                                                        p: 2,
                                                        borderRadius: 2,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Typography variant="body2" color="text.secondary">
                                                        {orderRemakdata}
                                                    </Typography>
                                                </Paper>

                                            </>
                                        }
                                    </CardContent>
                                </Card>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        py: 1.5, fontSize: '1.1rem'
                                        ,
                                        bgcolor: bgcolor ? bgcolor : '',
                                        // color: textColor,
                                        // '&:hover': {
                                        //     backgroundColor: bgcolor,
                                        // },
                                    }}
                                    onClick={handlePay}
                                    className='proCat_payOnAccountBtn btnColorProCat'
                                    disabled={isloding}
                                >
                                    {isloding ? 'LOADING...' : 'Place Order'}
                                    {isloding && <span className="loader"></span>}

                                </Button>
                                <Typography variant="body2" color="error" textAlign="center">{errorMsg}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
                <EnhancedPaymentDialog
                    open={isloding}
                    onClose={isloding}
                    mode={selectedMode}
                />

                <OrderRemarkModal
                    open={open}
                    onClose={handleClose}
                    remark={orderRemark}
                    onRemarkChange={handleRemarkChangeInternal}
                    onSave={handleSaveInternal}
                />
            </Box>
        </ThemeProvider>
    );
}
