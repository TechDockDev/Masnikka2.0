import { IconButton, Input, InputAdornment, ListItem } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";

const AppBarSearch = () => {
  return (
    <ListItem disableGutters dense >
    <Input
       fullWidth
       type="text"
       disableUnderline={true}
       sx={{ bgcolor: "white", width: "200px", borderRadius: "5px", paddingX:"4px",}}
       startAdornment={
          <InputAdornment sx={{ bgcolor: "white" }}  position="end">
             <IconButton>
                <SearchIcon />
             </IconButton>
          </InputAdornment>
       }
    />
 </ListItem>
  )
}

export default AppBarSearch