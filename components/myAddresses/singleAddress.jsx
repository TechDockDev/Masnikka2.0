import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const SingleAddress = () => {
   return (
      <Stack mb={2}>
         <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography
               variant="h2"
               sx={{
                  fontWeight: "600",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  mb: 1,
               }}>
               John Doe
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
               <IconButton
                  sx={{
                     color: "#0F6DB1",
                  }}>
                  <FiEdit />
               </IconButton>
               <IconButton sx={{
                     color: "#0F6DB1",
                  }}>
                  <RiDeleteBinLine />
               </IconButton>
            </Box>
         </Stack>
         <Typography
            sx={{
               mb: 2,
               color: "#3F3F3F",
            }}>
            645, Area, City, State - 226016
         </Typography>
         <Divider />
      </Stack>
   );
};

export default SingleAddress;
