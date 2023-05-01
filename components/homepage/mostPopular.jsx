import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItemsCarousel from "react-items-carousel";
import { Box, Stack, Typography } from "@mui/material";
import SingleProduct from "../singleProduct";
import styles from "./mostPopular.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const MostPopular = () => {
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   const matchesXS = useMediaQuery("(max-width:390px)");
   const matchesSM = useMediaQuery("(max-width:600px)");
   const matchesMD = useMediaQuery("(max-width:900px)");
   // console.log('->', matches);

   return (
      <Stack mt={3} position={"relative"}>
         <Box>
            <Typography fontFamily={"Oswald"} fontSize={"30px"}>
               Most Popular
            </Typography>
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
            classes={{ wrapper: styles.wrapper, itemsWrapper: styles.itemsWrapper, itemsInnerWrapper: styles.itemsInnerWrapper, itemWrapper: styles.itemWrapper, rightChevronWrapper: styles.rightChevronWrapper, leftChevronWrapper: styles.leftChevronWrapper }}>
            {products.map((product) => {
               return <SingleProduct key={product} />;
            })}
         </ItemsCarousel>
      </Stack>
   );
};

export default MostPopular;
