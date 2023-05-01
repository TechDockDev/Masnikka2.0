import { Grid, Stack,Pagination } from "@mui/material";
import React from "react";
import FiltersSidebar from "./filtersSidebar";
import SingleProduct from "../singleProduct";

const BrowseProducts = () => {
   const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   return (
      <Stack mt={3} >
         <Grid container >
            {/* 👇  side bar for FILTER products 👇 */}
            <FiltersSidebar />
            {/* 👆  side bar for FILTER products 👆 */}
            {/* 👇  PRODUCTS container 👇 */}
            <Grid item container xs={12} md={9} lg={10}   display="flex" justifyContent={{xs:"center",sm:"space-between"}} sx={{
               // borderLeft:"1px solid grey",
               boxSizing:"border-box",
               paddingLeft:{xs:"0px",md:"20px",}
             
            }}>
               {products.map((product) => {
                  return <SingleProduct key={product} />;
               })}
            </Grid>
            {/* 👆  PRODUCTS container 👆 */}
            {/* 👇  PAGINATION 👇 */}
            <Grid item container xs={12} md={9} lg={10}  mt={3} mb={3}  display="flex" justifyContent={{xs:"center",sm:"space-between"}} sx={{
               // borderLeft:"1px solid grey",
               boxSizing:"border-box",
               paddingLeft:{xs:"0px",md:"20px",},
               marginLeft:"auto"
            }}>
              <Pagination count={10} color="secondary" sx={{marginX:"auto"}}/>
            </Grid>
            {/* 👆  PAGINATION 👆 */}
         </Grid>
      </Stack>
   );
};

export default BrowseProducts;
