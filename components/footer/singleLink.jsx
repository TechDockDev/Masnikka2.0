import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";

const SingleLink = ({ linkText, hyperLink }) => {
   return (
      <ListItem disablePadding disableGutters dense>
         <ListItemButton component={Link} href={hyperLink} disableRipple disableGutters sx={{}}>
            <ListItemText
               primaryTypographyProps={{
                  sx: {
                    color:"#828282",
                     fontSize: "14px",
                     fontWeight: "500",
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
      </ListItem>
   );
};

export default SingleLink;
