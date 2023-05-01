import { Box, Container } from "@mui/material";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

const FabricComponent = () => {
   const canvasEl = useRef(null);

   useEffect(() => {
      const options = {};
      const canvas = new fabric.Canvas(canvasEl.current, options);

      canvas.setBackgroundImage("/assets/product.png", canvas.renderAll.bind(canvas), {
         backgroundImageOpacity: 0.5,
         backgroundImageStretch: false,
         centeredScaling: true,
         originY:"center",
         originX:"center",
         left:300,
         top:200,
         scale:2  
      });

      return () => {
         canvas.dispose();
      };
   }, []);

   return <canvas height={400} width={600} ref={canvasEl} />;
};
export default FabricComponent;
