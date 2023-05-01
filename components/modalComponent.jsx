import { Modal, Paper, Box, Stack, IconButton } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ModalComponent = ({ children, openModal, toggleModal }) => {
   return (
      <Modal
         open={openModal}
         // open={true}
         onClose={toggleModal}
         aria-labelledby="login-modal"
         aria-describedby="login_modal"
         closeAfterTransition
         sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
         <Paper
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: { xl: 500, lg: 500, md: 500, sm: 400, xs: "90%" },
               bgcolor: " rgba(0, 0, 0, 0.5)",
               border: "1px solid rgba(255, 255, 255, 0.5)",
               borderRadius: "4px",
               boxSizing:"border-box",
               p: 5,
               pt: 1,
            }}>
            <Stack bgcolor={"transparent"} mt={3}>
               {/* 👇container for heading text and logo img's container👇  */}

               {/* 👇Cross icon to close the modal👇  */}
               <IconButton onClick={toggleModal} sx={{ color: "white", position: "absolute", right: "10px", top: "10px" }}>
                  <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
               </IconButton>
               {/*👆 Cross icon to close the modal👆  */}
               <Box bgcolor={"transparent"}>
                  {/* 👇container for logo img👇  */}
                  <Box bgcolor={"transparent"} sx={{ width: "80%", m:"auto" }}>
                     <Box component={"img"} src="/assets/masnikka_logo.png" width="100%" height="100%" bgcolor="transparent" />
                  </Box>
                  {/*👆 container for logo img👆  */}
               </Box>
               {/*👆 container for heading text and logo img's container👆  */}
               {/* 👇container for logo img👇  */}
               {children}
               {/*👆 container for logo img👆  */}
            </Stack>
         </Paper>
      </Modal>
   );
};

export default ModalComponent;
