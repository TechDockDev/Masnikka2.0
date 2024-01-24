import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItemsCarousel from "react-items-carousel";
import S3Image from "@/lib/getImage";

const BrandsCarousel = ({ brands }) => {
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
        classes={{
          wrapper: "wrapper",
          itemsWrapper: "itemsWrapper",
          itemsInnerWrapper: "itemsInnerWrapper",
          itemWrapper: "itemWrapper",
          rightChevronWrapper: "rightChevronWrapper",
          leftChevronWrapper: "leftChevronWrapper",
        }}
      >
        {JSON.parse(brands).map((brand) => (
          <S3Image
            key={brand._id}
            imgKey={brand.photo}
            style={{ height: "100px" }}
          />
        ))}
      </ItemsCarousel>
    </Stack>
  );
};

export default BrandsCarousel;
