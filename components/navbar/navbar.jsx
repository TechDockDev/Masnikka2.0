import { AppBar, Box, Grid, IconButton, List } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import NavMenuItem from "./navMenuItem";
import AppBarSearch from "./appBarSearch";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ModalComponent from "../modalComponent";
import LogIn from "../login/login";
import Signup from "../signup/signup";

const Navbar = () => {
   const [openLoginModal, setOpenLoginModal] = useState(false);
   const [openSignupModal, setOpenSignupModal] = useState(false)
   //👇 function to open login modal👇
   const toggleLoginModal = () => {
      setOpenLoginModal(!openLoginModal);
   };
   //👇 function to open signup modal👇
   const toggleSignupModal = () => {
      setOpenSignupModal(!openSignupModal);
   };
   return (
      <AppBar sx={{ maxWidth: "xl", left: "auto", right: "auto", paddingX: "15px", boxSizing: "border-box", height: "80px" }}>
         <Grid
            container
            sx={{
               //    border: "2px solid white",
               height: "100%",
               display: "flex",
               justifyContent: "space-between",
               alignContent: "center",
               boxSizing: "border-box",
            }}>
            {/* 👇 grid for topbar MASNIKKA LOGO👇   */}
            <Grid
               item
               xs={3}
               sx={{
                  //   border: "2px solid white",
                  height: "100%",
                  display: "flex",
                  //   justifyContent: "center",
                  alignContent: "center",
               }}>
               <Link
                  href="/"
                  style={{
                     display: "block",
                     marginTop: "auto",
                     marginBottom: "auto",
                  }}>
                  <Box
                     component={"img"}
                     src="/assets/masnikka_logo.png"
                     sx={{
                        height: "60px",
                        display: "block",
                     }}
                  />
               </Link>
            </Grid>
            {/*👆 grid for topbar MASNIKKA LOGO 👆  */}
            {/* 👇 grid for topbar right side navlinks and search bar👇   */}
            <Grid
               item
               xs={9}
               lg={7}
               sx={{
                  // border: "2px solid white",
                  height: "100%",
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  alignContent: "center",
               }}>
               <List sx={{ display: "flex", justifyContent: "space-between", width: "100% " }}>
                  {/* 👇 HOME👇   */}
                  <NavMenuItem linkText={"HOME"} hyperLink={"/"} />
                  {/*👆 HOME 👆  */}
                  {/* 👇 MY DESIGNS 👇   */}
                  <NavMenuItem linkText={"My Designs"} hyperLink={"/"} />

                  {/*👆 MY DESIGNS 👆  */}
                  {/* 👇 SEARCH BAR 👇   */}
                  <AppBarSearch />
                  {/*👆 SEARCH BAR👆  */}
                  {/* 👇 LOG IN 👇   */}
                  <NavMenuItem handler={toggleLoginModal} linkText={"Log In"}/>
                  {/*👆 LOG IN 👆  */}
                  {/* 👇 SIGN UP👇   */}
                  <NavMenuItem handler={toggleSignupModal} linkText={"Sign Up"}  />
                  {/*👆 SIGN UP 👆  */}
               </List>
               {/* 👇  CART BUTTON👇   */}

               <IconButton sx={{ color: "white" }}>
                  <ShoppingBagOutlinedIcon />
               </IconButton>
               {/*👆 CART BUTTON 👆  */}
            </Grid>
            {/*👆 grid for topbar right side navlinks and search bar 👆  */}
         </Grid>
         <ModalComponent openModal={openLoginModal} toggleModal={toggleLoginModal}>
            <LogIn />
         </ModalComponent>
         <ModalComponent openModal={openSignupModal} toggleModal={toggleSignupModal}>
            <Signup />
         </ModalComponent>
      </AppBar>
   );
};

export default Navbar;
