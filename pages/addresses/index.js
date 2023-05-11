import MyAccountLayout from "@/components/myAccountLayout";
import MyAddresses from "@/components/myAddresses/myAddresses";
import React from "react";

const index = () => {
   return (
      <MyAccountLayout>
         <MyAddresses />
      </MyAccountLayout>
   );
};

export default index;
