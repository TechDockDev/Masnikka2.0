import axios from "axios";
import React, { useState, useEffect } from "react";

const payment = () => {
  const [htmlContent, setHtmlContent] = useState("");
  //   useEffect(() => {
  //     async function getPaymentPage() {
  //       try {
  //         const obj = {
  //           merchant_id: "10027749",
  //           merchant_key: "ylwe1nzmqtq1k",
  //           amount: "100.00",
  //           item_name: "Test Product",
  //         };
  //         // obj.signature = generateSignature(obj, "vishesh12345");
  //         const { data } = await axios.post("/api/payment/initiatePayment", obj);
  //         console.log(data.html);
  //         setHtmlContent(data.html);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getPaymentPage();
  //   }, []);

  return (
    <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
      <input type="hidden" name="merchant_id" value="10000100" />
      <input type="hidden" name="merchant_key" value="46f0cd694581a" />
      <input type="hidden" name="amount" value="1000.00" />
      <input type="hidden" name="item_name" value="Test Product" />
      <input type="hidden" name="return_url" value="https://google.com" />
      <input type="hidden" name="cancel_url" value="https://instagram.com" />
      <input type="submit" />
    </form>
  );
};

export default payment;
