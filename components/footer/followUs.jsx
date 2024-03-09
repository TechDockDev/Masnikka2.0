import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
const FollowUs = () => {
  return (
    <Grid item xs={3}>
      <Typography
        fontFamily={"Oswald"}
        fontSize={"18px"}
        textTransform={"uppercase"}
      >
        Follow us
      </Typography>
      <List disablePadding sx={{ mt: 2 }}>
        {/* facebook */}
        <ListItemButton
          component={Link}
          href="https://facebook.com/masnikka
"
          disableGutters
        >
          <ListItemIcon
            sx={{ color: "white", minWidth: "", paddingRight: "5px" }}
          >
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "#828282",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: ".08em",
                fontFamily: "Oswald",
                textTransform: "uppercase",
                transition: "all 300ms ease",
              },
            }}
          >
            facebook
          </ListItemText>
        </ListItemButton>
        {/* facebook */}
        {/* Twitter */}
        <ListItemButton
          component={Link}
          href="https://x.com/masnikka
"
          disableGutters
        >
          <ListItemIcon
            sx={{ color: "white", minWidth: "", paddingRight: "5px" }}
          >
            <XIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "#828282",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: ".08em",
                fontFamily: "Oswald",
                textTransform: "uppercase",
                transition: "all 300ms ease",
              },
            }}
          >
            X
          </ListItemText>
        </ListItemButton>
        {/* Twitter */}
        {/* instagram */}
        <ListItemButton
          component={Link}
          href="https://instagram.com/masnikka
"
          disableGutters
        >
          <ListItemIcon
            sx={{ color: "white", minWidth: "", paddingRight: "5px" }}
          >
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "#828282",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: ".08em",
                fontFamily: "Oswald",
                textTransform: "uppercase",
                transition: "all 300ms ease",
              },
            }}
          >
            instagram
          </ListItemText>
        </ListItemButton>
        {/* instagram */}
      </List>
    </Grid>
  );
};

export default FollowUs;
