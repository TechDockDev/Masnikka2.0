import { Button, Stack, Grid, Typography, Divider } from "@mui/material";
import React, { useEffect } from "react";
import AddressInput from "./addressInput";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const AddNewAddress = ({ toggleAddChange, editAddress, setEditAddress }) => {
  const router = useRouter();
  const [addressData, setAddressData] = useState({
    name: "",
    phoneNumber: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const handleAddChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editAddress.status) {
        // edit address
        res = await axios.patch(
          `/api/Address/addressUpdate/${editAddress.addressData._id}`,
          addressData
        );
      } else {
        res = await axios.post("/api/Address/addressInfo", addressData);
      }
      console.log(res);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (editAddress.status) {
      setAddressData(editAddress.addressData);
    }
  }, [editAddress.status]);

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
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "22px",
            fontFamily: "Oswald",
            mb: 2,
          }}
        >
          Add a New Address
        </Typography>
        {/* ===👇 NAME for address 👇===*/}

        <AddressInput
          labelText={"Name"}
          type={"text"}
          name={"name"}
          value={addressData.name}
          id={"name"}
          onChange={handleAddChange}
          placeHolder={"Your Full Name"}
          required={true}
        />
        {/* ===👆 NAME for address 👆 ===*/}
        {/* ===👇 Mobile No. 👇===*/}

        <AddressInput
          labelText={"Mobile No."}
          type={"number"}
          name={"phoneNumber"}
          value={addressData.phoneNumber}
          id={"mobile"}
          onChange={handleAddChange}
          placeHolder={"Your Mobile Number"}
          required={true}
        />
        {/* ===👆 Mobile No. 👆 ===*/}

        {/* ===👇 ZIP/Postal Code 👇===*/}

        <AddressInput
          labelText={"ZIP/Postal Code"}
          type={"number"}
          name={"pinCode"}
          value={addressData.pinCode}
          id={"zipCode"}
          onChange={handleAddChange}
          placeHolder={"ZIP Code"}
          required={false}
        />
        {/* ===👆 ZIP/Postal Code 👆 ===*/}
        {/* ===👇 Street  👇===*/}

        <AddressInput
          labelText={"Street"}
          type={"text"}
          name={"address"}
          value={addressData.address}
          id={"street"}
          onChange={handleAddChange}
          placeHolder={"Street Address"}
          required={true}
        />
        {/* ===👆 Street 👆 ===*/}
        {/* ===👇 City  👇===*/}

        <AddressInput
          labelText={"City"}
          type={"text"}
          name={"city"}
          value={addressData.city}
          id={"city"}
          onChange={handleAddChange}
          placeHolder={"City Name"}
          required={true}
        />
        {/* ===👆 City 👆 ===*/}
        {/* ===👇 State/Province   👇===*/}

        <AddressInput
          labelText={"State/Province "}
          type={"text"}
          name={"state"}
          value={addressData.state}
          id={"state"}
          onChange={handleAddChange}
          placeHolder={"State Name"}
          required={true}
        />
        {/* ===👆 State/Province  👆 ===*/}
        {/* ===👇 Country    👇===*/}

        <AddressInput
          labelText={"Country "}
          type={"text"}
          name={"country"}
          value={addressData.country}
          id={"country"}
          onChange={handleAddChange}
          placeHolder={"Country Name"}
          required={true}
        />
        {/* ===👆 Country   👆 ===*/}

        <Stack mt={2} mb={1} direction={"row"}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontFamily: "Oswald",
              padding: "10px 20px",
              mr: 2,
            }}
          >
            {!editAddress.status ? "Save" : "Update"}
          </Button>
          <Button
            onClick={() => {
              toggleAddChange();
              setEditAddress({ status: false, addressData: {} });
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default AddNewAddress;
