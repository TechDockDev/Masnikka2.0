import React, { useContext, useState } from "react";
import Layout from "./layout";
import { usePathname } from "next/navigation";
import {
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Backdrop,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useRouter } from "next/router";
import { AppContext } from "@/context/AppContext";
const MyAccountLayout = ({ children }) => {
  const pathname = usePathname();
  const [openmenu, setOpenmenu] = useState(false);
  const { setUserData } = useContext(AppContext);
  const router = useRouter();
  const toggleMenu = () => {
    setOpenmenu(!openmenu);
  };
  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setUserData({});
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack paddingX="15px" position={"relative"} mb={2} direction={"row"}>
        <Backdrop
          sx={{
            color: "#fff",
            display: { xs: "block", md: "none", zIndex: 10 },
          }}
          open={openmenu}
          onClick={toggleMenu}
        />
        <IconButton
          onClick={toggleMenu}
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: "50px",
            zIndex: 100,
          }}
        >
          {openmenu ? <CloseIcon sx={{ color: "white" }} /> : <MenuIcon />}
        </IconButton>
        <List
          sx={{
            width: { xs: openmenu ? "250px" : "0px", md: "250px" },
            position: { xs: "absolute", md: "static" },
            border: {
              xs: !openmenu ? "none" : "1px solid grey",
              md: "1px solid grey",
            },
            borderRadius: "8px",
            marginTop: "100px",
            bgcolor: "white",
            top: "-10px",
            transition: "all 300ms ease-in-out",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {/* 👇 Profile 👇   */}
          <ListItemButton
            component={Link}
            href="/myaccount"
            disableRipple
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/profile.svg" alt="" />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{
                sx: {
                  color: pathname.includes("/myaccount")
                    ? "black"
                    : "rgba(63, 63, 63, 0.8)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                },
              }}
            />
          </ListItemButton>
          {/*👆  Profile   👆  */}
          {/* 👇 MY ORDERS  👇   */}
          <ListItemButton
            component={Link}
            href="/orders"
            disableRipple
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/orders.svg" alt="" />
            </ListItemIcon>
            <ListItemText
              primary="My Orders"
              primaryTypographyProps={{
                sx: {
                  color: pathname.includes("/orders")
                    ? "black"
                    : "rgba(63, 63, 63, 0.8)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                },
              }}
            />
          </ListItemButton>
          {/*👆  MY ORDERS   👆  */}
          {/* 👇 MY WISHLIST  👇   */}
          <ListItemButton
            component={Link}
            href="/wishlist"
            disableRipple
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/wishlist.svg" alt="" />
            </ListItemIcon>
            <ListItemText
              primary="My Wishlist"
              primaryTypographyProps={{
                sx: {
                  color: pathname.includes("/wishlist")
                    ? "black"
                    : "rgba(63, 63, 63, 0.8)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                },
              }}
            />
          </ListItemButton>
          {/*👆  MY WISHLIST   👆  */}
          {/* 👇 MY ADDRESSES  👇   */}
          <ListItemButton
            component={Link}
            href="/addresses"
            disableRipple
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/address.svg" alt="" />
            </ListItemIcon>
            <ListItemText
              primary="MY ADDRESSES"
              primaryTypographyProps={{
                sx: {
                  color: pathname.includes("/addresses")
                    ? "black"
                    : "rgba(63, 63, 63, 0.8)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                },
              }}
            />
          </ListItemButton>
          {/*👆  MY ADDRESSES   👆  */}
          {/* 👇 FAQs  👇   */}
          {/* <ListItemButton
            component={Link}
            href="/faqs"
            disableRipple
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/faq.svg" alt="" />
            </ListItemIcon>
            <ListItemText
              primary="FAQs"
              primaryTypographyProps={{
                sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600" },
              }}
            />
          </ListItemButton> */}
          {/*👆   FAQs   👆  */}
          {/* 👇 Logout  👇   */}
          <ListItemButton
            disableRipple
            onClick={logout}
            sx={{
              marginTop: "10px",
              paddingX: "25px",
              "&:hover": {
                bgcolor: " #E6F1FA",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <img src="/assets/logout.svg" alt="logout" />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                sx: {
                  color: "rgba(63, 63, 63, 0.8)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                },
              }}
            />
          </ListItemButton>
          {/*👆   Logout  👆  */}
        </List>
        {children}
      </Stack>
    </Layout>
  );
};

export default MyAccountLayout;
