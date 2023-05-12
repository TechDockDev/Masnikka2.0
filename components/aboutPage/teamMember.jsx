import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const TeamMember = () => {
   return (
      <Grid container>
         <Grid item xs={12} md={6} boxSizing={"border-box"} padding={"20px 40px"}>
            <Avatar sx={{ height: "120px", width: "120px", boxSizing: "border-box", border: "1px solid black", marginX: "auto" }} />
            <Typography variant="h3" sx={{ fontWeight: "600", fontSize: "20px", textAlign: "center", mt: 2 }}>
               John Doe
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "600", fontSize: "16px", textAlign: "center", mt: 1, color: "#3f3f3f" }}>
               Founder CEO
            </Typography>
            <Typography sx={{ color: "#3F3F3F", textAlign: "justify", mt: 1 }}>
               {" "}
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae adipisci ipsa earum aliquam doloremque asperiores! Illo aperiam quas libero voluptatum deserunt, quia praesentium veritatis, perferendis tempora labore neque fugiat ab laboriosam vero rerum blanditiis repellat omnis
               ducimus repudiandae commodi dolorem? Natus, Aspernatur quod fugiat molestiae delect{" "}
            </Typography>
         </Grid>
         <Grid item xs={12} md={6} boxSizing={"border-box"} padding={"20px 40px"}>
            <Typography variant="h3" sx={{ fontWeight: "600", fontSize: "20px" }}>
               “Lorem ipsum dolor sit amet”
            </Typography>
            <Typography sx={{ color: "#3F3F3F", textAlign: "justify", mt: 1 }}>
               {" "}
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo beatae adipisci ipsa earum aliquam doloremque asperiores! Illo aperiam quas libero voluptatum deserunt, quia praesentium veritatis, perferendis tempora labore neque fugiat ab laboriosam vero rerum blanditiis repellat omnis
               ducimus repudiandae commodi dolorem? Natus, Aspernatur quod fugiat molestiae delect{" "}
            </Typography>
         </Grid>
      </Grid>
   );
};

export default TeamMember;
