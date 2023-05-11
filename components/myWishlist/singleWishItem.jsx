import React from "react";
import { Grid, Box, Stack, Typography, Rating, Button } from "@mui/material";

const SingleWishItem = () => {
   return (
      <Grid
         item
         xs={10}
         sm={3.8}
         md={3.8}
         // border={"1px solid red"}
         height={"fit-content"}
         sx={{
            transition: "all 200ms ease-in-out",
            borderRadius: "8px",
            cursor: "pointer",
            "& .MuiTypography-root": {
               fontFamily: "Oswald",
            },
            "&:hover": {
               scale: "0.95",
               boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            },
            "&:active": {
               scale: "0.92",
            },
         }}
         mb={1}>
         <Box>
            <Box component={"img"} src="/assets/product.png" width={"100%"} />
         </Box>
         <Stack p={1}>
            <Typography textAlign="center" mb={1} color="grey" fontSize="14px" textTransform="uppercase">
               Nike
            </Typography>
            <Typography textAlign="center" fontSize="18px">
               AIR Max DAWN SE Running Shoes For Men
            </Typography>
            <Box mt={1} display="flex" justifyContent="center">
               <Typography fontSize="16px" mr={1}>
                  4.0
               </Typography>
               <Rating name="read-only" value={4} readOnly size="small" />
               <Typography ml={1} fontSize="16px" color={"grey"} fontWeight={"light"}>
                  (2000)
               </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
               <Typography fontSize="24px" mr={1} fontWeight={"bold"}>
                  $120
               </Typography>
               <Typography mr={1} color={"grey"}>
                  <s>$240</s>
               </Typography>
               <Typography>(50% off)</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
               <Button
                  variant="contained"
                  sx={{
                     fontFamily: "Oswald",
                     padding: "10px 20px",
                  }}>
                  Add To Cart
               </Button>
            </Box>
         </Stack>
      </Grid>
   );
};

export default SingleWishItem;
