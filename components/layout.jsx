'use client';
import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Layout = ({ children }) => {
   const {openSnackbar, message,closeSnackbar, severity} = useContext(AppContext)
   return (
      <Stack maxWidth="xl" margin={"auto"} minHeight={"100vh"} boxSizing={"border-box"}
      paddingTop="80px"
      >
         <Navbar/>
         <Snackbar
         anchorOrigin={{ vertical:"top", horizontal:"center" }}
         open={openSnackbar} 
         autoHideDuration={1000} 
         key={"topcenter"}
         onClose={closeSnackbar}
         >
               <Alert severity={severity} sx={{ width: "100%" }}>
                  {message}
               </Alert>
            </Snackbar>
         {children}
         <Footer/>
      </Stack>
   );
};

export default Layout;
