import { Button, Stack, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import { useState } from "react";
import AddressInput from "../myAddresses/addressInput";

const NewAddress = ({ toggleAddChange }) => {
   const [addressData, setAddressData] = useState({ name: "", mobile: "", zipCode: "", street: "", city: "", state: "", country: "" });
   const handleAddChange = (e) => {
      setAddressData({ ...addressData, [e.target.name]: e.target.value });
   };

   const handleAddSubmit = (e) => {
      e.preventDefault();
      console.log(addressData);
   };
   return (
      <>
         <Grid
            onSubmit={handleAddSubmit}
            component={"form"}
            // mt={4}
            item
            xs={12}
            sx={{
               border: "1px solid grey",
               borderRadius: "8px",
               padding: "24px 32px",
               height: "fit-content",
               mt:3
            }}>
            <Typography
               variant="h2"
               sx={{
                  fontSize: "22px",
                  fontFamily: "Oswald",
                  mb: 2,
               }}>
               Add a New Address
            </Typography>
            {/* ===👇 NAME for address 👇===*/}

            <AddressInput labelText={"Name"} type={"text"} name={"name"} value={addressData.name} id={"name"} onChange={handleAddChange} placeHolder={"Your Full Name"} required={true} />
            {/* ===👆 NAME for address 👆 ===*/}
            {/* ===👇 Mobile No. 👇===*/}

            <AddressInput labelText={"Mobile No."} type={"number"} name={"mobile"} value={addressData.mobile} id={"mobile"} onChange={handleAddChange} placeHolder={"Your Mobile Number"} required={true} />
            {/* ===👆 Mobile No. 👆 ===*/}
            {/* ===👇 ZIP/Postal Code 👇===*/}

            <AddressInput labelText={"ZIP/Postal Code"} type={"number"} name={"zipCode"} value={addressData.zipCode} id={"zipCode"} onChange={handleAddChange} placeHolder={"ZIP Code"} required={false} />
            {/* ===👆 ZIP/Postal Code 👆 ===*/}
            {/* ===👇 Street  👇===*/}

            <AddressInput labelText={"Street"} type={"text"} name={"street"} value={addressData.street} id={"street"} onChange={handleAddChange} placeHolder={"Street Address"} required={true} />
            {/* ===👆 Street 👆 ===*/}
            {/* ===👇 City  👇===*/}

            <AddressInput labelText={"City"} type={"text"} name={"city"} value={addressData.city} id={"city"} onChange={handleAddChange} placeHolder={"City Name"} required={true} />
            {/* ===👆 City 👆 ===*/}
            {/* ===👇 State/Province   👇===*/}

            <AddressInput labelText={"State/Province "} type={"text"} name={"state"} value={addressData.state} id={"state"} onChange={handleAddChange} placeHolder={"State Name"} required={true} />
            {/* ===👆 State/Province  👆 ===*/}
            {/* ===👇 Country    👇===*/}

            <AddressInput labelText={"Country "} type={"text"} name={"country"} value={addressData.country} id={"country"} onChange={handleAddChange} placeHolder={"Country Name"} required={true} />
            {/* ===👆 Country   👆 ===*/}

            <Stack mt={2} mb={1} direction={"row"}>
               <Button
                  variant="contained"
                  type="submit"
                  sx={{
                     fontFamily: "Oswald",
                     padding: "10px 20px",
                     mr:2
                  }}>
                SAVE & DELIVER HERE
               </Button>
               <Button onClick={toggleAddChange}>Cancel</Button>
            </Stack>
         </Grid>
      </>
   );
};

export default NewAddress;
