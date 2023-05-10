import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
const SingleOrder = () => {
   return (
      <Grid container mt={2} sx={{ border: "1px solid grey", padding: "20px", borderRadius: "8px", display: "flex", justifyContent: "space-between",
      // "& .MuiGrid-item":{border:"1px solid red"}
       }}>
         {/* ============ */}
         <Grid item xs={6} sm={2} lg={1} margin={{xs:"auto", sm:"0"}}>
            <Box component={"img"} src="/assets/product.png" alt="" sx={{ display: "block", width: "100%" }} />
         </Grid>
         {/* ============ */}
         <Grid item  xs={12} sm={4} paddingX={"10px"} boxSizing={"border-box"} textAlign={{xs:"center", sm:"left"}}>
            <Typography fontWeight={600} fontFamily={"Oswald"}>
               Revolution 6 NN Running Shoes For Men
            </Typography>
            <Typography mt={1}>QTY : 1</Typography>
            <Stack mt={1} direction={"row"} alignItems={"center"} justifyContent={{xs:"center", sm:"start"}}>
               <Typography color={"#828282"}>COLOR</Typography>
               <SquareRoundedIcon sx={{ color: "red", paddingX: "10px" }} />
               <Typography color={"#828282"}>SIZE : 6</Typography>
            </Stack>
         </Grid>
         {/* ============ */}
         <Grid item  xs={12} sm={2} lg={1} padding={{ xs:"20px",sm:"0px 10px",}} boxSizing={"border-box"}>
            <Typography fontWeight={600} fontFamily={"Oswald"} textAlign={"center"}>
               $129.00
            </Typography>
         </Grid>
         {/* ============ */}
         <Grid item xs={12} sm={4} paddingX={"10px"} boxSizing={"border-box"} textAlign={"center"}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
               <CircleRoundedIcon sx={{ color: "green", fontSize: "14px" }} />
               <Typography ml={1} fontWeight={600}>
                  Delivered on 08 April, 2023
               </Typography>
            </Stack>
            <Typography mt={1} color={"#828282"} textAlign={"center"}>
               Your Order has been delivered
            </Typography>
            <Button
               variant="outlined"
               // size="large"
               sx={{
                  mt: 1,
                  color: "#0F6DB1",
                  border: "1px solid #0F6DB1",
                  "&:hover": {
                     border: "1px solid #0F6DB1",
                  },
               }}>
               Rate & Review Product
            </Button>
         </Grid>
         {/* ============ */}
      </Grid>
   );
};

export default SingleOrder;
