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
      }}
    >
      <Grid item xs={12} mb={2} mt={3}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "36px",
            fontFamily: "Oswald",
            textAlign: "center",
            mb: 2,
          }}
        >
          My Wishlist
        </Typography>
        <Divider />
        {products.length === 0 && (
          <Typography margin={3} variant="h6">
            Wishlist is empty
          </Typography>
        )}
      </Grid>
      {products.map((product) => {
        return <SingleWishItem key={product} wishlist={product} />;
      })}
    </Grid>
  );
};

export default MyWishlist;
