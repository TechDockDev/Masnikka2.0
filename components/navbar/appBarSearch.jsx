import { IconButton, Input, InputAdornment, ListItem } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";

const AppBarSearch = () => {
  return (
    <ListItem disableGutters dense >
    <Input
       type="text"
       disableUnderline={true}
       sx={{ bgcolor: "white", width:{xs:"150px" ,sm:"200px"}, borderRadius: "5px", paddingX:"4px",}}
       startAdornment={
          <InputAdornment sx={{ bgcolor: "white" }}  position="start">
             <IconButton sx={{padding:"0px 0px 0px 5px"}}>
                <SearchIcon />
             </IconButton>
          </InputAdornment>
       }
    />
 </ListItem>
  )
}

export default AppBarSearch