import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const ProductDescription = () => {
  return (
   <Stack mt={3}>
    <Typography variant='h1' fontSize={"30px"} fontWeight={"400"} fontFamily={"Oswald"}>Product Description</Typography>
    <Divider sx={{color:"#C4C4C4",borderBottomWidth:"1px", mt:2}}/>
    <Typography  fontSize={"16px"} fontWeight={"600"} fontFamily={"Oswald"} mt={2} >About product</Typography>
    <Typography  fontSize={"16px"} fontWeight={"400"}  mt={2} >NIKE REVOLUTION 6 NN debuted in 1989 and was designed by Tinker Hatfield. It features lightweight netting and plastic wings on the upper as well as visible Max Air. The original colorways of the Nike Revolution 6 NN are ‘White/Cement,’ ‘Bred,’ ‘Military,’ and ‘Fire Red'. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula lorem quis tellus interdum rutrum. Maecenas facilisis lacinia efficitur. Suspendisse ut lacus eget lacus aliquet sollicitudin non vitae massa.</Typography>
   </Stack>
  )
}

export default ProductDescription