import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "@/components/login/inputComponent";
import ModalComponent from "@/components/modalComponent";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/layout";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submit = async (e) => {
    try {
      e.preventDefault();

      await axios.post("/api/user/auth/forgetpassword", { email });
      sessionStorage.setItem("email", email);
      router.push("/forgetPassword/confirmCode");
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
          onSubmit={submit}
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
            value={email}
            onChange={onChangeHandler}
          />
          {/*👆 E-MAIL👆 */}
          {/* 👇 Next button 👇 */}
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
            Next
          </Button>
          {/*👆 Next button👆 */}
        </Box>
      </ModalComponent>
    </Layout>
  );
};

export default ForgetPassword;
