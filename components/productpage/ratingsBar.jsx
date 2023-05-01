import { LinearProgress, Box, Typography } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
const RatingsBar = ({star, value, reviewCount, color="#48A033"}) => {
   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <Typography fontWeight={"800"} fontSize={"20px"} marginRight={"5px"}> {star}
         </Typography>
            <StarRoundedIcon sx={{marginRight:"30px"}}/>
         <LinearProgress
            variant="determinate"
            value={value}
            sx={{
               width: "100%",
               borderRadius: "20px",
               height: "8px",
               "& .MuiLinearProgress-bar": {
                  bgcolor:color,
               },
            }}
         />
           <Typography  fontSize={"20px"} marginLeft={"30px"} color={"grey"}>{reviewCount}
         </Typography>
      </Box>
   );
};

export default RatingsBar;
