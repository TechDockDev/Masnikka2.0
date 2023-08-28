import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const ProductDescription = (props) => {
  return (
   <Stack mt={3}>
    <Typography variant='h1' fontSize={"30px"} fontWeight={"400"} fontFamily={"Oswald"}>Product Description</Typography>
    <Divider sx={{color:"#C4C4C4",borderBottomWidth:"1px", mt:2}}/>
    <Typography  fontSize={"16px"} fontWeight={"600"} fontFamily={"Oswald"} mt={2} >About product</Typography>
    <Typography  fontSize={"16px"} fontWeight={"400"}  mt={2} >{props.ProductDescription}</Typography>
   </Stack>
  )
}

export default ProductDescription