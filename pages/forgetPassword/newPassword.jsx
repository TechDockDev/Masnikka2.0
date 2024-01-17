import { Box, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import InputComponent from "@/components/login/inputComponent";
import ModalComponent from "@/components/modalComponent";
import { useRouter } from "next/router";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import Layout from "@/components/layout";

const NewPassword = () => {
  const router = useRouter();
  const { snackbar } = useContext(AppContext);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const changePassword = async (e) => {
    try {
      e.preventDefault();
      if (password.password !== password.confirmPassword) {
        console.log(password);
        return snackbar("Password doesn't match", "error");
      }
      await axios.patch("/api/user/auth/newPassword", {
        email: sessionStorage.getItem("email"),
        password: password.password,
      });
      router.push("/");
      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ModalComponent openModal={true} toggleModal={() => router.push("/")}>
        <Box
          component={"form"}
          bgcolor={"transparent"}
          onSubmit={changePassword}
          sx={{
            width: "100%",
            mt: 3,
          }}
        >
          {/* 👇 new password 👇 */}
          <InputComponent
            type={"password"}
            placeholder={"New Password"}
            name={"password"}
            value={password.password}
            onChange={onChangeHandler}
          />
          {/*👆 new password👆 */}
          {/* 👇 confirm new password 👇 */}
          <InputComponent
            type={"password"}
            placeholder={"Confirm New Password"}
            name={"confirmPassword"}
            value={password.confirmPassword}
            onChange={onChangeHandler}
          />
          {/*👆 confirm new password👆 */}
          {/*👆 Change Password button👆 */}
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
            Change Password
          </Button>
          {/*👆 Change Password button👆 */}
        </Box>
      </ModalComponent>
    </Layout>
  );
};

export default NewPassword;
