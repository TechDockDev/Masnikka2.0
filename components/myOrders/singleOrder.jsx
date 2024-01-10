import { Box, Button, Grid, Rating, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
const SingleOrder = ({ order }) => {
  const [rating, setRating] = useState(0);
  const { snackbar } = useContext(AppContext);

  useEffect(() => {
    getRating();
  }, []);

  const getRating = async () => {
    try {
      const res = await axios.get(
        `/api/Rating/createRating?productId=${order.productSize.product._id}`
      );
      setRating(res.data.rating);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      container
      mt={2}
      sx={{
        border: "1px solid grey",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        // "& .MuiGrid-item":{border:"1px solid red"}
      }}
    >
      {/* ============ */}
      <Grid item xs={6} sm={2} lg={1} margin={{ xs: "auto", sm: "0" }}>
        <Box
          component={"img"}
          src={`https://masnikkas3-storage.s3.af-south-1.amazonaws.com/${order.productSize.productColor.productPhotos.thumbnailImg}`}
          alt=""
          sx={{ display: "block", width: "100%" }}
        />
      </Grid>
      {/* ============ */}
      <Grid
        item
        xs={12}
        sm={4}
        paddingX={"10px"}
        boxSizing={"border-box"}
        textAlign={{ xs: "center", sm: "left" }}
      >
        <Typography fontWeight={600} fontFamily={"Oswald"}>
          {order.productSize.product.name}
        </Typography>
        <Typography mt={1}>QTY : {order.quantity}</Typography>
        <Stack
          mt={1}
          direction={"row"}
          alignItems={"center"}
          justifyContent={{ xs: "center", sm: "start" }}
        >
          <Typography color={"#828282"}>COLOR</Typography>
          <SquareRoundedIcon
            sx={{
              color: order.productSize.productColor.colorCode,
              paddingX: "10px",
            }}
          />
          <Typography color={"#828282"}>
            SIZE : {order.productSize.size}
          </Typography>
        </Stack>
      </Grid>
      {/* ============ */}
      <Grid
        item
        xs={12}
        sm={2}
        lg={1}
        padding={{ xs: "20px", sm: "0px 10px" }}
        boxSizing={"border-box"}
      >
        <Typography fontWeight={600} fontFamily={"Oswald"} textAlign={"center"}>
          R{order.amount}
        </Typography>
      </Grid>
      {/* ============ */}
      <Grid
        item
        xs={12}
        sm={4}
        paddingX={"10px"}
        boxSizing={"border-box"}
        textAlign={"center"}
      >
        {/* <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircleRoundedIcon sx={{ color: "green", fontSize: "14px" }} />
          <Typography ml={1} fontWeight={600}>
            Delivered on 08 April, 2023
          </Typography>
        </Stack> */}
        <Typography mt={1} color={"#828282"} textAlign={"center"}>
          Shipped : <b>{order.shipping.status}</b>
        </Typography>
        {/* <Button
          variant="outlined"
          // size="large"
          sx={{
            mt: 1,
            color: "#0F6DB1",
            border: "1px solid #0F6DB1",
            "&:hover": {
              border: "1px solid #0F6DB1",
            },
          }}
        >
          Rate & Review Product
        </Button> */}
        <Rating
          name="simple-controlled"
          value={rating}
          // defaultValue={order.productSize.product.averageRating}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "black",
            },
            "& .MuiRating-iconHover": {
              color: "#ff3d47",
            },
          }}
          onChange={async (event, value) => {
            try {
              const res = await axios.post("/api/Rating/createRating", {
                product: order.productSize.product._id,
                order: order._id,
                value,
              });
              console.log(res);
              snackbar("Thanks for rating", "success");
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </Grid>
      {/* ============ */}
    </Grid>
  );
};

export default SingleOrder;
