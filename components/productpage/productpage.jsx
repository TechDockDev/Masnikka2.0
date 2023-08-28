import { Stack } from "@mui/material";
import React from "react";
import ProductView from "./productView";
import ProductDescription from "./productDescription";
import ProductRatings from "./productRatings";
import ProductReviews from "./productReviews";
import MostPopular from "../homepage/mostPopular";

export default function Productpage({ product, customize }) {
  return (
    <Stack paddingX="15px" position={"relative"}>
      <ProductView product={product} customize={customize} />
      <ProductDescription ProductDescription={product?.description} />
      {/* <ProductRatings />
      <ProductReviews />
      <MostPopular /> */}
    </Stack>
  );
}
