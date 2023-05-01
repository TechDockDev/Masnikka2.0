import { Stack } from "@mui/material";
import React from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

const Layout = ({ children }) => {
   return (
      <Stack maxWidth="xl" margin={"auto"} minHeight={"100vh"} boxSizing={"border-box"}
      paddingTop="80px"
      >
         <Navbar/>
         {children}
         <Footer/>
      </Stack>
   );
};

export default Layout;
