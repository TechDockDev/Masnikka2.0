import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItemsCarousel from "react-items-carousel";
import {  Grid, Paper, } from "@mui/material";
import styles from "./teamCarousel.module.css";
import TeamMember from "./teamMember";

const TeamCarousel = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const members = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   
  return (
    <Grid component={Paper} elevation={2} borderRadius={"8px"} xs={12} item mt={3} position={"relative"} boxSizing={"border-box"} padding={{xs:"20px",sm:"50px"}}>
    <ItemsCarousel
       requestToChangeActive={setActiveItemIndex}
       activeItemIndex={activeItemIndex}
       numberOfCards={1}
       gutter={20}
       leftChevron={<ChevronLeftIcon />}
       rightChevron={<ChevronRightIcon />}
       outsideChevron
       chevronWidth={40}
       infiniteLoop={true}
       classes={{ wrapper: styles.wrapper, itemsWrapper: styles.itemsWrapper, itemsInnerWrapper: styles.itemsInnerWrapper, itemWrapper: styles.itemWrapper, rightChevronWrapper: styles.rightChevronWrapper, leftChevronWrapper: styles.leftChevronWrapper }}>
       {members.map((member) => {
          return <TeamMember key={member}/> ;
       })}
    </ItemsCarousel>
 </Grid>
  )
}

export default TeamCarousel