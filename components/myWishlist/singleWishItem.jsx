import React from "react";
import { Grid, Box, Stack, Typography, Rating, Button } from "@mui/material";
import axios from "axios";

const SingleWishItem = ({ wishlist }) => {
  const { product } = wishlist;
  const removeFromWishlist = async () => {
    try {
      await axios.delete(
        `/api/Wishlist/userWishlist?wishlistId=${wishlist._id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      item
      xs={10}
      sm={3.8}
      md={3.8}
      // border={"1px solid red"}
      height={"fit-content"}
      sx={{
        transition: "all 200ms ease-in-out",
        borderRadius: "8px",
        cursor: "pointer",
        "& .MuiTypography-root": {
          fontFamily: "Oswald",
        },
        "&:hover": {
          scale: "0.95",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        },
        "&:active": {
          scale: "0.92",
        },
      }}
      mb={1}
    >
      <Box>
        <Box
          component={"img"}
          src={`https://masnikkas3-storage.s3.af-south-1.amazonaws.com/${product.productColor[0].productPhotos.thumbnailImg}`}
          width={"100%"}
        />
      </Box>
      <Stack p={1}>
        <Typography
          textAlign="center"
          mb={1}
          color="grey"
          fontSize="14px"
          textTransform="uppercase"
        >
          {product.brandId.name}
        </Typography>
        <Typography textAlign="center" fontSize="18px">
          {product.name}
        </Typography>
        <Box mt={1} display="flex" justifyContent="center">
          <Typography fontSize="16px" mr={1}>
            {product.averageRating}
          </Typography>
          <Rating
            name="read-only"
            value={product.averageRating}
            readOnly
            size="small"
          />
          {/* <Typography
            ml={1}
            fontSize="16px"
            color={"grey"}
            fontWeight={"light"}
          >
            (2000)
          </Typography> */}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography fontSize="24px" mr={1} fontWeight={"bold"}>
            $
            {product.productColor[0].productSize[0].unitPrice -
              product.productColor[0].productSize[0].unitPrice *
                (product.discountPercent / 100)}
          </Typography>
          <Typography mr={1} color={"grey"}>
            <s>${product.productColor[0].productSize[0].unitPrice}</s>
          </Typography>
          <Typography>{product.discountPercent}%</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Button
            variant="contained"
            onClick={removeFromWishlist}
            sx={{
              fontFamily: "Oswald",
              padding: "10px 20px",
            }}
          >
            Remove from wishlist
          </Button>
        </Box>
      </Stack>
    </Grid>
  );
};

export default SingleWishItem;
