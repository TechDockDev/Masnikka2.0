import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ContactUs = () => {
  const styles = {
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: ".08em",
    fontFamily: "Oswald",
    textTransform: "uppercase",
    transition: "all 300ms ease",
    mt: 1,
  };
  return (
    <Grid item xs={3}>
      <Typography
        fontFamily={"Oswald"}
        fontSize={"18px"}
        textTransform={"uppercase"}
      >
        Contact Us
      </Typography>
      <Box mt={2}>
        {/* ====Address===== */}

        <Typography
          sx={{
            ...styles,
            color: "#fff",
          }}
        >
          Address :
        </Typography>
        <Typography
          sx={{
            ...styles,
            color: "#828282",
          }}
        >
          Central Park400 16th Rd, Randjespark, Midrand, 1685
        </Typography>
        {/* =====Address======= */}
        {/* =====Phone======= */}
        <Typography
          sx={{
            ...styles,
            color: "#fff",
          }}
        >
          Phone :
        </Typography>
        <Typography
          sx={{
            ...styles,
            color: "#828282",
          }}
        >
          (123) 456-7890
        </Typography>
        {/* ======Phone====== */}
        {/* =======Email===== */}
        <Typography
          sx={{
            ...styles,
            color: "#fff",
          }}
        >
          Email :
        </Typography>
        <Typography
          sx={{
            ...styles,
            color: "#828282",
          }}
        >
          mail@example.com
        </Typography>
        {/* ======Email====== */}
        {/* =====  working days/hours======= */}
        <Typography
          sx={{
            ...styles,
            color: "#fff",
          }}
        >
          working days/hours
        </Typography>
        <Typography
          sx={{
            ...styles,
            color: "#828282",
          }}
        >
          mon - Sun / 9:00 am - 8:00 PM
        </Typography>
        {/* ===== working days/hours======= */}
      </Box>
    </Grid>
  );
};

export default ContactUs;
