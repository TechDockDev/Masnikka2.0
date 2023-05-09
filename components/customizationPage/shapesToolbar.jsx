import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const ShapesToolbar = ({ addRectangle, addCircle, addTriangle, addStar, addHexagram, addHeptagram, addLine, addPentagone, addHexagone, addHeptagone, addOctagone, addNonagone, addDecagone, changeColor, removeSelectedObject, clone, setShapesInterfcae }) => {
   return (
      <Stack>
         <Typography fontSize={"16px"} fontWeight={"600"} fontFamily={"Roboto"} mt={2} mb={2}>
            Select Shape
         </Typography>
         <Stack direction={"row"} sx={{ border: "1px solid grey", borderRadius: "4px", padding: "10px", flexWrap: "wrap" }}>
            {/* 👇  ADD RECTANGE button 👇 */}
            <Button
               disableRipple
               onClick={addRectangle}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Rectangle.svg"} />
            </Button>
            {/* 👆  ADD RECTANGE button 👆*/}
            {/* 👇  ADD CIRCLE button 👇 */}
            <Button
               disableRipple
               onClick={addCircle}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Circle.svg"} />
            </Button>
            {/* 👆  ADD CIRCLE button 👆*/}
            {/* 👇  ADD TRIANGLE button 👇 */}
            <Button
               disableRipple
               onClick={addTriangle}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Triangle.svg"} />
            </Button>
            {/* 👆  ADD TRIANGLE button 👆*/}
            {/* 👇  ADD STAR button 👇 */}
            <Button
               disableRipple
               onClick={addStar}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Star.svg"} />
            </Button>
            {/* 👆  ADD STAR button 👆*/}
            {/* 👇  ADD HEXAGRAM button 👇 */}
            <Button
               disableRipple
               onClick={addHexagram}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Hexagram.svg"} />
            </Button>
            {/* 👆  ADD HEXAGRAM button 👆*/}
            {/* 👇  ADD HEPTAGRAM button 👇 */}
            <Button
               disableRipple
               onClick={addHeptagram}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Heptagram.svg"} />
            </Button>
            {/* 👆  ADD HEPTAGRAM button 👆*/}
            {/* 👇  ADD LINE button 👇 */}
            <Button
               disableRipple
               onClick={addLine}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Line.svg"} />
            </Button>
            {/* 👆  ADD LINE button 👆*/}
            {/* 👇  ADD PENTAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addPentagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Pentagone.svg"} />
            </Button>
            {/* 👆  ADD PENTAGONE button 👆*/}
            {/* 👇  ADD HEXAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addHexagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Hexagone.svg"} />
            </Button>
            {/* 👆  ADD HEXAGONE button 👆*/}
            {/* 👇  ADD HEPTAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addHeptagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Heptagone.svg"} />
            </Button>
            {/* 👆  ADD HEPTAGONE button 👆*/}
            {/* 👇  ADD OCTAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addOctagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Octagone.svg"} />
            </Button>
            {/* 👆  ADD OCTAGONE button 👆*/}
            {/* 👇  ADD NONAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addNonagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Nonagone.svg"} />
            </Button>
            {/* 👆  ADD NONAGONE button 👆*/}
            {/* 👇  ADD DECAGONE button 👇 */}
            <Button
               disableRipple
               onClick={addDecagone}
               sx={{
                  transition: "all 200ms ease",
                  "&:hover": {
                     bgcolor: "white",
                     scale: ".93",
                  },
                  "&:active": {
                     scale: ".98",
                  },
               }}>
               <Box component={"img"} src={"/assets/Decagone.svg"} />
            </Button>
            {/* 👆  ADD DECAGONE button 👆*/}
         </Stack>
        
         <Stack mt={4} direction={"row"} sx={{ border: "1px solid grey", borderRadius: "4px", padding: "10px", flexWrap: "wrap" }}>
            {/* 👇 Color button 👇 */}
            <Button variant="text" disableRipple sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
               <input type="color" onChange={changeColor} />
            </Button>
            {/* 👆 Color button👆*/}
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
          
         </Stack>
         <Button onClick={()=>{setShapesInterfcae(false)}} variant="outlined" sx={{mt:2, width:"80px", marginX:"auto"}}>
               Done
            </Button>
      </Stack>
   );
};

export default ShapesToolbar;
