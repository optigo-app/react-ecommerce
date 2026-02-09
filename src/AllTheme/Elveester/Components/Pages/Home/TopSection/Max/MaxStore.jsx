import React from "react";
import { Box, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import BrandsTitle from "./BrandsTitle";

const locations = [
  {
    name: "Ahmedabad, India",
    image: `${storImagePath()}/city/ahd.webp`,
    description: "Our operational heartbeat & HQ",
  },
  {
    name: "Bangalore, India",
    image: `${storImagePath()}/city/bang.webp`,
    description: "Technology hub for our development",
  },
  {
    name: "Chennai, India",
    image: `${storImagePath()}/city/chen.webp`,
    description: "Creative production & design center",
  },
  {
    name: "Hyderabad, India",
    image: `${storImagePath()}/city/hyd.webp`,
    description: "Strategic operations & partnerships",
  },
  {
    name: "Mumbai, India",
    image: `${storImagePath()}/city/mumbai.webp`,
    description: "Our commercial and business center",
  },
  {
    name: "NCR, India",
    image: `${storImagePath()}/city/ncr.webp`,
    description: "National capital region operations",
  },
];

const MaxStore = () => {
  return (
    <Box
      sx={{
        py: 8, // Padding top/bottom
                px: { xs: 2, sm: 3, md: 4 },

      }}
    >
      <Box>
         <Box textAlign="center" mb={6} zIndex={20}>
                <BrandsTitle
                  title={"Physical Store"}
                  Align='left'
                />
              </Box>

        <Grid container spacing={1} justifyContent="center">
          {locations.map((loc, index) => (
            <Grid 
              item 
              xs={12}   
              sm={6}    
              md={4}   
              lg={2}
              key={index}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  minHeight: "220px", // Ensures consistent height
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  border: "1px solid #DDD",
                  backgroundColor: "#FFFFFF",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 10px 25px rgba(197, 160, 101, 0.15)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    p: 4,
                  }}
                >
                  {/* Image Container */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "160px", // Fixed height for image area
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <img
                      src={loc.image}
                      alt={loc.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain", 
                        filter: "sepia(100%) hue-rotate(5deg) saturate(150%)", 
                      }}
                    />
                  </Box>

                  {/* Text Container */}
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        color: "#4E3629",
                        mb: 1,
                        fontSize: "1.25rem",
                      }}
                    >
                      {loc.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#8D7B68",
                        lineHeight: 1.6,
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      }}
                    >
                      {loc.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MaxStore;
// import { Box, Container, Grid, Typography, Card, CardContent } from "@mui/material";
// import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

// const locations = [
//   {
//     name: "Ahmedabad, India",
//     image: `${storImagePath()}/city/ahd.webp`,
//     description: "Our operational heartbeat & HQ",
//   },
//   {
//     name: "Bangalore, India",
//     image: `${storImagePath()}/city/bang.webp`,
//     description: "Technology hub for our development",
//   },
//   {
//     name: "Chennai, India",
//     image: `${storImagePath()}/city/chen.webp`,
//     description: "Creative production & design center",
//   },
//   {
//     name: "Hyderabad, India",
//     image: `${storImagePath()}/city/hyd.webp`,
//     description: "Strategic operations & partnerships",
//   },
//   {
//     name: "Mumbai, India",
//     image: `${storImagePath()}/city/mumbai.webp`,
//     description: "Our commercial and business center",
//   },
//   {
//     name: "NCR, India",
//     image: `${storImagePath()}/city/ncr.webp`,
//     description: "National capital region operations",
//   },
// ];

// const MaxStore = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         mt: 8,
//         mb: 2,
//       }}
//     >
//       <Box >
//         <Grid container spacing={3} justifyContent="center">
//           {locations.map((loc, index) => (
//             <Grid item xs={4} sm={2} md={2} key={index}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "flex-end",
//                   textAlign: "center",
//                   borderRadius: 4,
//                   border: "1px solid #ddd",
//                   backgroundColor: "#FFFFFF",
//                   transition: "all 0.3s ease-in-out",
//                   cursor: "pointer",
//                   position: "relative",
//                 }}
//               >
//                 <CardContent
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     height: "100%",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       flexGrow: 1,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mb: 2,
//                       color: "#C5A065",
//                     }}
//                   >
//                     <img
//                       src={loc.image}
//                       alt={loc.name}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         borderRadius: "12px",
//                       }}
//                     />
//                   </Box>
//                   <Box>
//                     <Typography
//                       sx={{
//                         fontWeight: 700,
//                         color: "#4E3629",
//                         mb: 1,
//                         letterSpacing: "0.5px",
//                         fontSize: "16px",
//                       }}
//                     >
//                       {loc.name}
//                     </Typography>

//                     <Typography
//                       sx={{
//                         color: "#8D7B68",
//                         lineHeight: 1.4,
//                         fontWeight: 500,
//                         maxWidth: "90%",
//                         mx: "auto",
//                         fontSize: "12px",
//                       }}
//                     >
//                       {loc.description}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default MaxStore;
