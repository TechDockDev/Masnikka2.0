import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useRouter } from "next/router";

import {
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import S3Image from "@/lib/getImage";

function debounce(fn) {
  let timer;
  return function (args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, 2000);
  };
}

export default function ComboBox() {
  const router = useRouter();
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  async function getProducts(query) {
    try {
      const res = await axios.get(`/api/products/search?query=${query}`);
      setOptions(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }
  const debouncedSearch = debounce(getProducts);
  return (
    <Autocomplete
      onInputChange={async (event, value) => {
        if (value) {
          debouncedSearch(value);
        }
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      disablePortal
      id="combo-box-demo"
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={options}
      clearOnBlur={true}
      getOptionLabel={(option) => option.name}
      freeSolo
      noOptionsText={"No Products found"}
      renderOption={(props, option) => {
        return (
          <Stack
            direction={"row"}
            {...props}
            onClick={() => {
              router.push(`/productpage/${option._id}`);
              setOpen(false);
            }}
          >
            <S3Image
              imgKey={option.productColor[0]?.productPhotos?.thumbnailImg}
              style={{ width: 50, marginRight: "10px" }}
            />

            <Typography>{option.name}</Typography>
          </Stack>
        );
      }}
      renderInput={(params) => {
        return (
          <ListItem disableGutters dense>
            <TextField
              {...params}
              placeholder="Search"
              type="text"
              sx={{
                bgcolor: "white",
                width: { xs: "150px", sm: "200px" },
                borderRadius: "5px",
                // paddingX: "4px",
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment sx={{ bgcolor: "white" }} position="start">
                    <IconButton sx={{ padding: "0px 0px 0px 5px" }}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: <React.Fragment></React.Fragment>,
              }}
            />
          </ListItem>
        );
      }}
    />
  );
}
