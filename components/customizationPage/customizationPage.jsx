import { Box, Button, Divider, Grid, IconButton, List, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import AbcIcon from "@mui/icons-material/Abc";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { IoShapes } from "react-icons/io5";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const CustomizationPage = () => {
   const [prImg, setPrImg] = useState("");
   const [addTextMode, setAddTextMode] = useState(false);
   const { editor, onReady } = useFabricJSEditor();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   // ========= 👇 dropdown menu code==========================
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   // ========= 👆 dropdown menu code==========================

   //  ===👇 ADD text function👇
   const addText = () => {
      const object = new fabric.IText("Edit Text", {
         fontFamily: "Helvetica",
         fontSize: 36,
         left: 200,
         top: 200,
      });
      editor.canvas.add(object);
   };
   // ===👆 ADD text function👆
   //  ===👇 Change text Color👇
   const changeColor = (e) => {
      if (editor?.canvas?.getActiveObject()) {
         const o = editor?.canvas?.getActiveObject();
         o.set("fill", e.target.value);
         editor?.setStrokeColor(e.target.value);
         editor?.canvas.renderAll();
      } else {
         alert("No object slected");
      }
   };
   // ===👆 Change text Color👆
   //  ===👇 Remove selected object👇
   const removeSelectedObject = () => {
      if (editor?.canvas?.getActiveObject()) {
         editor?.canvas?.remove(editor?.canvas?.getActiveObject());
         editor?.canvas?.renderAll();
      } else {
         alert("No object slected");
      }
   };
   // ===👆 Remove selected object👆
   //  ===👇 Clone Selected object👇
   const clone = () => {
      if (editor?.canvas?.getActiveObject()) {
         editor?.canvas?.getActiveObject().clone((cloned) => {
            cloned.set({
               left: cloned.left + 10,
               top: cloned.top + 10,
               evented: true,
            });
            editor?.canvas?.add(cloned);
         });
      } else {
         alert("No object slected");
      }
   };
   // ===👆 Clone Selected object👆
   //  ===👇 FLIP-X Selected object👇
   const flipX = () => {
      if (editor?.canvas?.getActiveObject()) {
         editor?.canvas?.getActiveObject().toggle("flipX");
         editor?.canvas?.renderAll();
      } else {
         alert("No object slected");
      }
   };
   // ===👆 FLIP-X Selected object👆
   //  ===👇 FLIP-Y Selected object👇
   const flipY = () => {
      if (editor?.canvas?.getActiveObject()) {
         editor?.canvas?.getActiveObject().toggle("flipY");
         editor?.canvas?.renderAll();
      } else {
         alert("No object slected");
      }
   };
   // ===👆 FLIP-Y Selected object👆
   //  ===👇 text style BOLD👇
   const bold = () => {
      if (editor?.canvas?.getActiveObject()) {
         if (editor?.canvas?.getActiveObject().fontWeight === "normal") {
            editor?.canvas?.getActiveObject().set("fontWeight", "bold");
            editor?.canvas?.renderAll();
         } else {
            editor?.canvas?.getActiveObject().set("fontWeight", "normal");
            editor?.canvas?.renderAll();
         }
      } else {
         alert("No object slected");
      }
   };
   // ===👆 text style BOLD👆
   //  ===👇 text style ITALIC👇
   const italic = () => {
      if (editor?.canvas?.getActiveObject()) {
         if (editor?.canvas?.getActiveObject().fontStyle === "normal") {
            editor?.canvas?.getActiveObject().set("fontStyle", "italic");
            editor?.canvas?.renderAll();
         } else {
            editor?.canvas?.getActiveObject().set("fontStyle", "normal");
            editor?.canvas?.renderAll();
         }
      } else {
         alert("No object slected");
      }
   };
   // ===👆 text style ITALIC👆
   //  ===👇 text style UNDERLINE👇
   const underline = () => {
      if (editor?.canvas?.getActiveObject()) {
         if (editor?.canvas?.getActiveObject().underline) {
            editor?.canvas?.getActiveObject().set("underline", false);
            editor?.canvas?.renderAll();
         } else {
            editor?.canvas?.getActiveObject().set("underline", true);
            editor?.canvas?.renderAll();
         }
      } else {
         alert("No object slected");
      }
   };
   // ===👆 text style UNDERLINE👆
   //  ===👇 text style STRIKE THROUGH👇
   const strike = () => {
      if (editor?.canvas?.getActiveObject()) {
         if (editor?.canvas?.getActiveObject().linethrough) {
            editor?.canvas?.getActiveObject().set("linethrough", false);
            editor?.canvas?.renderAll();
         } else {
            editor?.canvas?.getActiveObject().set("linethrough", true);
            editor?.canvas?.renderAll();
         }
      } else {
         alert("No object slected");
      }
   };
   // ===👆 text style STRIKE THROUGH👆

   //  ===👇 USE EFFECT👇
   useEffect(() => {
      setPrImg("/assets/product.png");

      fabric.Image.fromURL(
         prImg,
         function (oImg) {
            editor?.canvas.set("backgroundImage", oImg);
            editor?.canvas.renderAll();
         },
         {
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false,
            centeredScaling: true,
            originY: "center",
            originX: "center",
            left: 350,
            top: 200,
            scale: 2,
         }
      );
      return () => {
         editor?.canvas.dispose();
      };
   }, [prImg]);
   // ===👆 USE EFFECT👆

   // ========
   const images = [1, 2, 3, 4];
   return (
      <Stack paddingX="15px" position={"relative"} mb={2}>
         <Typography mt={2} textAlign={"center"} variant="h1" fontSize={"30px"} fontWeight={"400"} fontFamily={"Oswald"}>
            Customization
         </Typography>
         <Grid container mt={3} width={"70%"} marginX={"auto"}>
            <Grid item xs={2} height={"100%"}>
               <Stack
                  sx={{
                     display: "flex",
                     flexDirection: { xs: "row", md: "column" },
                     // border: "1px solid red",
                     height: "100%",
                  }}>
                  {images.map((img, indexOfImg) => {
                     return (
                        <Box
                           key={indexOfImg}
                           onClick={(e) => {
                              // alert("clicked");
                           }}
                           component="img"
                           src="/assets/product.png"
                           sx={{
                              height: { xs: "70px", md: "auto" },
                              width: { xs: "auto", md: "70px" },
                              marginX: { xs: "10px", md: "auto" },
                              marginY: { xs: "0", md: "10px" },
                              display: "block",
                              cursor: "pointer",
                              borderRadius: "8px",
                              transition: "all 300ms ease",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                              "&:hover": {
                                 scale: "0.96",
                                 border: "1px solid black",
                                 borderBottomWidth: "2px",
                              },
                           }}
                        />
                     );
                  })}
               </Stack>
            </Grid>
            {/* 👇 main image  👇   */}

            <Grid
               item
               xs={12}
               md={10}
               sx={{
                  boxSizing: "border-box",
                  paddingX: "20px",
                  height: "100%",
                  "& canvas": { border: "1px solid #999" },
                  "& .canvas-container": {
                     width: "100%",
                     height: "400px",
                  },
               }}>
               {/* <Box component="img" src="/assets/product.png" sx={{ width: { xs: "auto" }, height: "85%", marginX: "auto", display: "block" }} /> */}
               {/* <FabricComponent/> */}
               <FabricJSCanvas className="canvas-container" onReady={onReady} />

               {/* 👇 bottom toolbar  👇   */}
               {!addTextMode ? (
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
                        {/* 👇  Add Photo button 👇 */}
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
                           <PhotoLibraryIcon /> <Typography paddingX="10px">Photo</Typography>
                           {/* 👆 Add Photo button 👆*/}
                        </IconButton>
                        {/* 👇  Add Shapes button 👇 */}
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
               ) : (
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
                        <Button variant="text" disableRipple onClick={() => {}} sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
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
                     {/* =========================================================== */}
                     <Box mt={2} padding={"10px"} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black" }}>
                        {/* 👇 Color button 👇 */}
                        <Button variant="text" disableRipple sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
                           <input type="color" onChange={changeColor} />
                        </Button>
                        {/* 👆 Color button👆*/}
                        {/* 👇  Font family button 👇 */}
                        <Button variant="text" disableRipple onClick={() => {}} sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
                           Font
                        </Button>
                        {/* 👆  Font family button 👆*/}
                        {/* 👇  Style button 👇 */}
                        <Button variant="text" disableRipple onClick={handleClick} sx={{ transition: "all 200ms ease", "&:hover": { bgcolor: "#fff", translate: "0px 4px", textDecoration: "underline" } }}>
                           Style
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                           <MenuItem
                              onClick={() => {
                                 bold();
                                 handleClose();
                              }}>
                              Bold
                           </MenuItem>
                           <MenuItem
                              onClick={() => {
                                 italic();
                                 handleClose();
                              }}>
                              Italic
                           </MenuItem>
                           <MenuItem
                              onClick={() => {
                                 underline();
                                 handleClose();
                              }}>
                              Underline
                           </MenuItem>
                           <MenuItem
                              onClick={() => {
                                 strike();
                                 handleClose();
                              }}>
                              Strike
                           </MenuItem>
                        </Menu>
                        {/* 👆  Style button  👆*/}
                     </Box>
                     {/*👆  This section is visible in ADD TEXT mode 👆  */}
                  </Stack>
               )}

               {/*👆  bottom toolbar  👆  */}
               <Button
                  variant="contained"
                  sx={{
                     bgcolor: "#3F3F3F",
                     width: "70%",
                     display: "block",
                     margin: "20px auto",
                     fontFamily: "Oswald",
                     height: "50px",
                  }}>
                  Proceed
               </Button>
            </Grid>
            {/*👆  main image  👆  */}
         </Grid>
      </Stack>
   );
};

export default CustomizationPage;
