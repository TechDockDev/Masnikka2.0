import { Stack, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import SingleWishItem from "./singleWishItem";

const MyWishlist = () => {
   const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

   return (
      <Grid
         item
         container
         xs={12}
         md={9}
         lg={10}
         display="flex"
         justifyContent={{ xs: "center", sm: "space-between" }}
         sx={{
            boxSizing: "border-box",
            paddingLeft: { xs: "0px", md: "20px" },
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
               My Wishlist
            </Typography>
            <Divider />
         </Grid>
         {products.map((product) => {
            return <SingleWishItem key={product} />;
         })}
      </Grid>
   );
};

export default MyWishlist;
