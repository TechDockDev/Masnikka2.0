import React from "react";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import PriceDetails from "../shoppingCart/priceDetails";
import CartItem from "./cartItem";

const CartSummaryPage = () => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Grid
            container
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
               boxSizing: "border-box",
            }}>
            {/* === 👇 heading 👇 ===*/}
            <Grid item xs={12} mb={2} mt={3}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "36px",
                     fontFamily: "Oswald",
                     textAlign: "center",
                     mb: 2,
                  }}>
                  Cart Summary
               </Typography>
               <Divider />
            </Grid>
            {/* === 👆 heading 👆 ===*/}

            <Grid item xs={12} md={8} sx={{ borderRadius: "8px", boxSizing: "border-box" }}>
               {/* ===👇 Product details👇===*/}

               <Typography variant="h2" sx={{ fontFamily: "Oswald", fontSize: "24px" }}>
                  Product Details
               </Typography>
               <Stack sx={{ border: "1px solid grey", borderRadius: "8px", padding: "20px", mt: 2 }}>
                  <CartItem />
                  <CartItem />
                  
               </Stack>
               {/* ===👆 Product details👆 ===*/}
               {/* ===👇 DELIVERY ADDRESS👇===*/}
               <Typography variant="h2" sx={{ fontFamily: "Oswald", fontSize: "24px", mt: 2 }}>
                  Delivery Address
               </Typography>
               <Stack sx={{ border: "1px solid grey", borderRadius: "8px", padding: "20px", mt: 2 }}>
                  <Stack paddingY={"10px"}>
                     <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography fontWeight={"600"} fontSize={"18px"}>
                           John Doe
                        </Typography>
                        <Button sx={{color:"#0F6DB1", fontWeight:"600"}}>Change</Button>
                     </Stack>
                     <Typography mt={1} color={"#3F3F3F"}>
                        254, Loreum Lipsum, Loreum Lipsum, Loreum, Uttar Pradesh, India - 1234 56
                     </Typography>
                     <Typography mt={1}>9876543210</Typography>
                  </Stack>
               </Stack>
               {/* ===👆 DELIVERY ADDRESS👆 ===*/}
            </Grid>

            {/* ===👇 PRICE DETAILS👇===*/}
            <Grid item xs={12} md={3.8} paddingY={"45px"} sx={{ boxSizing: "border-box" }}>
               <PriceDetails />
            </Grid>
            {/* ===👆 PRICE DETAILS👆 ===*/}
         </Grid>
      </Stack>
   );
};

export default CartSummaryPage;
