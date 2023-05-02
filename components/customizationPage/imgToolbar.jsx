import React from 'react'
import { Box, Button, Stack, } from "@mui/material";



const ImgToolbar = ({clone,toggleLayer,flipX,flipY, removeSelectedObject}) => {

    

  return (
    <Stack>
         {/* 👇 This section is visible in ADD TEXT mode 👇   */}
         <Box mt={2} padding={"10px"} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black" }}>
            {/* 👇 clone button 👇 */}
            <Button
               variant="text"
               disableRipple
               onClick={() => {
                  clone();
               }}
               sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               Clone
            </Button>
            {/* 👆clone button👆*/}
            {/* 👇  Layer button 👇 */}
            <Button
               variant="text"
               disableRipple
               onClick={() => {
                  toggleLayer();
               }}
               sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               Layer
            </Button>
            {/* 👆  Layer button 👆*/}
            {/* 👇  FlipX button 👇 */}
            <Button
               variant="text"
               disableRipple
               onClick={() => {
                  flipX();
               }}
               sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               Flip-X
            </Button>
            {/* 👆  FlipX button  👆*/}
            {/* 👇  FlipY button 👇 */}
            <Button
               variant="text"
               disableRipple
               onClick={() => {
                  flipY();
               }}
               sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               Flip-Y
            </Button>
            {/* 👆  FlipY button  👆*/}
            {/* 👇  delete button 👇 */}
            <Button
               variant="text"
               disableRipple
               onClick={() => {
                  removeSelectedObject();
               }}
               sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               Delete
            </Button>
            {/* 👆  delete button  👆*/}
         </Box>
         {/*👆  This section is visible in ADD TEXT mode 👆  */}
      </Stack>
  )
}

export default ImgToolbar