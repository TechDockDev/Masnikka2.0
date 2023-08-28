import {
  Box,
  OutlinedInput,
  FormGroup,
  Grid,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useRouter } from "next/router";

const FiltersSidebar = ({ brands, categories }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState({ lowerLimit: 0, upperLimit: -1 });
  const router = useRouter();
  // console.log("--->", dataFilter);
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  // console.log('filter->', openFilter);
  const filtersData = {
    brands: Object.values(JSON.parse(brands).map((brand) => brand.name)),
    categories: Object.values(
      JSON.parse(categories).map((category) => category.name)
    ),
    sizes: [6, 7, 8, 9, 10, 11],
  };

  return (
    <Grid item xs={12} md={3} lg={2} position={"relative"}>
      <Box display={{ xs: "block", md: "none" }} m={1}>
        <IconButton onClick={toggleFilter} sx={{ cursor: "pointer" }}>
          <FilterAltOutlinedIcon /> Filters
        </IconButton>
      </Box>

      <Stack
        display={{ xs: openFilter ? "block" : "none", md: "block" }}
        sx={{
          border: "1px solid grey",
          borderRadius: "8px",
          height: "fit-content",
          p: 3,
          position: { xs: "absolute", md: "static" },
          bgcolor: "#fff",
          zIndex: "10",
        }}
      >
        {/* 👇  SEARCH BY CATEGORY👇 */}
        <Stack>
          <Typography
            variant="h2"
            fontSize={"22px"}
            fontFamily={"Oswald"}
            mb={1}
          >
            Search by Category
          </Typography>
          <FormGroup>
            {filtersData?.categories?.map((category, categoryIndex) => {
              return (
                <FormControlLabel
                  key={categoryIndex}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      size="small"
                      name={category.split(" ").join("").toLowerCase()}
                      onChange={(e) => {
                        e.target.checked
                          ? setSelectedCategories([
                              ...selectedCategories,
                              e.target.name,
                            ])
                          : setSelectedCategories(
                              selectedCategories.filter(
                                (v) => v !== e.target.name
                              )
                            );
                      }}
                    />
                  }
                  label={category.toUpperCase()}
                />
              );
            })}
          </FormGroup>
        </Stack>
        {/* 👆  SEARCH BY CATEGORY👆 */}

        {/* 👇  BRANDS👇 */}
        <Stack mt={2}>
          <Typography
            variant="h2"
            fontSize={"22px"}
            fontFamily={"Oswald"}
            mb={1}
          >
            Brand
          </Typography>
          <FormGroup>
            {filtersData?.brands?.map((brands, brandsIndex) => {
              return (
                <FormControlLabel
                  key={brandsIndex}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      size="small"
                      name={brands.split(" ").join("").toLowerCase()}
                      onChange={(e) => {
                        e.target.checked
                          ? setSelectedBrands([
                              ...selectedBrands,
                              e.target.name,
                            ])
                          : setSelectedBrands(
                              selectedBrands.filter((v) => v !== e.target.name)
                            );
                      }}
                    />
                  }
                  label={brands.toUpperCase()}
                />
              );
            })}
          </FormGroup>
        </Stack>
        {/* 👆  BRANDS👆 */}
        {/* 👇  SIZES👇 */}
        <Stack mt={2}>
          <Typography
            variant="h2"
            fontSize={"22px"}
            fontFamily={"Oswald"}
            mb={1}
          >
            Size
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {filtersData?.sizes?.map((size, sizeIndex) => {
              return (
                <Grid item xs={4} key={sizeIndex} mt={1}>
                  {selectedSizes.includes(size) ? (
                    <Typography
                      sx={{
                        fontFamily: "Oswald",
                        border: "3px solid black",
                        display: "inline-block",
                        height: "40px",
                        width: "40px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={(e) =>
                        setSelectedSizes(
                          selectedSizes.filter((element) => element !== size)
                        )
                      }
                    >
                      {size}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "Oswald",
                        border: "1px solid grey",
                        display: "inline-block",
                        height: "40px",
                        width: "40px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={(e) =>
                        setSelectedSizes([
                          ...selectedSizes,
                          parseInt(e.target.innerText),
                        ])
                      }
                    >
                      {size}
                    </Typography>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Stack>
        {/* 👆  SIZES👆 */}
        {/* 👇  PRICE👇 */}
        <Stack mt={2}>
          <Typography
            variant="h2"
            fontSize={"22px"}
            fontFamily={"Oswald"}
            mb={1}
          >
            Price Range
          </Typography>
          <Stack>
            <OutlinedInput
              placeholder="MIN"
              size="small"
              type="number"
              onChange={(e) =>
                setPrice({ ...price, lowerLimit: parseInt(e.target.value) })
              }
              inputProps={{
                sx: {
                  textAlign: "center",
                },
              }}
            />
            <OutlinedInput
              sx={{ mt: 1 }}
              placeholder="MAX"
              size="small"
              type="number"
              onChange={(e) =>
                setPrice({ ...price, upperLimit: parseInt(e.target.value) })
              }
              inputProps={{
                sx: {
                  textAlign: "center",
                },
              }}
            />
          </Stack>
        </Stack>
        {/* 👆  PRICE👆 */}
        <Button
          variant="outlined"
          onClick={() => {
            // console.log(dataFilter);
            router.replace({
              pathname: "/",
              query: {
                brands: JSON.stringify(selectedBrands),
                categories: JSON.stringify(selectedCategories),
                sizes: JSON.stringify(selectedSizes),
                price: JSON.stringify(price),
              },
            });
          }}
          sx={{
            border: "2px solid black",
            mt: 2,
            width: "80%",
            height: "50px",
            marginX: "auto",
            borderRadius: "4px",
            fontFamily: "Oswald",
            "&:hover": {
              border: "2px solid black",
            },
          }}
        >
          {" "}
          Apply
        </Button>
      </Stack>
    </Grid>
  );
};

export default FiltersSidebar;
