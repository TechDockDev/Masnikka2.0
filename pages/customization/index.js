import CustomizationPage from "@/components/customizationPage/customizationPage";
import Layout from "@/components/layout";
import dbConnect from "@/lib/dbConnect";
import productColorModel from "@/models/product/productColorModel";
import React from "react";

const index = ({ product }) => {
  return (
    <Layout>
      <CustomizationPage product={product} />
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  await dbConnect();
  // if (context.query.) {

  // }
  const product = await productColorModel.findById(context.query.product);
  return {
    props: {
      product: JSON.stringify(product),
    },
  };
}
