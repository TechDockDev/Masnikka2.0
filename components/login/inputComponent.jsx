import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const InputComponent = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  onBlur,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  const toggleViewPassword = () => {
    setshowPassword(!showPassword);
  };

  const styles = {
    width: "100%",
    color: "white",
    bgcolor: "transparent",
    height: "50px",
    fontFamily: "Oswald",
    fontSize: "18px",
    padding: "0px 20px",
    boxSizing: "border-box",
    border: "1px solid white",
    outline: "none",
    borderRadius: "4px",
    "&::placeholder": {
      color: "white",
    },
  };
  const styles2 = {
    // border: "1px solid red",
    position: "absolute",
    right: "5px",
    top: "20px",
  };
  return (
    <>
      {type === "password" ? (
        <>
          <Box
            position={"relative"}
            sx={{
              "& input:-internal-autofill-selected": {
                color: "white",
                bgcolor: "transparent",
              },
            }}
          >
            <Box
              mt={2}
              component={"input"}
              type={showPassword ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
              sx={styles}
              placeholder={placeholder}
              required
            />
            {showPassword ? (
              <IconButton onClick={toggleViewPassword} sx={styles2}>
                <VisibilityIcon sx={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton onClick={toggleViewPassword} sx={styles2}>
                <VisibilityOffIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </Box>
        </>
      ) : (
        <Box
          mt={2}
          component={"input"}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          sx={styles}
          placeholder={placeholder}
          autoComplete="none"
          required
        />
      )}
    </>
  );
};

export default InputComponent;
