import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
   return (
      <Stack
         sx={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 20px",
         }}>
         <Typography
            variant="h1"
            sx={{
               fontSize: "36px",
               fontFamily: "Oswald",
               textAlign: "center",
               mt: 2,
            }}>
            Profile
         </Typography>
         <Box
            sx={{
               border: "1px solid grey",
               borderRadius: "8px",
               mt: 2,
               padding: "20px 40px",
            }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} p={2}>
               <Avatar sx={{ width: "100px", height: "100px" }} />
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
               <Typography textTransform={"uppercase"}>NAME:</Typography>
               <Typography fontWeight={600} ml={2} textTransform={"uppercase"}>
                  John Doe
               </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} mt={1}>
               <Typography textTransform={"uppercase"}>Email:</Typography>
               <Typography fontWeight={600} ml={2} textTransform={"uppercase"}>
                  johndoe@mail.com
               </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} mt={1}>
               <Typography textTransform={"uppercase"}>Mobile:</Typography>
               <Typography fontWeight={600} ml={2} textTransform={"uppercase"}>
                  8876545677323546
               </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} mt={1}>
               <Typography textTransform={"uppercase"}>Password:</Typography>
               <Typography fontWeight={600} ml={2} textTransform={"uppercase"}>
                  ************
               </Typography>
            </Stack>
         </Box>
      </Stack>
   );
};

export default Profile;
