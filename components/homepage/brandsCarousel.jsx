import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItemsCarousel from "react-items-carousel";

const BrandsCarousel = () => {
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const matchesXS = useMediaQuery("(max-width:390px)");
   const matchesSM = useMediaQuery("(max-width:600px)");
   const matchesMD = useMediaQuery("(max-width:900px)");
   return (
      <Stack mt={3} position={"relative"}>
         <Box className="carouselTitleContainer">
            <Typography className="carouselTitleText">choose your brand</Typography>
         </Box>

         <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 4}
            gutter={20}
            leftChevron={<ChevronLeftIcon />}
            rightChevron={<ChevronRightIcon />}
            outsideChevron
            chevronWidth={40}
            infiniteLoop={true}
            classes={{ wrapper: "wrapper", itemsWrapper: "itemsWrapper", itemsInnerWrapper: "itemsInnerWrapper", itemWrapper: "itemWrapper", rightChevronWrapper: "rightChevronWrapper", leftChevronWrapper: "leftChevronWrapper" }}>
            <img src="/assets/adidas.png" height="100px" />
            <img src="/assets/diesel.png" height="100px" />
            <img src="/assets/nike.png" height="100px" />
            <img src="/assets/puma.png" height="100px" />
            <img src="/assets/reebok.png" height="100px" />
            <img src="/assets/timberland.png" height="100px" />
            <img src="/assets/adidas.png" height="100px" />
            <img src="/assets/diesel.png" height="100px" />
            <img src="/assets/nike.png" height="100px" />
            <img src="/assets/puma.png" height="100px" />
            <img src="/assets/reebok.png" height="100px" />
            <img src="/assets/timberland.png" height="100px" />
         </ItemsCarousel>
      </Stack>
   );
};

export default BrandsCarousel;

{
   /* <Carousel
indicators={false}
navButtonsAlwaysVisible={true}
autoPlay={false}
animation="slide"
   sx={{
     border:"1px solid green",
     paddingX:"40px"
   }}>
   <img src="/assets/adidas.png" height="100px" />
   <img src="/assets/diesel.png" height="100px" />
   <img src="/assets/nike.png" height="100px" />
   <img src="/assets/puma.png" height="100px" />
   <img src="/assets/reebok.png" height="100px" />
   <img src="/assets/timberland.png" height="100px" />
   <img src="/assets/adidas.png" height="100px" />
   <img src="/assets/diesel.png" height="100px" />
   <img src="/assets/nike.png" height="100px" />
   <img src="/assets/puma.png" height="100px" />
   <img src="/assets/reebok.png" height="100px" />
   <img src="/assets/timberland.png" height="100px" />
</Carousel> */
}
