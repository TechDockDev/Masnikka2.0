import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
const Profile = () => {
  const { snackbar } = useContext(AppContext);
  const [passwordChange, setPasswordChange] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { userData, getUserData } = useContext(AppContext);
  const [newPassword, setNewPassword] = useState();
  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const passChangeMode = () => {
    setPasswordChange(!passwordChange);
  };
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };
  const inputStyle = {
    width: "90%",
    bgcolor: "white",
    ml: 2,
    mt: 1,
    border: "1px solid black",
    borderRadius: "4px",
    padding: "10px",
    "&:disabled": {
      color: "#a0a0a0",
      border: "1px solid #a0a0a0",
      borderRadius: "4px",
    },
  };

  const changePassword = async () => {
    if (newPassword.password === newPassword.confirmPassword) {
      try {
        const res = await axios.patch("/api/user/changePassword", {
          password: newPassword.password,
        });
        setPasswordChange(!passwordChange);
        snackbar("Password Changed Successfully", "success");
      } catch (error) {
        snackbar("Something went wrong", "error");
        console.log(error);
      }
    } else {
      snackbar("Password and Confirm password doesn't match", "error");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Stack
      sx={{
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 20px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "36px",
          fontFamily: "Oswald",
          textAlign: "center",
          mt: 2,
          mb: 2,
        }}
      >
        Profile
      </Typography>
      <Divider />
      <Box
        sx={{
          width: { sm: "400px" },
          border: "1px solid grey",
          borderRadius: "8px",
          mt: 2,
          marginX: "auto",
          padding: { xs: "20px 20px", sm: "20px 40px" },
        }}
      >
        <Stack alignItems={"center"} justifyContent={"center"} mb={3}>
          {/* <Avatar sx={{ width: "100px", height: "100px" }} /> */}
          <Typography fontWeight={600} mt={2} textTransform={"uppercase"}>
            {userData.name}
          </Typography>
        </Stack>

        {/* email 👇  */}
        <Grid
          container
          sx={{
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={3} md={4}>
            <Typography component={"label"} htmlFor="email">
              Email:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id="email"
              component={"input"}
              type="email"
              name="email"
              value={userData.email || ""}
              disabled
              sx={inputStyle}
            />
          </Grid>
        </Grid>
        {/* email👆  */}
        {/* mobile number 👇  */}
        <Grid
          container
          sx={{
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={3} md={4}>
            <Typography component={"label"} htmlFor="mobile">
              Mobile:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              id="mobile"
              component={"input"}
              type="string"
              name="phoneNumber"
              value={userData.phoneNumber || ""}
              disabled
              sx={inputStyle}
            />
          </Grid>
        </Grid>
        {/* mobile number👆  */}
        {/* password 👇  */}
        <Grid
          container
          sx={{
            display: "felx",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {passwordChange && (
            <>
              <Grid item xs={3} md={4}>
                <Typography component={"label"} htmlFor="password">
                  Password:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  id="password"
                  component={"input"}
                  type={visibility ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  disabled={!passwordChange}
                  sx={inputStyle}
                />
              </Grid>
            </>
          )}
          <IconButton
            onClick={toggleVisibility}
            sx={{
              position: "absolute",
              right: { xs: "0px", md: "-10px" },
              top: "10px",
              // value={passwordChange ? userData?.password : "**************"}
            }}
          >
            {passwordChange ? (
              visibility ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )
            ) : (
              ""
            )}
          </IconButton>
          {!passwordChange && (
            <Button
              onClick={passChangeMode}
              sx={{
                color: "#0F6DB1",
                fontSize: "10px",
                marginLeft: "auto",
                "&:hover": {
                  bgcolor: "white",
                  textDecoration: "underline",
                },
              }}
            >
              Change Password
            </Button>
          )}
        </Grid>
        {/* password👆  */}
        {/* CONFIRM password 👇  */}
        {passwordChange && (
          <Grid
            container
            sx={{
              display: "felx",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Grid item xs={3} md={4}>
              <Typography component={"label"} htmlFor="confirmPassword">
                Confirm Password:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                id="confirmPassword"
                component={"input"}
                type={visibility ? "text" : "password"}
                name="confirmPassword"
                // value={userData.confirmPassword}
                onChange={handleChange}
                disabled={!passwordChange}
                sx={inputStyle}
              />
            </Grid>
            <IconButton
              onClick={toggleVisibility}
              sx={{
                position: "absolute",
                right: { xs: "0px", md: "-10px" },
                top: "10px",
              }}
            >
              {passwordChange ? (
                visibility ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )
              ) : (
                ""
              )}
            </IconButton>
          </Grid>
        )}
        {/* CONFIRM password👆  */}
        {/* Buttons 👇  */}
        {passwordChange && (
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              mt: 3,
            }}
          >
            <Grid item xs={6}>
              <Button
                variant="contained"
                sx={{ margin: "auto", display: "block" }}
                onClick={changePassword}
              >
                Change Password
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={passChangeMode}
                sx={{ margin: "auto", display: "block" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
        {/* Buttons👆  */}
      </Box>
    </Stack>
  );
};

export default Profile;
