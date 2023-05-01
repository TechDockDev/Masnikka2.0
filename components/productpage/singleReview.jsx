import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const SingleReview = () => {
   return (
      <Stack mt={3}>
         <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight={"800"} fontSize={"20px"} marginRight={"5px"} sx={{
             display: "flex", justifyContent: "center", alignItems: "center", fontFamily:"Oswald", color:"white", bgcolor:"#FFA41C", padding:"5px 10px", borderRadius:"8px"   
            }}>
               5.0
               <StarRoundedIcon  />
            </Typography>
            <Typography variant="h3" fontSize={"18px"} fontWeight={"400"} fontFamily={"Oswald"}>
               Ashish Saxena
            </Typography>
         </Box>

         <Typography fontSize={"16px"}  mt={2} color={"grey"}>
            Superb product, very comfortable in wearing and looks so good
         </Typography>
         <Divider sx={{ color: "#C4C4C4", borderBottomWidth: "1px", mt: 2 }} />
      </Stack>
   );
};

export default SingleReview;
