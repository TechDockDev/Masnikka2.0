import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQAccordion = ({ ques, ans }) => {
   return (
      <Accordion elevation={0} >
         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography fontSize={"16px"} fontWeight={"bold"}>{ques}</Typography>
         </AccordionSummary>
         <AccordionDetails>
            <Typography fontSize={"14px"} color={"#3F3F3F"}>{ans}</Typography>
         </AccordionDetails>
      </Accordion>
   );
};

export default FAQAccordion;
