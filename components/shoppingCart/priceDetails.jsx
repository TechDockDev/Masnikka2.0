import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PriceDetails = ({ cartData, addressId }) => {
  const [userId, setUserId] = useState("");
  const myData = [];
  const createOrder = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/api/Order/getOrder", { addressId });
      myData[
        "notify_url"
      ] = `https://zl4xg9kb-3000.inc1.devtunnels.ms/api/payment/${data.transaction._id}`;
      const notify_url_input = document.createElement("input");
      notify_url_input.type = "hidden";
      notify_url_input.name = "notify_url";
      notify_url_input.value = `https://zl4xg9kb-3000.inc1.devtunnels.ms/api/payment/${data.transaction._id}`;

      event.target.appendChild(notify_url_input);

      event.target.submit();
    } catch (error) {
      console.log(error);
    }
  };

  let value;
  let htmlForm = ``;
  // Merchant details
  myData["merchant_id"] = process.env.NEXT_PUBLIC_MERCHANT_ID;
  myData["merchant_key"] = process.env.NEXT_PUBLIC_MERCHANT_KEY;
  myData["return_url"] = "http://localhost:3000";
  myData["cancel_url"] = "http://localhost:3000";
  // Transaction details
  myData["m_payment_id"] = userId;
  myData["amount"] = cartData.totalPrice.toString();
  myData["item_name"] = `${cartData?.products.length} Items`;

  // Generate signature

  for (let key in myData) {
    if (myData.hasOwnProperty(key)) {
      value = myData[key];
      if (value !== "") {
        htmlForm += `<input name="${key}" type="hidden" value="${value.trim()}" />`;
      }
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/user/auth/getuser");
        setUserId(data.user._id);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

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
      {/* <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
        <input type="hidden" name="merchant_id" value="10000100" />
        <input type="hidden" name="merchant_key" value="46f0cd694581a" />
        <input type="hidden" name="amount" value={cartData?.totalPrice} />
        <input
          type="hidden"
          name="item_name"
          value={`${cartData?.products.length} Items`}
          />
          <input type="hidden" name="return_url" value="http://localhost:3000" />
          <input
          type="hidden"
          name="notify_url"
          value={`https://zl4xg9kb-3000.inc1.devtunnels.ms/api/payment/${transactionId}`}
          />
          <input
          type="hidden"
          name="signature"
          value={generateSignature("", "vishesh12345")}
          />
        <input type="hidden" name="cancel_url" value="https://instagram.com" /> */}
      {/* <input type="submit" /> */}
      <form
        action="https://sandbox.payfast.co.za​/eng/process"
        method="post"
        onSubmit={createOrder}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlForm }} />
        <Button
          variant="contained"
          fullWidth
          type="submit"
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
      </form>
    </>
  );
};

export default PriceDetails;
