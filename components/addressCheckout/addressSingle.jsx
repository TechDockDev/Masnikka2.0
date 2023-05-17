import { Button, Radio, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const AddressSingle = () => {
   const [selectedAdd, setSelectedAdd] = useState("");
   const handleChange = (e) => {
      setSelectedAdd(e.target.value);
   };
   return (
      <Stack paddingY={"20px"} borderBottom={"1px dashed grey"}>
         <Stack direction={"row"}>
            <Radio
               checked={selectedAdd !== ""}
               onChange={handleChange}
               value="a"
               name="radio-buttons"
               inputProps={{ "aria-label": "A" }}
               disableRipple
               sx={{
                  width: "fit-content",
                  padding: "0",
                  mr:1
               }}
            />
            <Typography fontWeight={"600"} fontSize={"18px"}>
               John Doe
            </Typography>
         </Stack>
         <Typography mt={1} color={"#3F3F3F"}>254, Loreum Lipsum, Loreum Lipsum, Loreum, Uttar Pradesh, India - 1234 56</Typography>
         <Typography mt={1} >9876543210</Typography>
      { selectedAdd !== "" &&  <Button variant="contained" fullWidth sx={{
          display:"block",
          mt:2,
          fontFamily:"Oswald",
          borderRadius:"4px",
         }} >Deliver here</Button>}
      </Stack>
   );
};

export default AddressSingle;
