import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SingleCartItem from "./singleCartItem";
import PriceDetails from "./priceDetails";

const ShoppingCart = () => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Grid
            container
            display="flex"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
               boxSizing: "border-box",
            }}>
            <Grid item xs={12} mb={2} mt={3}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "36px",
                     fontFamily: "Oswald",
                     textAlign: "center",
                     mb: 2,
                  }}>
                  Shopping Cart
               </Typography>
               <Divider />
            </Grid>
            <Grid item xs={12} md={8} sx={{ border: "1px solid grey", borderRadius: "8px",boxSizing:"border-box", padding:"20px" }}>

               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
               <SingleCartItem />
            </Grid>
            <Grid item xs={12} md={3.8} sx={{ border: "1px solid grey", borderRadius: "8px",boxSizing:"border-box", padding:"20px" , bgcolor:" rgba(240, 242, 242, 0.7)"}}>

              <PriceDetails/>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default ShoppingCart;
