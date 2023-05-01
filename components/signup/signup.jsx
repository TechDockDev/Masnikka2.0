import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../login/inputComponent";
import { MuiTelInput } from "mui-tel-input";
import axios from "axios";

const Signup = () => {
   const [formData, setFormData] = useState({ username: "", email: "", mobile: "", password: "", confirmPassword: "" });
   const [mobile, setMobile] = useState("");

   // =========================

   const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   // =========================
   const handleMobileChnage = (newValue, info) => {
      setMobile(newValue);
   };
   console.log(mobile);
   // =========================

   const signupHandler = async (e) => {
      e.preventDefault();
      let res = await axios.post("api/user/auth/signup", {
         username:formData.username,
         email:formData.email,
         mobile:mobile,
         password:formData.password,
      });
      console.log(res)
   };
   return (
      /* 👇 Form container 👇 */
      <Box
         component={"form"}
         bgcolor={"transparent"}
         onSubmit={(e) => signupHandler(e)}
         sx={{
            width: "100%",
            mt: 3,
         }}>
         {/* 👇User Name 👇 */}
         <InputComponent type={"text"} placeholder={"User Name"} name={"username"} value={formData.username} onChange={onChangeHandler} />
         {/*👆 User Name👆 */}
         {/* 👇 E-MAIL 👇 */}
         <InputComponent type={"email"} placeholder={"Email"} name={"email"} value={formData.email} onChange={onChangeHandler} />
         {/*👆 E-MAIL👆 */}
         {/* 👇 PHONE 👇 */}

         <MuiTelInput
            value={mobile}
            name="mobile"
            onChange={handleMobileChnage}
            defaultCountry="ZA"
            sx={{
               mt: 2,
               width: "100%",
               color: "white",
               height: "50px",
               borderRadius: "4px",

               border: "1px solid white",
               "& .MuiInputBase-input": {
                  color: "white",
               },
            }}
         />

         {/*👆 PHONE👆 */}
         {/* 👇 PASSWORD 👇 */}
         <InputComponent type={"password"} placeholder={"Password"} name={"password"} value={formData.password} onChange={onChangeHandler} />
         {/*👆 PASSWORD👆 */}
         {/* 👇 Confirm Password 👇 */}
         <InputComponent type={"password"} placeholder={"Confirm Password"} name={"confirmPassword"} value={formData.confirmPassword} onChange={onChangeHandler} />
         {/*👆 Confirm Password👆 */}
         {/* 👇 SignUp button 👇 */}
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
                  color: "#D01E25",
               },
            }}>
            Sign Up
         </Button>
         {/*👆 SignUp button👆 */}
      </Box>
      /*👆 Form Container👆 */
   );
};

export default Signup;
