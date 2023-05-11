import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import SingleDesign from "./singleDesign";

const MyDesigns = () => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Grid
            //  item
            container
            //  xs={12}
            //  md={9}
            //  lg={10}
            display="flex"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
               boxSizing: "border-box",
               paddingLeft: { xs: "0px", md: "20px" },
            }}>
            <Grid item xs={12} mb={2} mt={3}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "36px",
                     fontFamily: "Oswald",
                     textAlign: "center",
                     mb: 2,
                  }}>
                 Designs
               </Typography>
               <Divider />
            </Grid>
               <SingleDesign />
               <SingleDesign />
               <SingleDesign />
               <SingleDesign />
               <SingleDesign />
               <SingleDesign />
         </Grid>
         <Pagination count={10} color="primary" sx={{marginX:"auto"}}/>
      </Stack>
   );
};

export default MyDesigns;
