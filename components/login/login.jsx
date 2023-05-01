import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "./inputComponent";

const LogIn = ({ openModal, toggleModal }) => {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const logInHandler = (e) => {
      e.preventDefault();
   };

   return (
      /* 👇 Form container 👇 */
      <Box
         component={"form"}
         bgcolor={"transparent"}
         onSubmit={(e) => logInHandler(e)}
         sx={{
            width: "100%",
            mt: 3,
         }}>
         {/* 👇 E-MAIL 👇 */}
         <InputComponent type={"email"} placeholder={"Email"} name={"email"} value={formData.email} onChange={onChangeHandler} />
         {/*👆 E-MAIL👆 */}
         {/* 👇 PASSWORD 👇 */}
         <InputComponent type={"password"} placeholder={"Password"} name={"password"} value={formData.password} onChange={onChangeHandler} />
         {/*👆 PASSWORD👆 */}
         {/* 👇 LogIn button 👇 */}
         <Button
            variant="contained"
            type="submit"
            disableRipple
            disableElevation={true}
            sx={{
               height: "50px",
               mt: 2,
               width: "100%",
               boxShadow: "0px 0px 1px white",
               fontFamily: "Oswald",
               fontSize: "20px",
               "&:hover": {
                  boxShadow: "0px 0px 1px white",
                  color:"#D01E25"
               },
            }}>
            Log In
         </Button>
         {/*👆 LogIn button👆 */}
         {/* 👇 Forgot Password button 👇 */}

         <Button variant="text" disableRipple sx={{ color: "white", textTransform: "capitalize", mt: 2, "&:hover": { color: "#D01E25" } }}>
            Forgot Password ?
         </Button>
         {/*👆 Forgot Password button👆 */}
         <Typography color={"white"} fontSize={"14px"}  mt={2} textAlign={"center"}>
            New to MASNIKKA ?
            <Button variant="text" disableRipple sx={{ color: "white", textTransform: "capitalize", "&:hover": { color: "#D01E25" }, padding:"0px 5px", fontWeight:"600" }}>
            Create an account
            </Button>
         </Typography>
      </Box>
      /*👆 Form Container👆 */
   );
};

export default LogIn;
