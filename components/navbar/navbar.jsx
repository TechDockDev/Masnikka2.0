import {
  AppBar,
  Backdrop,
  Box,
  Grid,
  IconButton,
  List,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import NavMenuItem from "./navMenuItem";
import AppBarSearch from "./appBarSearch";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ModalComponent from "../modalComponent";
import LogIn from "../login/login";
import Signup from "../signup/signup";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "@/context/AppContext";

const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { userData, getUserData } = useContext(AppContext);
  const matchesSM = useMediaQuery("(max-width:600px)");
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  //👇 function to open login modal👇
  const toggleLoginModal = () => {
    setOpenLoginModal(!openLoginModal);
  };
  //👇 function to open signup modal👇
  const toggleSignupModal = () => {
    setOpenSignupModal(!openSignupModal);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppBar
      sx={{
        maxWidth: "xl",
        left: "auto",
        right: "auto",
        paddingX: "15px",
        boxSizing: "border-box",
        height: { xs: "60px", sm: "80px" },
      }}
    >
      <Grid
        container
        sx={{
          //    border: "2px solid white",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          boxSizing: "border-box",
        }}
      >
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
          }}
        >
          <Link
            href="/"
            style={{
              display: "block",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <Box
              component={"img"}
              src={
                matchesSM
                  ? "/assets/LogoSmall.svg"
                  : "/assets/masnikka_logo.png"
              }
              sx={{
                height: { xs: "35px", sm: "60px" },
                display: "block",
              }}
            />
          </Link>
        </Grid>
        {/*👆 grid for topbar MASNIKKA LOGO 👆  */}
        {/* ================================================== */}
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
          }}
        >
          <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100% ",
            }}
          >
            {/* 👇 HOME👇   */}
            <NavMenuItem linkText={"HOME"} hyperLink={"/"} />
            {/*👆 HOME 👆  */}
            {/* 👇 MY DESIGNS 👇   */}
            <NavMenuItem linkText={"My Designs"} hyperLink={"/designs"} />

            {/*👆 MY DESIGNS 👆  */}
            {/* 👇 SEARCH BAR 👇   */}
            <AppBarSearch />
            {/*👆 SEARCH BAR👆  */}
            {Object.keys(userData).length === 0 ? (
              <>
                {/* 👇 LOG IN 👇   */}
                <NavMenuItem handler={toggleLoginModal} linkText={"Log In"} />
                {/*👆 LOG IN 👆  */}
                {/* 👇 SIGN UP👇   */}
                <NavMenuItem handler={toggleSignupModal} linkText={"Sign Up"} />
                {/*👆 SIGN UP 👆  */}
              </>
            ) : (
              <>
                {/* 👇 My Account👇   */}
                <NavMenuItem
                  toggleMenu={toggleMenu}
                  linkText={"My Account"}
                  hyperLink={"/myaccount"}
                />
                {/*👆 My Account 👆  */}
              </>
            )}
          </List>
          {/* 👇  CART BUTTON👇   */}

          <IconButton sx={{ color: "white" }}>
            <Link href={"/cart"}>
              <ShoppingBagOutlinedIcon sx={{ color: "white" }} />
            </Link>
          </IconButton>
          {/*👆 CART BUTTON 👆  */}
        </Grid>
        {/*👆 grid for topbar right side navlinks and search bar 👆  */}
        {/* ================================================== */}

        {/* 👇 grid for small screen menu👇   */}
        <Grid
          item
          xs={9}
          lg={7}
          sx={{
            // border: "2px solid white",
            height: "100%",
            display: { xs: "flex", md: "none" },
            justifyContent: "right",
            alignContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* 👇 SEARCH BAR 👇   */}
            <AppBarSearch />
            {/*👆 SEARCH BAR👆  */}
            {/* 👇  CART BUTTON👇   */}
            <IconButton sx={{ color: "white", paddingRight: "0px" }}>
              <ShoppingBagOutlinedIcon />
            </IconButton>
            {/*👆 CART BUTTON 👆  */}
            {/* 👇  CART BUTTON👇   */}
            <IconButton onClick={toggleMenu} sx={{ color: "white" }}>
              {openMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            {/*👆 CART BUTTON 👆  */}
          </Box>
          <List
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.7)",
              position: "absolute",
              textAlign: "left",
              top: "80px",
              right: "0px",
              transition: "all 200ms ease",
              width: openMenu ? "100%" : "0px",
              height: "100vh",
              overflow: openMenu ? "visible" : "hidden",
              zIndex: "100",
              "& body": {
                overflow: "hidden",
              },
              // border:"1px solid red"
            }}
          >
            {/* 👇 HOME👇   */}
            <NavMenuItem
              toggleMenu={toggleMenu}
              linkText={"HOME"}
              hyperLink={"/"}
            />
            {/*👆 HOME 👆  */}
            {/* 👇 MY DESIGNS 👇   */}
            <NavMenuItem
              toggleMenu={toggleMenu}
              linkText={"My Designs"}
              hyperLink={"/designs"}
            />

            {/*👆 MY DESIGNS 👆  */}
            {Object.keys(userData).length === 0 ? (
              <>
                {/* 👇 LOG IN 👇   */}
                <NavMenuItem
                  toggleMenu={toggleMenu}
                  handler={toggleLoginModal}
                  linkText={"Log In"}
                />
                {/*👆 LOG IN 👆  */}
                {/* 👇 SIGN UP👇   */}
                <NavMenuItem
                  toggleMenu={toggleMenu}
                  handler={toggleSignupModal}
                  linkText={"Sign Up"}
                />
                {/*👆 SIGN UP 👆  */}
              </>
            ) : (
              <>
                {/* 👇 MY ACCOUNT👇   */}
                <NavMenuItem
                  toggleMenu={toggleMenu}
                  linkText={"My Account"}
                  hyperLink={"/myaccount"}
                />
                {/*👆 MY ACCOUNT 👆  */}
              </>
            )}
          </List>
        </Grid>
        {/*👆 grid for small screen menu 👆  */}
      </Grid>

      <ModalComponent openModal={openLoginModal} toggleModal={toggleLoginModal}>
        <LogIn toggleModal={toggleLoginModal} />
      </ModalComponent>
      <ModalComponent
        openModal={openSignupModal}
        toggleModal={toggleSignupModal}
      >
        <Signup toggleModal={toggleSignupModal} />
      </ModalComponent>
    </AppBar>
  );
};

export default Navbar;
