import React from "react";
import { Box, Button, Divider, Grid, IconButton, Rating, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
const CartItem = () => {
   return (
      <Grid
         container
         boxSizing={"border-box"}
         sx={{
            borderBottom: "1px solid #DFDFDF",
            pb: 3,
            mb:2
         }}>
         {/* 👇 Product image  👇   */}
         <Grid item xs={12} sm={3} md={3} sx={{ boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", order: 1 }}>
            <Box component="img" src="/assets/product.png" sx={{ height: "170px", width: "auto" }} />
         </Grid>
         {/*👆  Product image  👆  */}

         {/* 👇 product info 👇   */}
         <Grid item xs={12} sm={8} md={8} sx={{ boxSizing: "border-box", paddingX: { xs: "20px", sm: "40px" }, order: { xs: 2, sm: 2 } }}>
            <Stack
               sx={{
                  display: { xs: "flex", sm: "block" },
                  alignItems: "center",
                  flexDirection: "column",
               }}>
               {/* 👇 brand 👇   */}
               <Typography variant="h2" sx={{ fontSize: "14px", color: "grey", bgcolor: "#F0F2F2", width: "fit-content", padding: "6px 12px", fontFamily: "Oswald", textTransform: "uppercase", borderRadius: "4px", fontWeight: "600", mt: 1 }}>
                  Nike
               </Typography>
               {/*👆  brand 👆  */}
               {/* 👇 product title line 👇   */}
               <Typography variant="h1" sx={{ fontSize: "18px", width: "fit-content", fontFamily: "Oswald", fontWeight: "600", mt: 1, textAlign: { xs: "center", sm: "left" } }}>
                  Revolution 6 NN Running Shoes For Men
               </Typography>
               {/*👆  product title line 👆  */}
               {/* 👇 product rating 👇   */}
               <Box mt={1} display="flex" alignItems="center">
                  <Typography fontSize="16px" fontWeight={"bold"} fontFamily="Oswald" mr={1}>
                     4.0
                  </Typography>
                  <Rating name="read-only" value={4} readOnly size="small" />
                  <Typography ml={1} fontSize="16px" fontFamily="Oswald" fontWeight={"light"}>
                     (2000)
                  </Typography>
               </Box>
               {/*👆  product rating 👆  */}
               <Stack direction={"row"} alignItems={"center"} mt={1} color={"#828282"}>
                  {/* 👇 select color👇   */}
                  <Stack direction={"row"} alignItems={"center"}>
                     <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase" }}>Color:</Typography>
                     <Box height="20px" width="20px" ml={2} bgcolor={"red"} />
                  </Stack>
                  {/*👆  select color👆  */}
                  {/* 👇 select size👇   */}
                  <Stack direction={"row"} alignItems={"center"} ml={2}>
                     <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase" }}>Size:</Typography>
                     <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", ml: 2 }}>6</Typography>
                  </Stack>
                  {/*👆 select size👆  */}
                  {/* 👇 qty👇   */}
                  <Stack direction={"row"} alignItems={"center"} ml={2}>
                     <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase" }}>QTY:</Typography>
                     <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", ml: 2 }}>1</Typography>
                  </Stack>
                  {/*👆 qty👆  */}
               </Stack>

               {/* 👇 price👇   */}
               <Box display={"flex"} mt={1}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                     <Typography fontFamily={"Oswald"} fontSize="20px" mr={1} fontWeight={"bold"}>
                        $120
                     </Typography>
                     <Typography mr={1} color={"grey"} fontFamily={"Oswald"}>
                        <s>$240</s>
                     </Typography>
                     <Typography fontFamily={"Oswald"}>(50% off)</Typography>
                  </Box>
               </Box>
               {/*👆 price👆  */}
            </Stack>
         </Grid>
         {/*👆  product info 👆  */}
      </Grid>
   );
};

export default CartItem;
