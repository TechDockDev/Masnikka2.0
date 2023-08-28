import { Grid, List, Typography } from '@mui/material'
import React from 'react'
import SingleLink from './singleLink'

const MenuFooter = () => {
  return (
    <Grid item xs={3}>
    <Typography fontFamily={"Oswald"} fontSize={"18px"} textTransform={"uppercase"}>
       Menu
    </Typography>
    <List disablePadding sx={{mt:2}}>
       <SingleLink linkText={"ABOUT US"} hyperLink={"/about"}/>
       <SingleLink linkText={"My account"} hyperLink={"/myaccount"}/>
       <SingleLink linkText={"Order history"} hyperLink={"/orders"}/>
       <SingleLink linkText={"my wishlist"} hyperLink={"/wishlist"}/>
       <SingleLink linkText={"login"} hyperLink={"/"}/>
    </List>
 </Grid>
  )
}

export default MenuFooter