import React from "react";
import { Box, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import RatingsBar from "./ratingsBar";

const ProductRatings = () => {
   return (
      <Stack mt={3}>
         <Typography variant="h1" fontSize={"30px"} fontWeight={"400"} fontFamily={"Oswald"}>
            Product Ratings
         </Typography>
         <Divider sx={{ color: "#C4C4C4", borderBottomWidth: "1px", mt: 2 }} />
         <Box mt={2} display={"flex"} alignItems={"center"}>
            <Typography variant="h1" fontSize={"40px"} fontWeight={"400"}>
               4.0
            </Typography>
            <Typography ml={2} fontSize={"16px"} fontWeight={"400"} color={"grey"}>
               Based on 16 ratings and 2 reviews
            </Typography>
         </Box>
         <Box width={{xs:"90%",sm:"60%"}} mt={2}>
            <RatingsBar star={"5"} value={80} reviewCount={"6"} color={"#48A033"}/>
            <RatingsBar star={"4"} value={40} reviewCount={"5"} color={"#48A033"}/>
            <RatingsBar star={"3"} value={30} reviewCount={"3"} color={"#48A033"}/>
            <RatingsBar star={"2"} value={20} reviewCount={"2"} color={"#FFC32B"}/>
            <RatingsBar star={"1"} value={10} reviewCount={"1"} color={"#FF3535"}/>
         </Box>
      </Stack>
   );
};

export default ProductRatings;
