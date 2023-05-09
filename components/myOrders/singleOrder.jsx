import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
const SingleOrder = () => {
   return (
      <Grid container mt={2} sx={{ border: "1px solid grey", padding: "10px", borderRadius: "8px" }}>
         <Grid item xs={1}>
            <Box component={"img"} src="/assets/product.png" alt="" sx={{ display: "block", width: "100%" }} />
         </Grid>
         <Grid item xs={4} paddingX={"20px"}>
            <Typography fontWeight={600} fontFamily={"Oswald"}>
               Revolution 6 NN Running Shoes For Men
            </Typography>
            <Typography mt={1}>QTY : 1</Typography>
            <Stack mt={1} direction={"row"} alignItems={"center"}>
               <Typography color={"#828282"}>COLOR</Typography>
               <SquareRoundedIcon sx={{ color: "red", paddingX: "10px" }} />
               <Typography color={"#828282"}>SIZE : 6</Typography>
            </Stack>
         </Grid>
         <Grid item xs={2} paddingX={"20px"}>
            <Typography fontWeight={600} fontFamily={"Oswald"}>
               $ 129.00
            </Typography>
         </Grid>
         <Grid item xs={4} paddingX={"20px"}>
            <Stack mt={1} direction={"row"} alignItems={"center"}>
               <CircleRoundedIcon sx={{ color: "green", fontSize: "14px" }} />
               <Typography ml={1} fontWeight={600}>
                  Delivered on 08 April, 2023
               </Typography>
            </Stack>
            <Typography mt={1} color={"#828282"}>Your Order has been delivered</Typography>
            <Button
            variant="outlined"
            // size="large"
            sx={{mt:1, color:"#0F6DB1", border:"1px solid #0F6DB1", "&:hover":{
                border:"1px solid #0F6DB1"
            }}}
            >Rate & Review Product</Button>
         </Grid>
      </Grid>
   );
};

export default SingleOrder;
