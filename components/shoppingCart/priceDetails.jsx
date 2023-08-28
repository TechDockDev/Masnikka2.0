import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const PriceDetails = ({ cartData, addressId }) => {
  const createOrder = async () => {
    try {
      const res = await axios.post("/api/Order/getOrder", { addressId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Stack
        sx={{
          border: "1px solid grey",
          padding: "20px",
          bgcolor: " rgba(240, 242, 242, 0.7)",
          borderRadius: "8px",
          mt: { xs: 2, md: 0 },
        }}
      >
        <Typography fontFamily={"Oswald"} fontSize={"20px"}>
          Price Details
        </Typography>

        {/* ===  === */}

        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#3F3F3F"}
        >
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            Cart Subtotal ({cartData?.products.length} Items)
          </Typography>
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            {/* ${cartData.totalProductPrice} */}
          </Typography>
        </Stack>
        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#3F3F3F"}
        >
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            Customization Charges
          </Typography>
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            ${cartData?.totalCustomizedPrice}
          </Typography>
        </Stack>
        {/* ===  === */}
        {/* ===  === */}
        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#1E831C"}
        >
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            Discount
          </Typography>
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            ${cartData?.totalDiscount}
          </Typography>
        </Stack>
        {/* ===  === */}
        {/* ===  === */}
        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#3F3F3F"}
        >
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            Shipping
          </Typography>
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            ${cartData?.shippingPrice}
          </Typography>
        </Stack>
        {/* ===  === */}
        {/* ===  === */}
        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#000"}
          sx={{
            paddingY: "10px",
            marginY: "10px",
            borderTop: "1px dashed grey",
            borderBottom: "1px dashed grey",
          }}
        >
          <Typography fontFamily={"Oswald"} fontSize={"22px"}>
            Order Total
          </Typography>
          <Typography fontFamily={"Oswald"} fontSize={"22px"}>
            ${cartData?.totalPrice}
          </Typography>
        </Stack>
        {/* ===  === */}
        {/* ===  === */}
        <Stack
          mt={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          color={"#1E831C"}
        >
          <Typography fontFamily={"Oswald"} fontSize={"16px"}>
            You will save ${cartData?.totalDiscount}.00 on this order
          </Typography>
        </Stack>
        {/* ===  === */}
      </Stack>
      <Button
        variant="contained"
        fullWidth
        onClick={createOrder}
        sx={{
          display: "block",
          mt: 2,
          mb: 2,
          fontFamily: "Oswald",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        Continue
      </Button>
    </>
  );
};

export default PriceDetails;
