import { Stack, Typography, colors } from "@mui/material";

import React from "react";

const ShoeSizes = () => {
   const sizes = [, { qty: 5, size: 5 }, { qty: 0, size: 6 }, { qty: 2, size: 7 }, { qty: 5, size: 8 }, { qty: 5, size: 9 }, { qty: 5, size: 10 }, { qty: 5, size: 11 }];
   const onChange = (e) => {
      console.log("radio-", e.target.name, e.target.value);
   };
   return (
      <Stack
      mt={1} mb={1}
         direction={"row"}
         sx={{
            flexWrap:"wrap",
            "& input": {
               display: "none",
            },
            "& input:checked + label": {
               borderColor: "black",
               color: "black",
            },
            "& input:disabled + ::before": {
                position:"absolute",
               content: `""`,
               width: "48px",
               height: "1px",
               bgcolor: "#C4C4C4",
               transform:"rotate(45deg)"

            },
            "& label": {
               display: "inline-block",
               height: "35px",
               width: "35px",
               border: "1px solid #C4C4C4",
               borderRadius: "4px",
               color: "#C4C4C4",
               fontFamily: "Oswald",
               margin: "4px",
               fontSize: "14px",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               cursor: "pointer",
               "&:hover": {
                  scale: "0.97",
               },
            },
         }}>
         {sizes.map((size, sizeIndex) => {
            return (
               <React.Fragment key={sizeIndex}>
                  <input type="radio" name="s-size" value={size.size} onChange={onChange} disabled={size.qty === 0} id={size.size} />
                  <label for={size.size}>{size.size} </label>
               </React.Fragment>
            );
         })}
         <Typography component={"a"} fontSize={"12px"} color={"blue"} sx={{textDecoration:"underline", cursor:"pointer"}} >Size guide</Typography>
      </Stack>
   );
};

export default ShoeSizes;
