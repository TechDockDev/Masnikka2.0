import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import BottomToolbar from "./bottomToolbar";
import TextToolBar from "./textToolBar";
import ImgToolbar from "./imgToolbar";
import ShapesToolbar from "./shapesToolbar";
import { useRouter } from "next/router";
import axios from "axios";
import S3Image from "@/lib/getImage";

const CustomizationPage = ({ product }) => {
  const [prImg, setPrImg] = useState(
    JSON.parse(product)?.productPhotos.frontImg
  );
  const [images, setImages] = useState({});
  const { editor, onReady } = useFabricJSEditor();
  const [previousCanvas, setPreviousCanvas] = useState("frontImg");

  const [shapesInterface, setShapesInterface] = useState(false);
  const router = useRouter();
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
      alert("No object selected");
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
    setShapesInterface(true);
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
  //   console.log("--->", editor?.canvas?.getActiveObject()?.type);

  // *******************

  //  ===👇 USE EFFECT👇
  useEffect(() => {
    // var img = new Image();
    // img.src = prImg;
    // // img.crossOrigin = "anonymous";

    // img.onload = function () {
    //   var image = new fabric.Image(img);
    //   editor?.canvas?.setBackgroundImage(
    //     image,
    //     () => {
    //       editor.canvas.renderAll.bind(editor.canvas);
    //     },
    //     {
    //       scaleX: editor.canvas.width / img.width,
    //       scaleY: editor.canvas.height / img.height,
    //     }
    //   );
    // };

    fabric.Image.fromURL(prImg, function (img) {
      // Set the image as the background

      // img.getElement().crossOrigin = "anonymous";
      editor?.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          // crossOrigin: "",
          scaleX: editor.canvas.width / img.width,
          scaleY: editor.canvas.height / img.height,
        }
      );

      // }
    });
    return () => {
      // editor?.canvas?.dispose();
    };
  }, [prImg]);

  // ===👆 USE EFFECT👆

  // ========

  const saveCanvasJson = async (e, key) => {
    var backgroundImage = editor?.canvas.backgroundImage;
    if (backgroundImage) {
      backgroundImage.getElement().crossOrigin = "anonymous";
    }

    sessionStorage.setItem(
      previousCanvas,
      JSON.stringify(editor.canvas.toJSON())
    );
    if (JSON.parse(sessionStorage.getItem(key))) {
      editor.canvas.loadFromJSON(JSON.parse(sessionStorage.getItem(key)));
    } else {
      editor.deleteAll();
    }
    setPreviousCanvas(key);
    setPrImg(e.target.src);
  };

  const saveCanvas = async () => {
    try {
      var backgroundImage = editor?.canvas.backgroundImage;
      if (backgroundImage) {
        backgroundImage.getElement().crossOrigin = "anonymous";
      }
      sessionStorage.setItem(
        previousCanvas,
        JSON.stringify(editor.canvas.toJSON())
      );
      const { data } = await axios.post("/api/Customize/design", {
        productId: JSON.parse(product).product,
        productColorId: JSON.parse(product)._id,
        customizeData: {
          frontJson: sessionStorage.getItem("frontImg"),
          backJson: sessionStorage.getItem("backImg"),
          leftJson: sessionStorage.getItem("leftImg"),
          rightJson: sessionStorage.getItem("rightImg"),
        },
      });
      sessionStorage.clear();
      router.push({
        pathname: `/productpage/${data.customize._id}`,
        query: { canvas: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const productimages = JSON.parse(product)?.productPhotos;
    delete productimages["thumbnailImg"];
    delete productimages["productImg"];
    setImages(productimages);
  }, []);

  return (
    <Stack paddingX="15px" position={"relative"} mb={2}>
      <Typography
        mt={2}
        textAlign={"center"}
        variant="h1"
        fontSize={"30px"}
        fontWeight={"400"}
        fontFamily={"Oswald"}
      >
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
            }}
          >
            {/* {Object.values(images).map((img, indexOfImg) => { */}
            {Object.entries(images).map((img) => {
              return (
                <S3Image
                  key={img[0]}
                  imageSide={img[0]}
                  imgKey={img[1]}
                  saveCanvasJson={saveCanvasJson}
                  style={{ cursor: "pointer" }}
                />

                // <Box
                //   key={img[0]}
                //   onClick={(e) => {
                //     saveCanvasJson(e, img[0]);
                //   }}
                //   alt={img[0]}
                //   component="img"
                //   src={`https://masnikkas3-storage.s3.af-south-1.amazonaws.com/R{img[1]}`}
                //   sx={{
                //     height: { xs: "70px", md: "auto" },
                //     width: { xs: "auto", md: "70px" },
                //     marginX: { xs: "10px", md: "auto" },
                //     marginY: { xs: "0", md: "10px" },
                //     display: "block",
                //     cursor: "pointer",
                //     borderRadius: "8px",
                //     transition: "all 300ms ease",
                //     boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                //     "&:hover": {
                //       scale: "0.96",
                //       border: "1px solid black",
                //       borderBottomWidth: "2px",
                //     },
                //   }}
                // />
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
          }}
        >
          {/* <Box component="img" src="/assets/product.png" sx={{ width: { xs: "auto" }, height: "85%", marginX: "auto", display: "block" }} /> */}
          {/* <FabricComponent/> */}
          <FabricJSCanvas className="canvas-container" onReady={onReady} />

          {/* 👇 TOOLBARS   👇   */}
          {editor?.canvas?.getActiveObject()?.type === "i-text" ? (
            <TextToolBar
              clone={clone}
              toggleLayer={toggleLayer}
              flipX={flipX}
              flipY={flipY}
              removeSelectedObject={removeSelectedObject}
              bold={bold}
              italic={italic}
              underline={underline}
              strike={strike}
              changeColor={changeColor}
              handleFontChange={handleFontChange}
            />
          ) : editor?.canvas?.getActiveObject()?.type === "image" ? (
            <ImgToolbar
              clone={clone}
              toggleLayer={toggleLayer}
              flipX={flipX}
              flipY={flipY}
              removeSelectedObject={removeSelectedObject}
            />
          ) : shapesInterface ? (
            <ShapesToolbar
              addRectangle={addRectangle}
              addCircle={addCircle}
              addTriangle={addTriangle}
              addStar={addStar}
              addHexagram={addHexagram}
              addHeptagram={addHeptagram}
              addLine={addLine}
              addPentagone={addPentagone}
              addHexagone={addHexagone}
              addHeptagone={addHeptagone}
              addOctagone={addOctagone}
              addNonagone={addNonagone}
              addDecagone={addDecagone}
              changeColor={changeColor}
              removeSelectedObject={removeSelectedObject}
              clone={clone}
              setShapesInterface={setShapesInterface}
            />
          ) : (
            <BottomToolbar
              addText={addText}
              addImage={addImage}
              addShape={addShape}
            />
          )}

          {/*👆  TOOLBARS   👆  */}
          <Button
            variant="contained"
            onClick={saveCanvas}
            sx={{
              bgcolor: "#3F3F3F",
              width: "70%",
              display: "block",
              margin: "20px auto",
              fontFamily: "Oswald",
              height: "50px",
            }}
          >
            Proceed
          </Button>
        </Grid>
        {/*👆  main image  👆  */}
      </Grid>
    </Stack>
  );
};

export default CustomizationPage;
