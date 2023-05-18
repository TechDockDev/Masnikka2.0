import React from "react";
import Banner from "./banner";
import { Stack } from "@mui/material";
import BrandsCarousel from "./brandsCarousel";
import BrowseProducts from "./browseProducts";
import MostPopular from "./mostPopular";

const Homepage = ({products}) => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Banner />
         <BrandsCarousel/>
         <BrowseProducts products={products}/>
         <MostPopular/>
      </Stack>
   );
};

export default Homepage;
