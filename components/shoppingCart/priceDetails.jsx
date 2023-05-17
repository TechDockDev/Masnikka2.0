import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const PriceDetails = () => {
   return (
      <>
         <Stack
            sx={{
               border: "1px solid grey",
               padding: "20px",
               bgcolor: " rgba(240, 242, 242, 0.7)",
               borderRadius: "8px",
               mt: { xs: 2, md: 0 },
            }}>
            <Typography fontFamily={"Oswald"} fontSize={"20px"}>
               Price Details
            </Typography>

            {/* ===  === */}

            <Stack mt={1} flexDirection={"row"} justifyContent={"space-between"} color={"#3F3F3F"}>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  Cart Subtotal (3 Items)
               </Typography>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  $720
               </Typography>
            </Stack>
            {/* ===  === */}
            {/* ===  === */}
            <Stack mt={1} flexDirection={"row"} justifyContent={"space-between"} color={"#1E831C"}>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  Discount
               </Typography>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  $360
               </Typography>
            </Stack>
            {/* ===  === */}
            {/* ===  === */}
            <Stack mt={1} flexDirection={"row"} justifyContent={"space-between"} color={"#3F3F3F"}>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  Shipping
               </Typography>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  $5
               </Typography>
            </Stack>
            {/* ===  === */}
            {/* ===  === */}
            <Stack
               mt={1}
               flexDirection={"row"}
               justifyContent={"space-between"}
               color={"#000"}
               sx={{
                  paddingY: "10px",
                  marginY: "10px",
                  borderTop: "1px dashed grey",
                  borderBottom: "1px dashed grey",
               }}>
               <Typography fontFamily={"Oswald"} fontSize={"22px"}>
                  Order Total
               </Typography>
               <Typography fontFamily={"Oswald"} fontSize={"22px"}>
                  $365.00
               </Typography>
            </Stack>
            {/* ===  === */}
            {/* ===  === */}
            <Stack mt={1} flexDirection={"row"} justifyContent={"space-between"} color={"#1E831C"}>
               <Typography fontFamily={"Oswald"} fontSize={"16px"}>
                  You will save $360.00 on this order
               </Typography>
            </Stack>
            {/* ===  === */}
         </Stack>
         <Button variant="contained" fullWidth sx={{
          display:"block",
          mt:2,
          mb:2,
          fontFamily:"Oswald",
          borderRadius:"8px",
          padding:"10px"
         }} >Continue</Button>
      </>
   );
};

export default PriceDetails;
