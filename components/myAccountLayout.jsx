import React from "react";
import Layout from "./layout";
import { Stack, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const MyAccountLayout = ({children}) => {
   return (
      <Layout>
         <Stack paddingX="15px" position={"relative"} mb={2} direction={"row"}>
            <List sx={{ width: "250px", border: "1px solid grey", borderRadius: "8px", marginTop: "100px"  }}>
               {/* 👇 Profile 👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/profile.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Profile" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆  Profile   👆  */}
               {/* 👇 MY ORDERS  👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/orders.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆  MY ORDERS   👆  */}
               {/* 👇 MY WISHLIST  👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/wishlist.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="My Wishlist" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆  MY WISHLIST   👆  */}
               {/* 👇 MY ADDRESSES  👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/contact.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="MY ADDRESSES" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆  MY ADDRESSES   👆  */}
               {/* 👇 FAQs  👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/faq.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="FAQs" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆   FAQs   👆  */}
               {/* 👇 Logout  👇   */}
               <ListItemButton
                  disableRipple
                  sx={{
                    marginTop:"10px",
                    paddingX:"25px",
                     "&:hover": {
                        bgcolor: " #E6F1FA",
                        borderRadius: "8px",
                     },
                  }}>
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                     <img src="/assets/logout.svg" alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" primaryTypographyProps={{ sx: { color: "rgba(63, 63, 63, 0.8)", fontWeight: "600", textTransform: "uppercase" } }} />
               </ListItemButton>
               {/*👆   Logout  👆  */}
            </List>
            {children}
         </Stack>
      </Layout>
   );
};

export default MyAccountLayout;
