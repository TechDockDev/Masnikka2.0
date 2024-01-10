import React from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Rating,
  Button,
  Backdrop,
} from "@mui/material";
import { useRouter } from "next/router";

const SingleDesign = ({ product }) => {
  const router = useRouter();
  return (
    <Grid
      item
      xs={10}
      sm={3.8}
      md={2.8}
      marginX={"auto"}
      // border={"1px solid red"}
      height={"fit-content"}
      sx={{
        boxSizing: "border-box",
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
      onClick={() =>
        router.push({
          pathname: `/productpage/${product._id}`,
          query: { canvas: true },
        })
      }
      mb={1}
    >
      <Box position={"relative"}>
        <Box
          component={"img"}
          alt="Design"
          src={`https://masnikkas3-storage.s3.af-south-1.amazonaws.com/${product.productColor.productPhotos.thumbnailImg}`}
          width={"100%"}
          display={"block"}
        />
        <Typography
          sx={{
            fontFamily: "Oswald",
            fontWeight: "600",
            fontSize: "16px",
            color: "white",
            textAlign: "center",
            textTransform: "uppercase",
            bgcolor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "2px",
            padding: "10px 0px",
            position: "absolute",
            bottom: "0px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          Customized
        </Typography>
      </Box>
      <Stack p={1}>
        <Typography
          textAlign="center"
          mb={1}
          color="grey"
          fontSize="14px"
          textTransform="uppercase"
        >
          {product.product.brandId.name}
        </Typography>
        <Typography textAlign="center" fontSize="18px">
          {product.product.name}
        </Typography>
        <Box mt={1} display="flex" justifyContent="center">
          {/* <Typography fontSize="16px" mr={1}>
            4.0
          </Typography>
          <Rating name="read-only" value={4} readOnly size="small" /> */}
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
            R
            {product.productColor.productSize[0].unitPrice -
              product.productColor.productSize[0].unitPrice *
                (product.product.discountPercent / 100)}
          </Typography>
          <Typography mr={1} color={"grey"}>
            <s>R{product.productColor.productSize[0].unitPrice}</s>
          </Typography>
          <Typography>({product.product.discountPercent}% off)</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          {/* <Button
            variant="contained"
            sx={{
              fontFamily: "Oswald",
              padding: "10px 20px",
            }}
          >
            Add To Cart
          </Button> */}
        </Box>
      </Stack>
    </Grid>
  );
};

export default SingleDesign;
