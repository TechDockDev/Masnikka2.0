import { Stack, Grid, Typography, Divider, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleWishItem from "./singleWishItem";
import axios from "axios";

const MyWishlist = () => {
  const [products, setProducts] = useState([]);
  const getWishlist = async () => {
    try {
      const { data } = await axios.get("/api/Wishlist/userWishlist");
      setProducts(data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <Stack
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 20px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "36px",
          fontFamily: "Oswald",
          textAlign: "center",
          mt: 2,
          mb: 2,
        }}
      >
        My Wishlist
      </Typography>
      <Divider />
      {products?.length > 0 ? (
        <Grid
          container
          xs={12}
          md={9}
          lg={10}
          display="flex"
          justifyContent={{ xs: "center", sm: "space-between" }}
          sx={{
            boxSizing: "border-box",
            paddingLeft: { xs: "0px", md: "20px" },
          }}
        >
          {products?.map((product) => (
            <SingleWishItem key={product} wishlist={product} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" margin={"auto"}>
          Wishlist is empty
        </Typography>
      )}
    </Stack>
  );
};

export default MyWishlist;
