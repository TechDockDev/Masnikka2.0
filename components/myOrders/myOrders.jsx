import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import SingleOrder from "./singleOrder";

const MyOrders = () => {
   return (
      <Stack
         sx={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 20px",
         }}>
         <Typography
            variant="h1"
            sx={{
               fontSize: "36px",
               fontFamily: "Oswald",
               textAlign: "center",
               mt: 2,
               mb:2
            }}>
            Order History
         </Typography>
         <Divider />
         <SingleOrder/>
         <SingleOrder/>
         <SingleOrder/>
         <SingleOrder/>
         <SingleOrder/>
         <SingleOrder/>
      </Stack>
   );
};

export default MyOrders;
