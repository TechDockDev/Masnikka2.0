import { Box, Button, Grid, IconButton, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ShoeSizes from "../shoeSizes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import Link from "next/link";

const ProductView = () => {
   const [imgIndex, setImgIndex] = useState(0);
   const images = [1, 2, 3];
   const colors = ["#4E56DD", "#E0759C", "#5C7D48"];
   return (
      <Grid container mt={3} sx={{ display: "flex", flexDirection: { xs: "column", md: "row",}, justifyContent: "center", alignItems: { xs: "center", md: "start" }  }}>
         {/* 👇 products images preview  👇   */}
         <Grid item xs={10} md={1} p={1}>
            <Stack
               sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  // border: "1px solid red",
               }}>
               {images.map((img, indexOfImg) => {
                  return (
                     <Box
                        key={indexOfImg}
                        onClick={(e) => {
                           alert("clicked");
                        }}
                        component="img"
                        src="/assets/product.png"
                        sx={{
                           height: { xs: "70px" },
                           marginX: { xs: "10px", md: "0px" },
                           marginY: { xs: "0", md: "10px" },
                           cursor: "pointer",
                           "&:hover": {
                              scale: "0.98",
                              border: "1px solid black",
                           },
                        }}
                     />
                  );
               })}
            </Stack>
         </Grid>
         {/*👆  products images preview  👆  */}
         {/* 👇 main image  👇   */}

         <Grid item xs={12} md={4} sx={{ boxSizing: "border-box", paddingX: "20px" }}>
            <Stack spacing={2}>
               <Box component="img" src="/assets/product.png" sx={{ width:{xs:"100%"} }} />
            </Stack>
         </Grid>
         {/*👆  main image  👆  */}

         {/* 👇 product info 👇   */}
         <Grid item xs={12} md={5} sx={{ boxSizing: "border-box", paddingX: "20px" }}>
            <Stack>
               {/* 👇 brand 👇   */}
               <Typography variant="h2" sx={{ fontSize: "18px", color: "grey", bgcolor: "#F0F2F2", width: "fit-content", padding: "6px 12px", fontFamily: "Oswald", textTransform: "uppercase", borderRadius: "4px", fontWeight: "600", mt: 2 }}>
                  Nike
               </Typography>
               {/*👆  brand 👆  */}
               {/* 👇 product title line 👇   */}
               <Typography variant="h1" sx={{ fontSize: "40px", width: "fit-content", fontFamily: "Oswald", fontWeight: "600", mt: 2 }}>
                  Revolution 6 NN Running Shoes For Men
               </Typography>
               {/*👆  product title line 👆  */}
               {/* 👇 product rating 👇   */}
               <Box mt={2} display="flex" alignItems="center">
                  <Typography fontSize="16px" fontWeight={"bold"} fontFamily="Oswald" mr={1}>
                     4.0
                  </Typography>
                  <Rating name="read-only" value={4} readOnly size="small" />
                  <Typography ml={1} fontSize="16px" fontFamily="Oswald" fontWeight={"light"}>
                     (2000)
                  </Typography>
               </Box>
               {/*👆  product rating 👆  */}
               {/* 👇 select color👇   */}
               <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", mt: 2 }}>Select Color</Typography>
               <Stack direction={"row"} spacing={2} mt={1}>
                  {colors.map((color, colorIndex) => {
                     return <Box key={colorIndex} height="20px" width="20px" bgcolor={color} />;
                  })}
               </Stack>
               {/*👆  select color👆  */}
               {/* 👇 select size👇   */}
               <Typography sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", mt: 2 }}>Select Size</Typography>
               <ShoeSizes />
               {/*👆  select size👆  */}
               {/* 👇 price total and quantity👇   */}
               <Box display={"flex"} mt={2}>
                  <Box>
                     <Typography mb={1} sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase" }}>
                        Price Total
                     </Typography>
                     <Typography sx={{ fontSize: "24px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", fontWeight: "600" }}>$90.00</Typography>
                  </Box>
                  <Box ml={3}>
                     <Typography mb={1} sx={{ fontSize: "16px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase" }}>
                        Quantity
                     </Typography>
                     <Box
                        sx={{
                           border: "1px solid #C4C4C4",
                           borderRadius: "4px",
                           display: "flex",
                           alignItems: "center",
                        }}>
                        <IconButton
                           sx={{
                              color: "#c4c4c4",
                              "&:hover": {
                                 color: "black",
                              },
                           }}>
                           <AddIcon />
                        </IconButton>
                        <Typography>quantity</Typography>
                        <IconButton
                           sx={{
                              color: "#c4c4c4",
                              "&:hover": {
                                 color: "black",
                              },
                           }}>
                           <RemoveIcon />
                        </IconButton>
                     </Box>
                  </Box>
               </Box>

               {/*👆 price total and quantity👆  */}
               {/* 👇 Add to bag and customize button👇   */}
               <Box display={"flex"} mt={2}>
                  <Button variant="contained" sx={{ fontFamily: "Oswald", fontWeight: "16px", fontWeight: "600", height: "45px", width: "120px" }}>
                     Add To Bag
                  </Button>
                  <Button 
                  component={Link}
                  href="/customization"
                  variant="outlined" sx={{ fontFamily: "Oswald", fontWeight: "16px", fontWeight: "600", height: "45px", width: "120px", ml: 3 }}>
                     Customize
                  </Button>
               </Box>

               {/*👆 Add to bag and customize button👆  */}
               {/* 👇 free shipping and product code👇   */}
               <Box display={"flex"} mt={2}>
                  <Box display={"flex"}>
                     <Typography sx={{ fontSize: "12px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", padding: "0px 10px" }}>
                        <DoneIcon sx={{ fontSize: "14px" }} />
                     </Typography>
                     <Typography sx={{ fontSize: "12px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", fontWeight: "400" }}>Free shipping</Typography>
                  </Box>
                  <Box display={"flex"} ml={3}>
                     <Typography sx={{ fontSize: "12px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", fontWeight: "bold", fontWeight: "600" }}>Product code:</Typography>
                     <Typography sx={{ fontSize: "12px", width: "fit-content", fontFamily: "Oswald", textTransform: "uppercase", color: "#C4C4C4", ml: 1 }}>RFKK1024</Typography>
                  </Box>
               </Box>
               {/*👆 free shipping and product code👆  */}
            </Stack>
         </Grid>
         {/*👆  product info 👆  */}
      </Grid>
   );
};

export default ProductView;
