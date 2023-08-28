import React from "react";
import Banner from "./banner";
import { Stack } from "@mui/material";
import BrandsCarousel from "./brandsCarousel";
import BrowseProducts from "./browseProducts";
import MostPopular from "./mostPopular";

const Homepage = ({ products, brands, categories, totalPages }) => {
  return (
    <Stack paddingX="15px" position={"relative"}>
      <Banner />
      <BrandsCarousel brands={brands} />
      <BrowseProducts
        products={products}
        brands={brands}
        categories={categories}
        totalPages={totalPages}
      />
      {/* <MostPopular /> */}
    </Stack>
  );
};

export default Homepage;
