"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import ShoeSizes from "../shoeSizes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import Link from "next/link";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import S3Image from "@/lib/getImage";

const productImgStyle = {
  height: { xs: "70px" },
  marginX: { xs: "10px", md: "0px" },
  marginY: { xs: "0", md: "10px" },
  cursor: "pointer",
  "&:hover": {
    scale: "0.98",
    border: "1px solid black",
  },
};

const ProductView = ({ product, customize }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.productColor[0]?.productPhotos?.productImg
  );
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [img, setImg] = useState({
    frontImg: "",
    backImg: "",
    leftImg: "",
    rightImg: "",
  });

  const addToBag = async () => {
    try {
      if (!searchParams.has("canvas")) {
        await axios.post("/api/Cart/managecart", {
          productSizeId:
            product.productColor[colorIndex].productSize[sizeIndex]._id,
          quantity,
        });
      } else {
        await axios.post("/api/Cart/addCartCustom", {
          productSizeId:
            product.productColor[colorIndex].productSize[sizeIndex]._id,
          quantity,
          customizeId: JSON.parse(customize)._id,
        });
      }
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
  const addToWishlist = async () => {
    try {
      const { data } = await axios.post("/api/Wishlist/userWishlist", {
        productId: product._id,
      });
      setLike(data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(`/api/Wishlist/${product._id}`);
      setLike(data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const getCanvasImages = async () => {
    const frontImg = await generateImage("frontJson", "frontImg");
    const backImg = await generateImage("backJson", "backImg");
    const rightImg = await generateImage("rightJson", "rightImg");
    const leftImg = await generateImage("leftJson", "leftImg");
    setImg({ frontImg, backImg, rightImg, leftImg });
    setSelectedImage(frontImg);
  };

  const generateImage = (json, image) => {
    return new Promise((resolve, reject) => {
      var canvas = new fabric.Canvas("yourCanvasElement");
      canvas.loadFromJSON(JSON.parse(customize)[json], function () {
        canvas.setHeight(
          canvas.backgroundImage?.height * canvas.backgroundImage?.scaleY ||
            canvas.height
        );
        canvas.setWidth(
          canvas.backgroundImage?.width * canvas.backgroundImage?.scaleX ||
            canvas.width
        );
        // Convert canvas to data URL
        var dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
        });

        resolve(dataURL); // Resolve the Promise with the dataURL
      });
    });
  };

  useEffect(() => {
    getWishlist();
    if (searchParams.get("canvas")) {
      getCanvasImages();
    }
  }, []);
  return (
    <Grid
      container
      mt={3}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: { xs: "center", md: "start" },
      }}
    >
      {/* 👇 products images preview  👇   */}
      <Grid item xs={10} md={1} p={1}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            // border: "1px solid red",
          }}
        >
          {searchParams.has("canvas") ? (
            Object.entries(img).map(([key, value]) => (
              <Box
                key={key}
                component={"img"}
                src={value}
                alt="customize"
                sx={productImgStyle}
                onClick={(e) => setSelectedImage(value)}
              />
            ))
          ) : (
            <>
              <S3Image
                imgKey={
                  product.productColor[colorIndex].productPhotos?.productImg
                }
                setSelectedImage={setSelectedImage}
                style={productImgStyle}
              />
              <S3Image
                imgKey={
                  product.productColor[colorIndex].productPhotos?.frontImg
                }
                setSelectedImage={setSelectedImage}
                style={productImgStyle}
              />
              <S3Image
                imgKey={product.productColor[colorIndex].productPhotos?.leftImg}
                setSelectedImage={setSelectedImage}
                style={productImgStyle}
              />
              <S3Image
                imgKey={
                  product.productColor[colorIndex].productPhotos?.rightImg
                }
                setSelectedImage={setSelectedImage}
                style={productImgStyle}
              />
              <S3Image
                imgKey={product.productColor[colorIndex].productPhotos?.backImg}
                setSelectedImage={setSelectedImage}
                style={productImgStyle}
              />
            </>
          )}
        </Stack>
      </Grid>
      {/*👆  products images preview  👆  */}

      {/* 👇 main image  👇   */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{ boxSizing: "border-box", paddingX: "20px" }}
      >
        <Stack spacing={2}>
          {searchParams.has("canvas") ? (
            <img
              src={selectedImage}
              alt="display image"
              style={{ width: { xs: "100%" } }}
            />
          ) : (
            <S3Image imgKey={selectedImage} style={{ width: { xs: "100%" } }} />
          )}
        </Stack>
      </Grid>
      {/*👆  main image  👆  */}

      {/* 👇 product info 👇   */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{ boxSizing: "border-box", paddingX: "20px" }}
      >
        <Stack>
          {/* 👇 brand 👇   */}
          <Typography
            variant="h2"
            sx={{
              fontSize: "18px",
              color: "grey",
              bgcolor: "#F0F2F2",
              width: "fit-content",
              padding: "6px 12px",
              fontFamily: "Oswald",
              textTransform: "uppercase",
              borderRadius: "4px",
              fontWeight: "600",
              mt: 2,
            }}
          >
            {product.brandId.name}
          </Typography>
          {/*👆  brand 👆  */}

          {/* 👇 product title line 👇   */}
          <Typography
            variant="h1"
            sx={{
              fontSize: "40px",
              width: "fit-content",
              fontFamily: "Oswald",
              fontWeight: "600",
              mt: 2,
            }}
          >
            {product.name}
          </Typography>
          {/*👆  product title line 👆  */}

          {/* 👇 product rating 👇   */}
          <Box mt={2} display="flex" alignItems="center">
            <Typography
              fontSize="16px"
              fontWeight={"bold"}
              fontFamily="Oswald"
              mr={1}
            >
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
              fontFamily="Oswald"
              fontWeight={"light"}
            >
              (2000)
            </Typography> */}
          </Box>
          {/*👆  product rating 👆  */}

          {/* 👇 select color👇   */}
          <Typography
            sx={{
              fontSize: "16px",
              width: "fit-content",
              fontFamily: "Oswald",
              textTransform: "uppercase",
              mt: 2,
            }}
          >
            Select Color
          </Typography>
          <Stack direction={"row"} spacing={2} mt={1}>
            {product.productColor.map((color, index) => {
              return (
                <Box
                  key={index}
                  height="20px"
                  width="20px"
                  bgcolor={color.colorCode}
                  sx={{
                    cursor: "pointer",
                    border: colorIndex === index ? "3px solid black" : "none",
                  }}
                  onClick={() => setColorIndex(index)}
                />
              );
            })}
          </Stack>
          {/*👆  select color👆  */}

          {/* 👇 select size👇   */}
          <Typography
            sx={{
              fontSize: "16px",
              width: "fit-content",
              fontFamily: "Oswald",
              textTransform: "uppercase",
              mt: 2,
            }}
          >
            Select Size
          </Typography>
          <ShoeSizes
            productSizes={product.productColor[colorIndex].productSize}
            setSizeIndex={setSizeIndex}
          />
          {/*👆  select size👆  */}

          {/* 👇 price total and quantity👇   */}
          <Box display={"flex"} mt={2}>
            <Box>
              <Typography
                mb={1}
                sx={{
                  fontSize: "16px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                }}
              >
                Price Total
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                R
                {product.productColor[colorIndex].productSize[sizeIndex]
                  .unitPrice *
                  quantity -
                  product.productColor[colorIndex].productSize[sizeIndex]
                    .unitPrice *
                    quantity *
                    (product.discountPercent / 100)}
              </Typography>
              <Stack direction={"row"}>
                <Typography mr={1} color={"grey"} fontFamily={"Oswald"}>
                  <s>
                    R
                    {product.productColor[colorIndex].productSize[sizeIndex]
                      .unitPrice * quantity}
                  </s>
                </Typography>
                <Typography fontFamily={"Oswald"}>
                  {product.discountPercent}%
                </Typography>
              </Stack>
            </Box>
            <Box ml={3}>
              <Typography
                mb={1}
                sx={{
                  fontSize: "16px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                }}
              >
                Quantity
              </Typography>
              <Box
                sx={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{
                    color: "#c4c4c4",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
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
            </Box>
            <Box
              m={3}
              sx={{
                display: "flex",
                alignItems: "normal",
              }}
            >
              <IconButton size="large" onClick={addToWishlist}>
                {like ? (
                  <FavoriteIcon fontSize="inherit" sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon
                    fontSize="inherit"
                    sx={{ color: "black" }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>

          {/*👆 price total and quantity👆  */}

          {/* 👇 Add to bag and customize button👇   */}
          <Box display={"flex"} mt={2}>
            <Button
              variant="contained"
              onClick={addToBag}
              sx={{
                fontFamily: "Oswald",
                fontWeight: "16px",
                fontWeight: "600",
                height: "45px",
                width: "120px",
              }}
            >
              Add To Bag
            </Button>
            <Button
              component={Link}
              href={{
                pathname: "/customization",
                query: {
                  product: product.productColor[colorIndex]._id,
                },
              }}
              variant="outlined"
              sx={{
                fontFamily: "Oswald",
                fontWeight: "16px",
                fontWeight: "600",
                height: "45px",
                width: "120px",
                ml: 3,
              }}
            >
              Customize
            </Button>
          </Box>

          {/*👆 Add to bag and customize button👆  */}

          {/* 👇 free shipping and product code👇   */}
          <Box display={"flex"} mt={2}>
            {/* <Box display={"flex"}>
              <Typography
                sx={{
                  fontSize: "12px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  padding: "0px 10px",
                }}
              >
                <DoneIcon sx={{ fontSize: "14px" }} />
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  fontWeight: "400",
                }}
              >
                Free shipping
              </Typography>
            </Box> */}
            {/* <Box display={"flex"} ml={3}>
              <Typography
                sx={{
                  fontSize: "12px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontWeight: "600",
                }}
              >
                Product code:
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  width: "fit-content",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  color: "#C4C4C4",
                  ml: 1,
                }}
              >
                RFKK1024
              </Typography>
            </Box> */}
          </Box>
          {/*👆 free shipping and product code👆  */}
        </Stack>
      </Grid>
      {/*👆  product info 👆  */}
    </Grid>
  );
};

export default ProductView;
