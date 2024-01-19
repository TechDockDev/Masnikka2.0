import Layout from "@/components/layout";
import MyDesigns from "@/components/myDesigns/myDesigns";
import dbConnect from "@/lib/dbConnect";
import Customize from "@/models/user/customizeModel";
import * as jose from "jose";
import React from "react";

const index = ({ customize, productCount }) => {
  return (
    <Layout>
      <MyDesigns customize={customize} productCount={productCount} />
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  try {
    const decoded = await jose.jwtVerify(
      context.req.cookies.bearerToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    await dbConnect();
    const { page } = context.query;
    const skip = page * 10 - 10;
    const customize = await Customize.find({
      user: decoded.payload.id,
    })
      .populate({
        path: "productColor",
        populate: { path: "productSize" },
      })
      .populate({
        path: "product",
        populate: { path: "brandId" },
      })
      .skip(skip)
      .limit(10);
    const productCount = await Customize.count({
      user: decoded.payload.id,
    });
    return {
      props: {
        customize: JSON.stringify(customize),
        productCount,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
