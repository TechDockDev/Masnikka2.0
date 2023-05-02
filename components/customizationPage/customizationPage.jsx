import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, List, Menu, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import BottomToolbar from "./bottomToolbar";
import TextToolBar from "./textToolBar";
import ImgToolbar from "./imgToolbar";

const CustomizationPage = () => {
   const [prImg, setPrImg] = useState("");
   const { editor, onReady } = useFabricJSEditor();

   //  ===👇 handle font select👇
   const handleFontChange = (e) => {
      editor?.canvas?.getActiveObject().set("fontFamily", e.target.value);
      editor?.canvas.renderAll();
   };
   // ===👆 handle font select👆
   //  ===👇 LAYERS toggle(bring layers front or back)👇
   const toggleLayer = () => {
      const myObject = editor?.canvas?.getActiveObject();
      editor?.canvas?.bringToFront(myObject);
   };
   // ===👆 LAYERS toggle(bring layers front or back)👆
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
   //  ===👇 ADD IMAGE function👇
   const addImage = (e) => {
      const image = e.target.files[0];
      if (image) {
         fabric?.Image?.fromURL(URL.createObjectURL(e.target.files[0]), (img) => {
            editor?.canvas?.add(img);
            editor?.canvas?.renderAll();
         });
         // setImageFunc(URL.createObjectURL(e.target.files[0]));
      }
   };
   // ===👆 ADD IMAGE function👆

   

   // *******************

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

               {/* 👇 TOOLBARS   👇   */}
               {editor?.canvas?.getActiveObject()?.type === "i-text" ? (
                  <TextToolBar clone={clone} toggleLayer={toggleLayer} flipX={flipX} flipY={flipY} removeSelectedObject={removeSelectedObject} bold={bold} italic={italic} underline={underline} strike={strike} changeColor={changeColor} handleFontChange={handleFontChange} />
               ) : editor?.canvas?.getActiveObject()?.type === "image" ? (
                  <ImgToolbar  clone={clone} toggleLayer={toggleLayer} flipX={flipX} flipY={flipY} removeSelectedObject={removeSelectedObject}/>
               ) : (
                  <BottomToolbar addText={addText} addImage={addImage} />
               )}

               {/*👆  TOOLBARS   👆  */}
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
