import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const Fabricjsreact = () => {
   const [prImg, setPrImg] = useState("");
   const { selectedObjects, editor, onReady } = useFabricJSEditor();
   const [color, setColor] = useState("");

   const onAddRectangle = () => {
      editor?.addRectangle();
   };

   //  ===👇 ADD text function👇
   const addText = () => {
      const object = new fabric.IText("Text Message", {
         fontFamily: "Helvetica",
         fontSize: 36,
      });
      editor.canvas.add(object);
   };
   // ===👆 ADD text function👆
   //  ===👇 Change text Color👇
   const changeColor = (e) => {
      setColor(e.target.value);
    //   console.log(e.target.value);
      const o = editor?.canvas?.getActiveObject();
      o.set("fill", e.target.value);
      editor?.setStrokeColor(e.target.value);
      editor?.canvas.renderAll();
   };
   // ===👆 Change text Color👆

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
   return (
      <>
         <button onClick={onAddRectangle}> Add circle</button>
         <button onClick={addText}> addText</button>
         <input type="color" onChange={changeColor}/>
         <FabricJSCanvas className="canvas-container" onReady={onReady} />
      </>
   );
};

export default Fabricjsreact;

// {
// backgroundImageOpacity: 0.5,
// backgroundImageStretch: false,
// centeredScaling: true,
// originY:"center",
// originX:"center",
// left:300,
// top:200,
// scale:2

//  }
