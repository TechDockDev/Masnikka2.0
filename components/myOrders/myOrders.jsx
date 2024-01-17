import { Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleOrder from "./singleOrder";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/Order/getOrder");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
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
        Order History
      </Typography>
      <Divider />
      {orders?.length > 0 ? (
        orders?.map((order) => <SingleOrder key={order._id} order={order} />)
      ) : (
        <Typography variant="h5" margin={"auto"}>
          No orders found
        </Typography>
      )}
    </Stack>
  );
};

export default MyOrders;
