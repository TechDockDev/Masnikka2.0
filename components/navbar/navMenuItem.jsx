import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";

const NavMenuItem = ({ linkText, hyperLink, handler }) => {
   return (
      <ListItem disableGutters dense>
         {handler ? (
             <ListItemButton onClick={handler} disableRipple disableGutters sx={{}}>
             <ListItemText
                primaryTypographyProps={{
                   sx: {
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      letterSpacing: ".08em",
                      fontFamily: "Oswald",
                      textTransform: "uppercase",
                      transition: "all 300ms ease",
                      "&:hover": {
                         color: "red",
                      },
                   },
                }}>
                {linkText}
             </ListItemText>
          </ListItemButton>
         ) : (
            <ListItemButton component={Link} href={hyperLink} disableRipple disableGutters sx={{}}>
               <ListItemText
                  primaryTypographyProps={{
                     sx: {
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: ".08em",
                        fontFamily: "Oswald",
                        textTransform: "uppercase",
                        transition: "all 300ms ease",
                        "&:hover": {
                           color: "red",
                        },
                     },
                  }}>
                  {linkText}
               </ListItemText>
            </ListItemButton>
         )}
      </ListItem>
   );
};

export default NavMenuItem;
