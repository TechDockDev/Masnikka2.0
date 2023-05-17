import React from "react";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import PriceDetails from "../shoppingCart/priceDetails";
import AddressSingle from "./addressSingle";
import AddIcon from "@mui/icons-material/Add";
import NewAddress from "./NewAddress";
import { useState } from "react";

const AddressCheckout = () => {
   const [addChangeMode, setAddChangeMode] = useState(false);
   const toggleAddChange = () => {
      setAddChangeMode(!addChangeMode);
   };
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Grid
            container
            display="flex"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
               boxSizing: "border-box",
            }}>
            {/* === 👇 heading 👇 ===*/}
            <Grid item xs={12} mb={2} mt={3}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "36px",
                     fontFamily: "Oswald",
                     textAlign: "center",
                     mb: 2,
                  }}>
                  ADDRESS
               </Typography>
               <Divider />
            </Grid>
            {/* === 👆 heading 👆 ===*/}

            <Grid item xs={12} md={8}  sx={{ borderRadius: "8px", boxSizing: "border-box",  }}>
               <Typography variant="h2" sx={{fontFamily:"Oswald", fontSize:"24px"}}>Delivery Address</Typography>
               <Stack sx={{border:"1px solid grey", borderRadius:"8px",padding:"20px", mt:2}}>
                <AddressSingle/>
                <AddressSingle/>
                <AddressSingle/>
                <AddressSingle/>
                <AddressSingle/>
                <AddressSingle/>
                <AddressSingle/>
               </Stack>
               {/* ===👇 ADD A NEW ADDRESS BUTTON👇===*/}
           { !addChangeMode ?  <Stack
                 
                  sx={{
                     border: "1px solid grey",
                     borderRadius: "8px",
                     padding: "24px 32px",
                     height: "fit-content",
                     mt:3
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
               </Stack> :
               <NewAddress toggleAddChange={toggleAddChange}/>}
               {/* ===👆 ADD A NEW ADDRESS BUTTON👆 ===*/}
               
            </Grid>
            <Grid item xs={12} md={3.8} paddingY={"45px"} sx={{ boxSizing: "border-box" }}>
               <PriceDetails />
            </Grid>
             
         </Grid>
      </Stack>
   );
};

export default AddressCheckout;
