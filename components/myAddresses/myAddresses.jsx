import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SingleAddress from "./singleAddress";
import AddNewAddress from "./addNewAddress";
const MyAddresses = () => {
   const [addChangeMode, setAddChangeMode] = useState(false);
   const addresses = [1, 2, 3, 4, 5, 6];

   const toggleAddChange = () => {
      setAddChangeMode(!addChangeMode);
   };

   return (
      <Grid
         container
        
         sx={{
            height: "fit-content",
            boxSizing: "border-box",
            paddingLeft: { xs: "0px", md: "20px" },
         }}>
         {/* ===👇 Heading👇===*/}
         <Grid item xs={12} mb={2} mt={3} height={"fit-content"}>
            <Typography
               variant="h1"
               sx={{
                  fontSize: "36px",
                  fontFamily: "Oswald",
                  textAlign: "center",
                  mb: 2,
               }}>
               My Addresses
            </Typography>
            <Divider />
         </Grid>
         {/* ===👆 Heading👆 ===*/}
         {!addChangeMode ? (
            <>
               {/* ===👇 ADD A NEW ADDRESS BUTTON👇===*/}
               <Grid
                  item
                  xs={12}
                  sx={{
                     border: "1px solid grey",
                     borderRadius: "8px",
                     padding: "24px 32px",
                     height: "fit-content",
                  }}>
                  <Button
                     onClick={toggleAddChange}
                     sx={{
                        color: "#0F6DB1",
                        fontWeight: "600",
                        fontSize: "16px",
                        "&:hover": {
                           bgcolor: "white",
                        },
                     }}>
                     <AddIcon /> ADD A NEW ADDRESS
                  </Button>
               </Grid>
               {/* ===👆 ADD A NEW ADDRESS BUTTON👆 ===*/}
            </>
         ) : (
            <AddNewAddress toggleAddChange={toggleAddChange} />
         )}
         {/* ===👇 Addresses Box👇===*/}
         <Grid
            mt={4}
            item
            xs={12}
            sx={{
               border: "1px solid grey",
               borderRadius: "8px",
               padding: "24px 32px",
               height: "fit-content",
            }}>
            {addresses.map((address, index) => {
               return <SingleAddress key={index} />;
            })}
         </Grid>
         {/* ===👆 Addresses Box👆 ===*/}
      </Grid>
   );
};

export default MyAddresses;
