import { Grid, Stack, Typography, Divider, Box, Avatar } from "@mui/material";
import React from "react";
import TeamCarousel from "./teamCarousel";

const AboutPage = () => {
   return (
      <Stack paddingX="15px" position={"relative"}>
         <Grid
            container
            display="flex"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
               boxSizing: "border-box",
            }}>
            <Grid item xs={12} mb={2} mt={3}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "36px",
                     fontFamily: "Oswald",
                     textAlign: "center",
                     mb: 2,
                  }}>
                  About Us
               </Typography>
               <Divider />
            </Grid>
            {/* 👇  Left collage image Section 👇 */}
            <Grid item xs={12} md={6} lg={4} boxSizing={"border-box"} justifyContent={"center"} alignItems={{ xs: "center", md: "start" }} display={"flex"} padding={"10px 20px"}>
               <Box component={"img"} src="/assets/aboutUs.png" sx={{ display: "block", width: { xs: "90%", sm: "80%", md: "100%" } }} />
            </Grid>
            {/* 👆  Left collage image Section 👆 */}
            {/* 👇  THE MASNIKKA STORY SECTION 👇 */}
            <Grid item xs={12} md={6} lg={8} boxSizing={"border-box"} padding={"10px 20px"}>
               <Typography variant="h2" sx={{ fontFamily: "Oswald", fontSize: "30px", textAlign: "center" }}>
                  The Masnikka Story
               </Typography>
               <Typography sx={{ color: "#3F3F3F", textAlign: "justify", mt: 3 }}>
                  {" "}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae adipisci ipsa earum aliquam doloremque asperiores! Illo aperiam quas libero voluptatum deserunt, quia suscipit praesentium veritatis, perferendis tempora labore neque fugiat ab laboriosam vero rerum blanditiis
                  repellat omnis ducimus repudiandae commodi dolorem? Natus, debitis assumenda illum nam quae obcaecati totam, soluta perferendis itaque impedit minus inventore. Eum, fugiat? Suscipit maiores eaque nostrum assumenda quibusdam expedita placeat voluptatum quaerat totam illum sapiente
                  eos vero quam ducimus magnam nulla, natus consequatur rem tenetur a iure omnis tempore? Voluptatem et maiores sapiente, facere, vero quidem voluptate fugiat facilis culpa aut eveniet alias laudantium ipsa dolor, eos earum aliquam mollitia! Vero, tempore. Accusamus, soluta
                  aspernatur. Officiis corrupti optio animi obcaecati corporis, assumenda ut nemo itaque distinctio praesentium sit impedit, natus dolores deserunt dolor vel nam voluptatibus. Ipsam, dicta ullam consequatur deserunt dignissimos, et nam molestias voluptates reprehenderit eius
                  repellendus recusandae esse alias eaque. Commodi, blanditiis sed? Eligendi a non ratione laborum enim natus. Commodi id fugit soluta officiis saepe quasi ad maxime? Aspernatur quod fugiat molestiae delect{" "}
               </Typography>
            </Grid>
            {/* 👆  THE MASNIKKA STORY SECTION 👆 */}
            {/* 👇  OUR VISION 👇 */}
            <Grid item xs={12} md={5.8} mt={3} boxSizing={"border-box"} bgcolor={"#E1F8DC"} borderRadius={"8px"} padding={"25px 40px"}>
               <Typography variant="h2" sx={{ fontFamily: "Oswald", fontSize: "35px" }}>
                  Our Vision
               </Typography>
               <Typography sx={{ color: "#3F3F3F", textAlign: "justify", mt: 3 }}>
                  {" "}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae adipisci ipsa earum aliquam doloremque asperiores! Illo aperiam quas libero voluptatum deserunt, quia praesentium veritatis, perferendis tempora labore neque fugiat ab laboriosam vero rerum blanditiis repellat
                  omnis ducimus repudiandae commodi dolorem? Natus, Aspernatur quod fugiat molestiae delect{" "}
               </Typography>
            </Grid>
            {/* 👆  OUR VISION 👆 */}
            {/* 👇  OUR MISSION 👇 */}
            <Grid item xs={12} md={5.8} mt={3} boxSizing={"border-box"} bgcolor={"#FFF6CC"} borderRadius={"8px"} padding={"25px 40px"}>
               <Typography variant="h2" sx={{ fontFamily: "Oswald", fontSize: "35px" }}>
                  Our Mission
               </Typography>
               <Typography sx={{ color: "#3F3F3F", textAlign: "justify", mt: 3 }}>
                  {" "}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae adipisci ipsa earum aliquam doloremque asperiores! Illo aperiam quas libero voluptatum deserunt, quia praesentium veritatis, perferendis tempora labore neque fugiat ab laboriosam vero rerum blanditiis repellat
                  omnis ducimus repudiandae commodi dolorem? Natus, Aspernatur quod fugiat molestiae delect{" "}
               </Typography>
            </Grid>
            {/* 👆  OUR MISSION 👆 */}
            {/* 👇  Our Leadership Team 👇 */}
            <Grid item xs={12} mt={3} boxSizing={"border-box"} borderRadius={"8px"} padding={"25px 40px"}>
               <Avatar src="/assets/leadership.svg" sx={{ width: "75px", height: "75px", margin: "auto" }} />
               <Typography variant="h2" mt={2} sx={{ fontFamily: "Oswald", fontSize: "35px", textAlign: "center" }}>
                  Our Leadership Team
               </Typography>
            </Grid>
            {/* 👆 Our Leadership Team  👆 */}
            {/* 👇  TEAM CAROUSEL 👇 */}
            <TeamCarousel />
            {/* 👆  TEAM CAROUSEL 👆 */}
            {/* 👇  Why Choose US 👇 */}
            <Grid item xs={12}>
               <Typography variant="h2" mt={5} mb={3} sx={{ fontFamily: "Oswald", fontSize: "35px", textAlign: "center" }}>
                  Why Choose US ?
               </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/affordable.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     Affordable Cost
                  </Typography>
               </Box>
               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/freeshipping.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     Free Shipping
                  </Typography>
               </Box>
               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/available.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     24*7 Customer Support
                  </Typography>
               </Box>
               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/secure.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     Secure Payment
                  </Typography>
               </Box>
               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/quality.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     Quality Assurance
                  </Typography>
               </Box>

               <Box sx={{ padding: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }} height={"115px"}>
                  <Box component={"img"} src="/assets/easyreturn.svg" alt="" sx={{ marginX: "auto", display: "block" }} />
                  <Typography
                     variant="h6"
                     sx={{
                        fontFamily: "Oswald",
                        fontSize: "18px",
                        textAlign: "center",
                     }}>
                     Easy Returns
                  </Typography>
               </Box>
            </Grid>
            {/* 👆  Why Choose US 👆 */}
         </Grid>
      </Stack>
   );
};

export default AboutPage;
