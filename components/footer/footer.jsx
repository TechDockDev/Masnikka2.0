import { AppBar, Grid, Stack } from "@mui/material";
import React from "react";
import Features from "./features";
import MenuFooter from "./menuFooter";
import ContactUs from "./contactUs";
import FollowUs from "./followUs";

const Footer = () => {
   return (
      <AppBar sx={{ maxWidth: "xl", left: "auto", right: "auto", paddingX: "15px", boxSizing: "border-box", bottom: "0px", mt: 3,  display:{xs:"none", md:"block"} }} position="static">
         <Grid container padding="40px" width="90%" margin={"auto"}>
            {/* <Features /> */}
            <MenuFooter />
            <ContactUs />
            <FollowUs />
         </Grid>
      </AppBar>
   );
};

export default Footer;
