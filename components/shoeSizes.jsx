import { Stack, Typography, colors } from "@mui/material";

import React from "react";

const ShoeSizes = ({ productSizes, setSizeIndex, sizeIndex, setQuantity }) => {
  return (
    <Stack
      mt={1}
      mb={1}
      direction={"row"}
      sx={{
        flexWrap: "wrap",
        "& input": {
          display: "none",
        },
        // "& input:checked + label": {
        // borderColor: "black",
        // color: "black",
        // },
        "& input:disabled + ::before": {
          position: "absolute",
          content: `""`,
          width: "48px",
          height: "1px",
          bgcolor: "#C4C4C4",
          transform: "rotate(45deg)",
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
      }}
    >
      {productSizes.map((size, index) => {
        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              name="s-size"
              value={size.size}
              onClick={() => {
                setSizeIndex(index);
                setQuantity(1);
              }}
              disabled={size.stock === 0}
              id={size.size}
            />
            <label
              style={
                sizeIndex === index
                  ? { borderColor: "black", color: "black" }
                  : {}
              }
              htmlFor={size.size}
            >
              {size.size}{" "}
            </label>
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

export default ShoeSizes;
