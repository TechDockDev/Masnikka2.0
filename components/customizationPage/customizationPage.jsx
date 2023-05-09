import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import BottomToolbar from "./bottomToolbar";
import TextToolBar from "./textToolBar";
import ImgToolbar from "./imgToolbar";
import ShapesToolbar from "./shapesToolbar";

const CustomizationPage = () => {
   const [prImg, setPrImg] = useState("");
   const { editor, onReady } = useFabricJSEditor();
   const [shapesInterfcae, setShapesInterfcae] = useState(false);

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
   //  ===👇 ADD SHAPE functions👇
   const addShape = (e) => {
      setShapesInterfcae(true);
   };
   // =========================================
   // =========================================
   const starPolygonPoints = (spikeCount, outerRadius, innerRadius) => {
      const rot = (Math.PI / 2) * 3;
      let cx = outerRadius;
      let cy = outerRadius;
      const sweep = Math.PI / spikeCount;
      const points = [];
      let angle = 0;

      for (let i = 0; i < spikeCount; i++) {
         let x = cx + Math.cos(angle) * outerRadius;
         let y = cy + Math.sin(angle) * outerRadius;
         points.push({ x: x, y: y });
         angle += sweep;

         x = cx + Math.cos(angle) * innerRadius;
         y = cy + Math.sin(angle) * innerRadius;
         points.push({ x: x, y: y });
         angle += sweep;
      }
      return points;
   };
   // ******************
   const regularPolygonPoints = (sideCount, radius) => {
      const sweep = (Math.PI * 2) / sideCount;
      let cx = radius;
      let cy = radius;
      const points = [];
      for (let i = 0; i < sideCount; i++) {
         let x = cx + radius * Math.cos(i * sweep);
         let y = cy + radius * Math.sin(i * sweep);
         points.push({ x: x, y: y });
      }
      return points;
   };

   // =========================================
   // =========================================

   // **** 👇
   const addRectangle = () => {
      const rectangle = new fabric.Rect({
         top: 100,
         left: 100,
         width: 100,
         height: 100,
         fill: "black",
       });
      editor?.canvas.add(rectangle);
   };
   // **** 👆
   // **** 👇
   const addCircle = () => {
      const circle = new fabric.Circle({
         radius: 15,
         left: 100,
         top: 100,
       });
      editor?.canvas.add(circle);
       
   };
   // **** 👆
   // **** 👇
   const addTriangle = () => {
      const triangle = new fabric.Triangle({
         width: 40,
         height: 60,
         left: 150,
         top: 50,
      });

      editor?.canvas.add(triangle);
   };
   // **** 👆
   // **** 👇
   const addStar = () => {
      const points = starPolygonPoints(5, 50, 25);
      const polygon = new fabric.Polygon(points, {
         fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addHexagram = () => {
      const points = starPolygonPoints(6, 50, 25);
      const polygon = new fabric.Polygon(points, {
         fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addHeptagram = () => {
      const points = starPolygonPoints(7, 50, 25);
      const polygon = new fabric.Polygon(points, {
         fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addLine = () => {
      const line = new fabric.Line([50, 10, 200, 150], {
         stroke: "black",
      });
      editor?.canvas.add(line);
   };
   // **** 👆
   // **** 👇
   const addPentagone = () => {
      const points = regularPolygonPoints(5, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
        // stroke: "green",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addHexagone = () => {
      const points = regularPolygonPoints(6, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addHeptagone = () => {
      const points = regularPolygonPoints(7, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addOctagone = () => {
      const points = regularPolygonPoints(8, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addNonagone = () => {
      const points = regularPolygonPoints(9, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆
   // **** 👇
   const addDecagone = () => {
      const points = regularPolygonPoints(10, 30);
      const polygon = new fabric.Polygon(points, {
        fill: "black",
      });
      editor?.canvas.add(polygon);
   };
   // **** 👆

   // ===👆 ADD SHAPE functions👆
 console.log('--->', editor?.canvas?.getActiveObject()?.type);
 
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
                  <ImgToolbar clone={clone} toggleLayer={toggleLayer} flipX={flipX} flipY={flipY} removeSelectedObject={removeSelectedObject} />
               ) : shapesInterfcae ? (
                  <ShapesToolbar addRectangle={addRectangle} addCircle={addCircle} addTriangle={addTriangle} addStar={addStar} addHexagram={addHexagram} addHeptagram={addHeptagram} addLine={addLine} addPentagone ={addPentagone} addHexagone={addHexagone} addHeptagone={addHeptagone} addOctagone={addOctagone} addNonagone={addNonagone} addDecagone={addDecagone} changeColor={changeColor}removeSelectedObject={removeSelectedObject} clone={clone} setShapesInterfcae={setShapesInterfcae} />
               ) : (
                  <BottomToolbar addText={addText} addImage={addImage} addShape={addShape} />
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
