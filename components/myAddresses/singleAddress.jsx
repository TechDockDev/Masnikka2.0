import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const SingleAddress = ({ address, setAddChangeMode, setEditAddress }) => {
  const deleteAddress = async () => {
    try {
      await axios.delete(`/api/Address/addressUpdate/${address._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const setDefault = async () => {
    try {
      await axios.patch(
        `/api/Address/getDefaultAddress?addressId=${address._id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      mb={2}
      sx={{
        backgroundColor: address.defaultAddress ? "#e6acb6" : "transparent",
        padding: "30px",
        border: "1px solid black",
        borderRadius: "20px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            {address.name} ({address.phoneNumber})
          </Typography>
          <Typography
            sx={{
              mb: 2,
              color: "#3F3F3F",
            }}
          >
            {address.houseNo} {address.address} {address.city} {address.state}{" "}
            {address.country} {address.pinCode}
          </Typography>
        </Box>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-around"}>
            <IconButton
              onClick={() => {
                setAddChangeMode(true);
                setEditAddress({ status: true, addressData: address });
              }}
              sx={{
                color: "#0F6DB1",
              }}
            >
              <FiEdit />
            </IconButton>
            <IconButton
              onClick={deleteAddress}
              sx={{
                color: "#0F6DB1",
              }}
            >
              <RiDeleteBinLine />
            </IconButton>
          </Stack>
          {!address.defaultAddress && (
            <Button
              variant="outlined"
              size="small"
              onClick={setDefault}
              sx={{
                // backgroundColor: "#eb6157",
                // fontWeight: "bold",
                color: "#eb6157",
                mt: 2,
              }}
            >
              Choose Default
            </Button>
          )}
        </Stack>
      </Stack>

      {/* <Divider /> */}
    </Stack>
  );
};

export default SingleAddress;
