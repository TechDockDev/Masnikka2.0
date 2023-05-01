import { Box, OutlinedInput, FormGroup, Grid, Stack, Typography, FormControlLabel, Checkbox, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";




const FiltersSidebar = () => {
   const [dataFilter, setDataFilter] = useState({});
   const [openFilter, setOpenFilter] = useState(false);

   const handleChange = (e, index) => {
      setDataFilter({ ...dataFilter, [e.target.name]: e.target.checked });
   };
   // console.log("--->", dataFilter);

   const toggleFilter = () => {
      setOpenFilter(!openFilter);
   };
   // console.log('filter->', openFilter);

   const filtersData = {
      brands: ["DIESEL", "TIMBERLAND", "Converse", "REEBok", "AIR JORDAN", "ADIDAS", "NEW BALANCE", "NIke"],
      categories: ["Sports", "HIGH TOP", "CASUAL", "MOUNTAIN"],
      sizes: [6, 7, 8, 9, 10, 11],
   };

   return (
      <Grid item xs={12} md={3} lg={2}  position={"relative"}>
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
               position:{xs:"absolute", md:"static"},
               bgcolor:"#fff",
               zIndex:"10",             
            }}>
            {/* 👇  SEARCH BY CATEGORY👇 */}
            <Stack>
               <Typography variant="h2" fontSize={"22px"} fontFamily={"Oswald"} mb={1}>
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
                           control={<Checkbox size="small" name={category.split(" ").join("").toLowerCase()} onChange={(e) => handleChange(e, categoryIndex)} />}
                           label={category.toUpperCase()}
                        />
                     );
                  })}
               </FormGroup>
            </Stack>
            {/* 👆  SEARCH BY CATEGORY👆 */}
            {/* 👇  BRANDS👇 */}
            <Stack mt={2}>
               <Typography variant="h2" fontSize={"22px"} fontFamily={"Oswald"} mb={1}>
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
                           control={<Checkbox size="small" name={brands.split(" ").join("").toLowerCase()} onChange={(e) => handleChange(e, brandsIndex)} />}
                           label={brands.toUpperCase()}
                        />
                     );
                  })}
               </FormGroup>
            </Stack>
            {/* 👆  BRANDS👆 */}
            {/* 👇  SIZES👇 */}
            <Stack mt={2}>
               <Typography variant="h2" fontSize={"22px"} fontFamily={"Oswald"} mb={1}>
                  Size
               </Typography>
               <Grid
                  container
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-around",
                     flexWrap: "wrap",
                  }}>
                  {filtersData?.sizes?.map((size, sizeIndex) => {
                     return (
                        <Grid item xs={4} key={sizeIndex} mt={1}>
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
                              }}>
                              {size}
                           </Typography>
                        </Grid>
                     );
                  })}
               </Grid>
            </Stack>
            {/* 👆  SIZES👆 */}
            {/* 👇  PRICE👇 */}
            <Stack mt={2}>
               <Typography variant="h2" fontSize={"22px"} fontFamily={"Oswald"} mb={1}>
                  Price Range
               </Typography>
               <Stack>
                  <OutlinedInput
                     placeholder="MIN"
                     size="small"
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
               }}>
               {" "}
               Apply
            </Button>
         </Stack>
      </Grid>
   );
};

export default FiltersSidebar;
