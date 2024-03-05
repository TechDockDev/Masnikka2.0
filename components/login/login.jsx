import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "./inputComponent";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebaseAuth";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";

const LogIn = ({ openModal, toggleModal, openSignUp }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { snackbar, setUserData } = useContext(AppContext);

  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "/api/user/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      snackbar(res.data.message, res.data.status);

      setUserData(res?.data?.data.user);
      toggleModal();
    } catch (error) {
      snackbar(error.response.data.message, "error");
      // snackbar("Something went wrong", "error");
      toggleModal();
    }
  };
  {
    /* 👇 Login with google👇 */
  }

  const authHandler = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      let res = await axios.post(
        "/api/user/auth/login",
        {
          idToken: await auth.currentUser.getIdToken(),
          loginType: "google",
        },
        { withCredentials: true }
      );

      console.log(user);
      snackbar(res.data.message, res.data.status);

      setUserData(res?.data?.data.user);
      toggleModal();
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    }
  };
  /*👆 Login with google👆 */

  return (
    <>
      {/* 👇 Form container 👇 */}
      <Box
        component={"form"}
        bgcolor={"transparent"}
        onSubmit={(e) => logInHandler(e)}
        sx={{
          width: "100%",
          mt: 3,
        }}
      >
        {/* 👇 E-MAIL 👇 */}
        <InputComponent
          type={"email"}
          placeholder={"Email"}
          name={"email"}
          value={formData.email}
          onChange={onChangeHandler}
        />
        {/*👆 E-MAIL👆 */}
        {/* 👇 PASSWORD 👇 */}
        <InputComponent
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          value={formData.password}
          onChange={onChangeHandler}
        />
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
              color: "#D01E25",
            },
          }}
        >
          Log In
        </Button>
        {/*👆 LogIn button👆 */}
      </Box>
      {/*👆 Form Container👆 */}
      {/* 👇 Forgot Password button 👇 */}
      <Button
        variant="text"
        onClick={() => {
          toggleModal();
          router.push("/forgetPassword");
        }}
        disableRipple
        sx={{
          color: "white",
          textTransform: "capitalize",
          mt: 2,
          "&:hover": { color: "#D01E25" },
        }}
      >
        Forgot Password ?
      </Button>
      {/*👆 Forgot Password button👆 */}
      {/* 👇 Login With google button 👇 */}
      <Button
        onClick={authHandler}
        variant="text"
        disableRipple
        sx={{
          color: "white",
          textTransform: "capitalize",
          mt: 2,
          "&:hover": { color: "#D01E25" },
        }}
      >
        Login with Google
      </Button>
      {/*👆 Login With google button👆 */}
      <Typography color={"white"} fontSize={"14px"} mt={2} textAlign={"center"}>
        New to MASNIKKA ?
        <Button
          variant="text"
          disableRipple
          onClick={() => {
            toggleModal();
            openSignUp();
          }}
          sx={{
            color: "white",
            textTransform: "capitalize",
            "&:hover": { color: "#D01E25" },
            padding: "0px 5px",
            fontWeight: "600",
          }}
        >
          Create an account
        </Button>
      </Typography>
    </>
  );
};

export default LogIn;
