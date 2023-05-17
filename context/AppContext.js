import React from "react";
import { useState } from "react";
const AppContext = React.createContext();


const AppProvider = ({ children }) => {
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [message, setMessage] = useState("");
   const [severity, setSeverity] = useState();
   // ===
   const [userData, setUserData] = useState("");


   const snackbar = (messageData, severityData) => {      
      setOpenSnackbar(true);
      setMessage(messageData);
      setSeverity(severityData);
   };
   const closeSnackbar =()=>{
      setOpenSnackbar(false)
   }

   return <AppContext.Provider value={{ userData, setUserData, snackbar, openSnackbar, message, severity , closeSnackbar}}>{children}</AppContext.Provider>;
};
export { AppProvider, AppContext };
