"useServer"
import { Grid, Stack,Pagination } from "@mui/material";
import React from "react";
import FiltersSidebar from "./filtersSidebar";
import SingleProduct from "../singleProduct";

const BrowseProducts = ( {products}) => {
   console.log('product-->', products);
   
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
               {products.map((product, index) => {
                  return <SingleProduct key={index} product={product}/>;
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
              <Pagination count={10} color="primary" sx={{marginX:"auto"}}/>
            </Grid>
            {/* 👆  PAGINATION 👆 */}
         </Grid>
      </Stack>
   );
};

export default BrowseProducts;

