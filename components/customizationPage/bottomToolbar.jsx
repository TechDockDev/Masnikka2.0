import React from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import AbcIcon from "@mui/icons-material/Abc";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { IoShapes } from "react-icons/io5";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const BottomToolbar = ({ addText, addImage, addShape }) => {
  
   
   return (
      <Stack>
         <Box paddingTop={"20px"} sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* 👇 color button 👇 */}
            <IconButton
               disableRipple
               sx={{
                  borderRadius: "0px",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  "&:hover": {
                     color: "black",
                     borderBottom: "2px solid black",
                  },
               }}>
               <PaletteIcon /> <Typography paddingX="10px">Color</Typography>
            </IconButton>
            {/* 👆color button 👆*/}
            {/* 👇  Add text button 👇 */}
            <IconButton
               onClick={() => {
                  addText();
               }}
               disableRipple
               sx={{
                  borderRadius: "0px",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  "&:hover": {
                     color: "black",
                     borderBottom: "2px solid black",
                  },
               }}>
               <AbcIcon /> <Typography paddingX="10px">Text</Typography>
            </IconButton>
            {/* 👆 Add text button 👆*/}
            {/* 👇  Add Photo 🖼️🖼️ button 👇 */}
            <IconButton
               component={"label"}
               disableRipple
               sx={{
                  borderRadius: "0px",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  "&:hover": {
                     color: "black",
                     borderBottom: "2px solid black",
                  },
                  "& input": {
                     display: "none",
                  },
               }}>
               <input type="file" onChange={addImage} accept=".png, .svg, .jpeg, .jpg" />
               <PhotoLibraryIcon /> <Typography paddingX="10px">Photo</Typography>
               {/* 👆 Add Photo 🖼️🖼️ button 👆*/}
            </IconButton>
            {/* 👇  Add Shapes button 👇 */}
            <IconButton
               onClick={addShape}
               disableRipple
               sx={{
                  borderRadius: "0px",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  "&:hover": {
                     color: "black",
                     borderBottom: "2px solid black",
                  },
               }}>
               <IoShapes /> <Typography paddingX="10px">Shapes</Typography>
            </IconButton>

            {/* 👆 Add Shapes button 👆*/}
            {/* 👇  Add Effects 👇 */}
            <IconButton
               disableRipple
               sx={{
                  borderRadius: "0px",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  "&:hover": {
                     color: "black",
                     borderBottom: "2px solid black",
                  },
               }}>
               <AutoFixHighIcon /> <Typography paddingX="10px">Effects</Typography>
            </IconButton>
            {/* 👆 Add Effects 👆*/}
         </Box>

         <Divider sx={{ borderBottomWidth: "1px" }} />
      </Stack>
   );
};

export default BottomToolbar;
