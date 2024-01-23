import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import FAQAccordion from "./faqAccordion";

const FAQs = () => {
  const faqData = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Grid
      container
      sx={{
        height: "fit-content",
        boxSizing: "border-box",
        paddingLeft: { xs: "0px", md: "20px" },
      }}
    >
      {/* ===👇 Heading👇===*/}
      <Grid item xs={12} mb={2} mt={3} height={"fit-content"}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "36px",
            fontFamily: "Oswald",
            textAlign: "center",
            mb: 2,
          }}
        >
          FAQs
        </Typography>
        <Divider />
      </Grid>
      {/* ===👆 Heading👆 ===*/}

      {/* ===👇 👇===*/}
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "24px 32px",
          height: "fit-content",
        }}
      >
        {faqData.map((ques, index) => {
          return (
            <FAQAccordion
              key={index}
              ques={"Question"}
              ans={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis similique iure ex consequatur incidunt vel fugit obcaecati sed. Dolore fuga enim accusamus. Fugit quos rerum quam. Optio placeat sunt eaque? Sapiente, facilis quam labore harum perspiciatis quo ipsum quaerat esse vero deleniti suscipit eum reprehenderit officiis accusantium nisi. Delectus repudiandae nesciunt libero porro, hic tempora ea molestiae quam sunt. Officia natus deleniti totam. Sit, excepturi tempore magnam, officia ratione expedita accusantium et inventore aspernatur neque tenetur totam in asperiores id tempora molestias iusto. Distinctio voluptate debitis illum itaque non, id laborum aliquid sequi rem corrupti earum esse architecto veniam! Doloremque placeat ut facilis mollitia totam voluptatem a ipsa dolor enim consectetur!"
              }
            />
          );
        })}
        {/* <Button
               variant="outlined"
               sx={{
                  fontFamily: "Oswald",
                  border: "2px solid #3F3F3F",
                  display:"block",
                  margin:"30px auto 10px auto",
                  "&:hover": {
                     border: "2px solid #3F3F3F",
                  },
               }}>
               View More
            </Button> */}
      </Grid>
      {/* ===👆 👆 ===*/}
    </Grid>
  );
};

export default FAQs;
