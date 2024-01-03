import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import SingleDesign from "./singleDesign";
import { useRouter } from "next/router";

const MyDesigns = ({ customize, productCount }) => {
  const router = useRouter();
  return (
    <Stack paddingX="15px" position={"relative"}>
      <Grid
        container
        display="flex"
        justifyContent={{ xs: "center", sm: "space-between" }}
        sx={{
          boxSizing: "border-box",
          paddingLeft: { xs: "0px", md: "20px" },
        }}
      >
        <Grid item xs={12} mb={2} mt={3}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "36px",
              fontFamily: "Oswald",
              textAlign: "center",
              mb: 2,
            }}
          >
            Designs
          </Typography>
          <Divider />
        </Grid>
        {JSON.parse(customize).map((product) => (
          <SingleDesign product={product} key={product._id} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(productCount / 10)}
        onChange={(e, value) => {
          router.replace({
            pathname: "/designs",
            query: {
              page: value,
            },
          });
        }}
        color="primary"
        sx={{ marginX: "auto" }}
      />
    </Stack>
  );
};

export default MyDesigns;
