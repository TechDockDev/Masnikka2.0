import React from "react";
import { Grid, Box, Stack, Typography, Rating } from "@mui/material";
import { useRouter } from "next/router";
import S3Image from "@/lib/getImage";
// **********************
const SingleProduct = ({ product }) => {
  const router = useRouter();
  // =====
  let price =
    Number(product?.productColor[0]?.productSize[0]?.unitPrice) -
    Number(product?.productColor[0]?.productSize[0]?.unitPrice) *
      (Number(product?.discountPercent) / 100);
  // ========
  let image = product?.productColor[0]?.productPhotos?.thumbnailImg;

  return (
    <Grid
      xs={10}
      sm={3.8}
      md={3.8}
      item
      onClick={() => router.push(`/productpage/${product._id}`)}
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
        {image && (
          <S3Image
            imgKey={image}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Box>
      <Stack p={1}>
        <Typography
          textAlign="center"
          mb={1}
          color="grey"
          fontSize="14px"
          textTransform="uppercase"
        >
          {product?.brandId?.name}
        </Typography>
        <Typography textAlign="center" fontSize="18px">
          {product?.name}
        </Typography>
        <Box mt={1} display="flex" justifyContent="center">
          <Typography fontSize="16px" mr={1}>
            4.0
          </Typography>
          <Rating
            name="read-only"
            value={product?.averageRating}
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
            R{price.toFixed(0)}
          </Typography>
          <Typography mr={1} color={"grey"}>
            <s>R{product?.productColor[0]?.productSize[0]?.unitPrice}</s>
          </Typography>
          <Typography>({product?.discountPercent}% off)</Typography>
        </Box>
      </Stack>
    </Grid>
  );
};

export default SingleProduct;
