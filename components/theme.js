import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: {
         xs: 0,
         sm: 600,
         md: 900,
         lg: 1200,
         xl: 1440,
      },
   },
   palette: {
      mode: "light",
      primary: {
         main: "#000000",
         light: "#585858",
      },
      secondary: {
         main: "#D01E25",
      },
      text: {
   
         secondary: "#828282",
      },
   },
   typography: {
      fontFamily: ["Roboto", "Oswald"].join(","),
   },
});

// console.log(theme)
export default theme;