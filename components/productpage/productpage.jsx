import { Stack } from "@mui/material";
import React from "react";
import ProductView from "./productView";
import ProductDescription from "./productDescription";
import ProductRatings from "./productRatings";
import ProductReviews from "./productReviews";
import MostPopular from "../homepage/mostPopular";

const Productpage = () => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <ProductView />
         <ProductDescription/>
         <ProductRatings/>
         <ProductReviews/>
         <MostPopular/>
      </Stack>
   );
};

export default Productpage;
