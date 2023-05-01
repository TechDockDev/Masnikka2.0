import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import SingleReview from "./singleReview";

const ProductReviews = () => {
   return (
      <Stack mt={3}>
         <Typography variant="h1" fontSize={"30px"} fontWeight={"400"} fontFamily={"Oswald"}>
            Product Reviews
         </Typography>
         <Divider sx={{ color: "#C4C4C4", borderBottomWidth: "1px", mt: 2 }} />
         <SingleReview />
         <Typography component={"a"} fontSize={"12px"} fontWeight={"400"} fontFamily={"Oswald"} sx={{
            textDecoration:"underline", cursor:"pointer"
         }}>
         View All Reviews
         </Typography>
      </Stack>
   );
};

export default ProductReviews;
