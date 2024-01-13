import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "@/components/login/inputComponent";
import ModalComponent from "@/components/modalComponent";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/layout";

const ConfirmCode = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const onChangeHandler = (e) => {
    setOtp(e.target.value);
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/user/auth/confirmOtp", {
        email: sessionStorage.getItem("email"),
        code: otp,
      });
      router.push("/forgetPassword/newPassword");
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
          {/* 👇 OTP 👇 */}
          <InputComponent
            type={"number"}
            placeholder={"Enter OTP"}
            name={"otp"}
            value={otp}
            onChange={onChangeHandler}
          />
          {/*👆 OTP 👆 */}
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

export default ConfirmCode;
