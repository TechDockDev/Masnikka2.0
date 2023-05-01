import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
   return (
      <Grid
         container
         sx={{
            // border:"1px solid red",
            height:{ sm:"400px", xs:"fit-content"},
            mt: 3,
            bgcolor: "black",
            borderRadius: "12px",
            padding: {sm:"40px",xs:"20px"},
            boxSizing: "border-box",
         }}>
         {/* 👇  left side text content  👇   */}

         <Grid
            item
            xs={12}
            sm={6}
            sx={{
               color: "white",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}>
            <Stack padding="10px">
               <Typography variant="body1">Best Deals Online on Sneakers Brands</Typography>
               <Typography mt={2} variant="h1" fontFamily="Oswald" fontSize={{ md: "45px", xs: "35px" }} fontWeight={700}>
                  SHOPPING WITHOUT LIMITS
               </Typography>
               <Typography mt={2} variant="h5">
                  UP to 80% OFF
               </Typography>
               <Button variant="outlined" sx={{ color: "white", border: "1px solid white", fontFamily: "Oswald", width: "150px", mt: 4 }} size="large">
                  Shop now
               </Button>
            </Stack>
         </Grid>
         {/*👆  left side text content 👆  */}
         {/* ================================== */}
         {/* 👇 rugt side image  👇   */}
         <Grid item xs={12} sm={6} boxSizing={"border-box"} height={"100%"} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Stack>
               <Box
                  component={"img"}
                  src="/assets/bannerImage.png"
                  sx={{
                     width: "100%",
                  }}
               />
            </Stack>
         </Grid>
         {/*👆  rugt side image  👆  */}
      </Grid>
   );
};

export default Banner;
