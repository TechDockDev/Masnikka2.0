import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleCartItem from "./singleCartItem";
import PriceDetails from "./priceDetails";
import axios from "axios";
import Link from "next/link";

const ShoppingCart = () => {
  const [cartData, setCartData] = useState();
  const [address, setAddress] = useState({});
  const getCart = async () => {
    try {
      const { data } = await axios.get("/api/Cart/managecart");
      setCartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/Address/getDefaultAddress");
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
    getAddress();
  }, []);

  if (cartData?.products.length === 0) {
    return (
      // <Typography variant="h3">
      //   No products found. Add some in the cart first.
      // </Typography>
      <img src="/assets/empty-cart.svg" alt="empty-cart-logo" />
    );
  }

  return (
    <Stack paddingX="15px" position={"relative"}>
      <Grid
        container
        display="flex"
        justifyContent={{ xs: "center", sm: "space-between" }}
        sx={{
          boxSizing: "border-box",
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
            Shopping Cart
          </Typography>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            border: "1px solid grey",
            borderRadius: "8px",
            boxSizing: "border-box",
            padding: "20px",
          }}
        >
          {cartData?.products?.map((value) => (
            <SingleCartItem key={value._id} product={value} />
          ))}
          <Typography
            variant="h2"
            sx={{ fontFamily: "Oswald", fontSize: "24px", mt: 2 }}
          >
            Delivery Address
          </Typography>
          <Stack
            sx={{
              border: "1px solid grey",
              borderRadius: "8px",
              padding: "20px",
              mt: 2,
            }}
          >
            <Stack paddingY={"10px"}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontWeight={"600"} fontSize={"18px"}>
                  {address.name}
                </Typography>
                <Button sx={{ color: "#0F6DB1", fontWeight: "600" }}>
                  <Link href={"/addresses"}>Change</Link>
                </Button>
              </Stack>
              <Typography mt={1} color={"#3F3F3F"}>
                {address.houseNo} {address.address} {address.city}{" "}
                {address.state} {address.country} {address.pinCode}
              </Typography>
              <Typography mt={1}>{address.phoneNumber}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3.8} sx={{ boxSizing: "border-box" }}>
          {cartData && (
            <PriceDetails cartData={cartData} addressId={address._id} />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ShoppingCart;
