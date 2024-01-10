import Layout from "@/components/layout";
import Productpage from "@/components/productpage/productpage";
import React from "react";
import Product from "@/models/product/productModel";
import Customize from "@/models/user/customizeModel";
import dbConnect from "@/lib/dbConnect";
const index = ({ product, customize }) => {
  return (
    <Layout>
      <Productpage product={JSON.parse(product)} customize={customize} />
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  await dbConnect();
  if (context.query.canvas) {
    const customize = await Customize.findById(context.params.id).populate({
      path: "product",
      populate: [
        {
          path: "brandId",
          select: "name",
        },
        { path: "categoryId" },
        {
          path: "productColor",
          populate: { path: "productSize" },
        },
      ],
    });
    console.log(customize);
    return {
      props: {
        product: JSON.stringify(customize.product),
        customize: JSON.stringify(customize),
      }, // will be passed to the page component as props
    };
  }
  const product = await Product.findById(context.params.id)
    .populate({ path: "brandId", select: "name" })
    .populate({ path: "categoryId" })
    .populate({
      path: "productColor",
      populate: { path: "productSize" },
    });
  return {
    props: { product: JSON.stringify(product) }, // will be passed to the page component as props
  };
}
