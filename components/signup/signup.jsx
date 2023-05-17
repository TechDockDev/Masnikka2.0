import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../login/inputComponent";
import { MuiTelInput } from "mui-tel-input";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Signup = ({toggleModal}) => {
   const {snackbar} = useContext(AppContext)

   const [formData, setFormData] = useState({ userName: "", email: "", mobile: "", password: "", confirmPassword: "" });
   const [phoneNumber, setMobile] = useState("");

   // =========================

   const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   // =========================
   const handleMobileChange = (newValue, info) => {
      setMobile(newValue);
   };
   // =========================

   const signupHandler = async (e) => {
      e.preventDefault();
      try {
         let res = await axios.post("api/user/auth/signup", {
            userName: formData.userName,
            email: formData.email,
            phoneNumber: phoneNumber,
            password: formData.password,
         });
         snackbar(res.data.message, res.data.status);
         toggleModal();
      } catch (error) {
         snackbar("Something went wrong", "error");
         toggleModal();
      }
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
         <InputComponent type={"text"} placeholder={"User Name"} name={"userName"} value={formData.userName} onChange={onChangeHandler} />
         {/*👆 User Name👆 */}
         {/* 👇 E-MAIL 👇 */}
         <InputComponent type={"email"} placeholder={"Email"} name={"email"} value={formData.email} onChange={onChangeHandler} />
         {/*👆 E-MAIL👆 */}
         {/* 👇 PHONE 👇 */}

         <MuiTelInput
            value={phoneNumber}
            name="phoneNumber"
            onChange={handleMobileChange}
            defaultCountry="ZA"
            forceCallingCode
            disableFormatting
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
               "& .MuiTypography-root ":{
                  color:"white"
               }
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
