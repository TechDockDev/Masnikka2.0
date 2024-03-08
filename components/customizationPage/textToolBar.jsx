import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const commonFonts = [
  "Anta",
  "Helvetica",
  "Montserrat",
  "Pacifico",
  "Roboto",
  "Rouge Script",
  "Ojuju",
  "Oswald",
];

const TextToolBar = ({
  clone,
  toggleLayer,
  flipX,
  flipY,
  removeSelectedObject,
  bold,
  italic,
  underline,
  strike,
  changeColor,
  handleFontChange,
  selectedFont,
}) => {
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
  return (
    <Stack>
      {/* 👇 This section is visible in ADD TEXT mode 👇   */}
      <Box
        mt={2}
        padding={"10px"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        {/* 👇 clone button 👇 */}
        <Button
          variant="text"
          disableRipple
          onClick={() => {
            clone();
          }}
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
          Clone
        </Button>
        {/* 👆clone button👆*/}
        {/* 👇  Layer button 👇 */}
        <Button
          variant="text"
          disableRipple
          onClick={() => {
            toggleLayer();
          }}
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
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
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
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
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
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
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
          Delete
        </Button>
        {/* 👆  delete button  👆*/}
      </Box>
      {/* =========================================================== */}
      <Box
        mt={2}
        padding={"10px"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        {/* 👇 Color button 👇 */}
        <Button
          variant="text"
          disableRipple
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
          <input type="color" onChange={changeColor} />
        </Button>
        {/* 👆 Color button👆*/}
        {/* 👇  Font family button 👇 */}

        <FormControl fullWidth>
          <InputLabel id="font">Font</InputLabel>
          <Select
            labelId="font"
            id="font"
            label="Font"
            value={selectedFont}
            onChange={handleFontChange}
          >
            {commonFonts.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* </Button> */}
        {/* 👆  Font family button 👆*/}
        {/* 👇  Style button 👇 */}
        <Button
          variant="text"
          disableRipple
          onClick={handleClick}
          sx={{
            transition: "all 200ms ease",
            "&:hover": {
              bgcolor: "#fff",
              translate: "0px 4px",
              textDecoration: "underline",
            },
          }}
        >
          Style
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              bold();
              handleClose();
            }}
          >
            Bold
          </MenuItem>
          <MenuItem
            onClick={() => {
              italic();
              handleClose();
            }}
          >
            Italic
          </MenuItem>
          <MenuItem
            onClick={() => {
              underline();
              handleClose();
            }}
          >
            Underline
          </MenuItem>
          <MenuItem
            onClick={() => {
              strike();
              handleClose();
            }}
          >
            Strike
          </MenuItem>
        </Menu>
        {/* 👆  Style button  👆*/}
      </Box>
      {/*👆  This section is visible in ADD TEXT mode 👆  */}
    </Stack>
  );
};

export default TextToolBar;
