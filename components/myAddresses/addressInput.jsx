import { Grid, Typography } from "@mui/material";
import React from "react";

const AddressInput = ({labelText,type,name,value,id,onChange,placeHolder, required}) => {
   const inputStyle = {
      width: "100%",
      bgcolor: "white",      
      border: "1px solid black",
      borderRadius: "4px",
      padding: "10px",
      boxSizing:"border-box",
      "&:disabled": {
         color: "#a0a0a0",
         border: "1px solid #a0a0a0",
         borderRadius: "4px",
      },
      "&:focus-visible":{
        border:"1px solid #0F6DB1",
        outline:"none"

      }
   };
   return (
      <Grid container sx={{ display: "felx", alignItems: "center", justifyContent: "center", mt:2 }}>
         <Grid item xs={5} sm={4} md={3}>
            <Typography component={"label"} htmlFor={id}>
              {labelText} 
              {required && <span style={{color:"red", padding:"5px 10px"}}>*</span>}
            </Typography>
         </Grid>
         <Grid item xs={7} sm={8} md={9}>
            <Typography id={id} component={"input"} type={type} name={name} value={value} onChange={onChange} sx={inputStyle} placeholder={placeHolder}  required={required}/>
         </Grid>
      </Grid>
   );
};

export default AddressInput;
