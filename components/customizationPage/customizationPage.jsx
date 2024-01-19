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
  const [buttonText, setButtonText] = useState("proceed");
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
      alert("No items selected");
    }
  };
  // ===👆 Change text Color👆
  //  ===👇 Remove selected object👇
  const removeSelectedObject = () => {
    if (editor?.canvas?.getActiveObject()) {
      editor?.canvas?.remove(editor?.canvas?.getActiveObject());
      editor?.canvas?.renderAll();
    } else {
      alert("No items selected");
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
      alert("No items selected");
    }
  };
  // ===👆 Clone Selected object👆
  //  ===👇 FLIP-X Selected object👇
  const flipX = () => {
    if (editor?.canvas?.getActiveObject()) {
      editor?.canvas?.getActiveObject().toggle("flipX");
      editor?.canvas?.renderAll();
    } else {
      alert("No items selected");
    }
  };
  // ===👆 FLIP-X Selected object👆
  //  ===👇 FLIP-Y Selected object👇
  const flipY = () => {
    if (editor?.canvas?.getActiveObject()) {
      editor?.canvas?.getActiveObject().toggle("flipY");
      editor?.canvas?.renderAll();
    } else {
      alert("No items selected");
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
      alert("No items selected");
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
      alert("No items selected");
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
      alert("No items selected");
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
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result;

        // Create Fabric.js Image object from the local image URL
        fabric.Image.fromURL(imageUrl, function (img) {
          // Optionally, scale or manipulate the image as needed
          img.scaleToWidth(editor.canvas.width / 2);
          img.scaleToHeight(editor.canvas.height / 2);

          // Add the image to the canvas
          editor.canvas.add(img);

          // Render the canvas
          editor.canvas.renderAll();
        });
      };

      reader.readAsDataURL(fileInput.files[0]);
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

  // *******************

  useEffect(() => {
    // Event listener for the "Delete" key
    const handleKeyDown = (e) => {
      // Check if the pressed key is the "Delete" key (keyCode 46) or (key "Delete" or "Backspace" on modern browsers)
      if (e.key === "Delete") {
        removeSelectedObject();
      }
    };

    // Attach event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.canvas.getActiveObject()]); // Run only once when the component mounts

  //  ===👇 USE EFFECT👇
  useEffect(() => {
    fabric.Image.fromURL(prImg, function (img) {
      // Set the image as the background
      // img.scaleToWidth(editor?.canvas.width);
      // img.scaleToHeight(editor?.canvas.height);
      editor?.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          // left: editor.canvas.width / 2 - img.width / 2,
          // top: editor.canvas.height / 2 - img.height / 2,
        }
      );
    });

    return () => {
      // editor?.canvas?.dispose();
    };
  }, [prImg]);
  // ===== 👆 USE EFFECT👆 ========

  const saveCanvasJson = async (e, key) => {
    if (previousCanvas === key) return;
    var backgroundImage = editor?.canvas.backgroundImage;
    if (backgroundImage) {
      backgroundImage.getElement().crossOrigin = "anonymous";
    }

    sessionStorage.setItem(
      previousCanvas,
      JSON.stringify(editor.canvas.toJSON())
      // JSON.stringify(editor.canvas.toDatalessJSON())
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
      if (
        !sessionStorage.getItem("frontImg") ||
        !sessionStorage.getItem("leftImg") ||
        !sessionStorage.getItem("rightImg") ||
        !sessionStorage.getItem("backImg")
      ) {
        return alert("Please view all the angles before proceeding");
      }
      setButtonText("loading...");
      const { data } = await axios.post("/api/Customize/design", {
        productId: JSON.parse(product).product,
        productColorId: JSON.parse(product)._id,
        customizeData: {
          frontJson: sessionStorage.getItem("frontImg"),
          backJson: sessionStorage.getItem("backImg"),
          leftJson: sessionStorage.getItem("leftImg"),
          rightJson: sessionStorage.getItem("rightImg"),
        },
        size: {
          width: editor.canvas.width,
          height: editor.canvas.height,
        },
      });
      sessionStorage.clear();
      router.push({
        pathname: `/productpage/${data.customize._id}`,
        query: { canvas: true },
      });
    } catch (error) {
      console.log(error);
      setButtonText("Something went wrong. Try again");
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
            {Object.entries(images).map((img) => {
              return (
                <S3Image
                  key={img[0]}
                  imageSide={img[0]}
                  imgKey={img[1]}
                  saveCanvasJson={saveCanvasJson}
                  style={{ cursor: "pointer" }}
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
              height: "500px",
            },
          }}
        >
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
            {buttonText}
          </Button>
        </Grid>
        {/*👆  main image  👆  */}
      </Grid>
    </Stack>
  );
};

export default CustomizationPage;
