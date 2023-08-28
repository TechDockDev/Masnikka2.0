import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
const SingleCartItem = ({ product }) => {
  const removeItem = async () => {
    try {
      await axios.delete(`/api/Cart/deleteItem/${product._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addQuantity = async () => {
    try {
      await axios.patch(`/api/Cart/quantityChange/${product._id}`, {
        action: "Add",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const removeQuantity = async () => {
    try {
      await axios.patch(`/api/Cart/quantityChange/${product._id}`, {
        action: "Remove",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      boxSizing={"border-box"}
      sx={{
        borderBottom: "1px solid #DFDFDF",
        mb: 2,
      }}
    >
      {/* 👇 Product image  👇   */}
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        sx={{
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          order: 1,
        }}
      >
        <Box
          component="img"
          src={`https://masnikkas3-storage.s3.af-south-1.amazonaws.com/${product.productSize.productColor.productPhotos.thumbnailImg}`}
          sx={{ height: "170px", width: "auto" }}
        />
      </Grid>
      {/*👆  Product image  👆  */}

      {/* 👇 product info 👇   */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          boxSizing: "border-box",
          paddingX: { xs: "20px", sm: "40px" },
          order: { xs: 2, sm: 2 },
        }}
      >
        <Stack
          sx={{
            display: { xs: "flex", sm: "block" },
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* 👇 brand 👇   */}
          <Typography
            variant="h2"
            sx={{
              fontSize: "14px",
              color: "grey",
              bgcolor: "#F0F2F2",
              width: "fit-content",
              padding: "6px 12px",
              fontFamily: "Oswald",
              textTransform: "uppercase",
              borderRadius: "4px",
              fontWeight: "600",
              mt: 1,
            }}
          >
            {product.productSize.product.brandId.name}
          </Typography>
          {/*👆  brand 👆  */}

          {/* 👇 product title line 👇   */}
          <Typography
            variant="h1"
            sx={{
              fontSize: "18px",
              width: "fit-content",
              fontFamily: "Oswald",
              fontWeight: "600",
              mt: 1,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {product.productSize.product.name}
          </Typography>
          {/*👆  product title line 👆  */}

          {/* 👇 product rating 👇   */}
          <Box mt={1} display="flex" alignItems="center">
            <Typography
              fontSize="16px"
              fontWeight={"bold"}
              fontFamily="Oswald"
              mr={1}
            >
              {product.productSize.product.averageRating}.0
            </Typography>
            <Rating
              name="read-only"
              value={product.productSize.product.averageRating}
              readOnly
              size="small"
            />
          </Box>
          {/*👆  product rating 👆  */}
          <Stack direction={"row"} alignItems={"center"} mt={1}>
            {/* 👇 select color👇   */}
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                sx={{
                  fontSize: "16px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                }}
              >
                Color:
              </Typography>
              <Box
                height="20px"
                width="20px"
                ml={2}
                bgcolor={product.productSize.productColor.colorCode}
              />
            </Stack>
            {/*👆  select color👆  */}

            {/* 👇 select size👇   */}
            <Stack direction={"row"} alignItems={"center"} ml={2}>
              <Typography
                sx={{
                  fontSize: "16px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                }}
              >
                Size:
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  ml: 2,
                }}
              >
                {product.productSize.size}
              </Typography>
            </Stack>
            {/*👆 select size👆  */}
          </Stack>

          {/* 👇 price👇   */}
          <Box display={"flex"} mt={1}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                fontFamily={"Oswald"}
                fontSize="20px"
                mr={1}
                fontWeight={"bold"}
              >
                $
                {product.productSize.unitPrice -
                  (product.productSize.unitPrice *
                    product.productSize.product.discountPercent) /
                    100}
              </Typography>
              <Typography mr={1} color={"grey"} fontFamily={"Oswald"}>
                <s>${product.productSize.unitPrice}</s>
              </Typography>
              <Typography fontFamily={"Oswald"}>
                {product.productSize.product.discountPercent}%
              </Typography>
            </Box>
          </Box>
          {/*👆 price👆  */}

          {/* 👇 Remove from cart button👇   */}
          <Button
            disableRipple
            onClick={removeItem}
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0F6DB1",
              padding: "0",
              marginY: "10px",
            }}
          >
            <ClearIcon sx={{ mr: 1 }} />
            Remove
          </Button>
          {/*👆  Remove from cart button👆  */}
        </Stack>
      </Grid>
      {/*👆  product info 👆  */}

      {/* 👇 Total Price 👇   */}
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        sx={{
          boxSizing: "border-box",
          paddingX: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          order: 3,
          flexDirection: { xs: "column", sm: "column" },
          paddingBottom: "20px",
        }}
      >
        <Typography
          fontFamily={"Oswald"}
          fontSize="20px"
          mr={1}
          fontWeight={"bold"}
        >
          Total Price
        </Typography>
        <Typography
          fontFamily={"Oswald"}
          fontSize="20px"
          mr={1}
          fontWeight={"bold"}
        >
          $
          {product.productSize.unitPrice * product.quantity -
            (product.productSize.unitPrice *
              (product.quantity *
                product.productSize.product.discountPercent)) /
              100}
        </Typography>
        {/* 👇 Quantity 👇   */}
        <Box
          sx={{
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
            width: "140px",
          }}
        >
          <IconButton
            onClick={addQuantity}
            sx={{
              color: "#c4c4c4",
              "&:hover": {
                color: "black",
              },
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography>{product.quantity}</Typography>
          <IconButton
            onClick={removeQuantity}
            sx={{
              color: "#c4c4c4",
              "&:hover": {
                color: "black",
              },
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        {/*👆  Quantity 👆  */}
      </Grid>
      {/*👆  Total Price 👆  */}
    </Grid>
  );
};

export default SingleCartItem;
