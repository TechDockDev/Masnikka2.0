import { Grid, List, Stack, Typography } from "@mui/material";
import React from "react";
import SingleLink from "./singleLink";

const Features = () => {
   return (
      <Grid item xs={3}>
         <Typography fontFamily={"Oswald"} fontSize={"18px"} textTransform={"uppercase"}>
            Features
         </Typography>
         <List disablePadding sx={{mt:2}}>
            <SingleLink linkText={"new arrivals"} hyperLink={"/"}/>
            <SingleLink linkText={"Most popular"} hyperLink={"/"}/>
            <SingleLink linkText={"Customization"} hyperLink={"/"}/>
            <SingleLink linkText={"Brands"} hyperLink={"/"}/>
            <SingleLink linkText={"Categories"} hyperLink={"/"}/>
         </List>
      </Grid>
   );
};

export default Features;
