"use client";
import { Grid, Stack, Pagination, Typography } from "@mui/material";
import React from "react";
import FiltersSidebar from "./filtersSidebar";
import SingleProduct from "../singleProduct";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const BrowseProducts = ({ products, brands, categories, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Stack mt={3}>
      <Grid container>
        {/* 👇  side bar for FILTER products 👇 */}
        <FiltersSidebar brands={brands} categories={categories} />
        {/* 👆  side bar for FILTER products 👆 */}
        {/* 👇  PRODUCTS container 👇 */}
        <Grid
          item
          container
          xs={12}
          md={9}
          lg={10}
          display="flex"
          justifyContent={{ xs: "center", sm: "space-between" }}
          sx={{
            // borderLeft:"1px solid grey",
            boxSizing: "border-box",
            paddingLeft: { xs: "0px", md: "20px" },
          }}
        >
          {products.length === 0 ? (
            <Typography variant="h5">No Products found</Typography>
          ) : (
            products.map((product, index) => {
              return <SingleProduct key={index} product={product} />;
            })
          )}
        </Grid>
        {/* 👆  PRODUCTS container 👆 */}
        {/* 👇  PAGINATION 👇 */}
        <Grid
          item
          container
          xs={12}
          md={9}
          lg={10}
          mt={3}
          mb={3}
          display="flex"
          justifyContent={{ xs: "center", sm: "space-between" }}
          sx={{
            // borderLeft:"1px solid grey",
            boxSizing: "border-box",
            paddingLeft: { xs: "0px", md: "20px" },
            marginLeft: "auto",
          }}
        >
          <Pagination
            count={totalPages}
            onChange={(e, value) => {
              const queryParams = {};
              for (const [key, value] of searchParams) {
                queryParams[key] = value;
              }
              router.replace({
                pathname: "/",
                query: {
                  ...queryParams,
                  page: value,
                },
              });
            }}
            color="primary"
            sx={{ marginX: "auto" }}
          />
        </Grid>
        {/* 👆  PAGINATION 👆 */}
      </Grid>
    </Stack>
  );
};

export default BrowseProducts;
