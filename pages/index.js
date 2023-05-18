import Homepage from "@/components/homepage/homepage";
import Layout from "@/components/layout";
import dbConnect from "@/lib/dbConnect";
import brandModel from "@/models/product/brandModel";
import categoriesModel from "@/models/product/categoriesModel";
import productColorModel from "@/models/product/productColorModel";
import Product from "@/models/product/productModel";
import productSizeModel from "@/models/product/productSizeModel";

export default function Home({ products }) {
   // console.log(products);

   return (
      <Layout>
         <Homepage products={JSON.parse(products)} />
      </Layout>
   );
}

export async function getServerSideProps(context) {
   await dbConnect();
   let products = await Product.find({ visibility: true })
      .populate({ path: "brandId" })
      .populate({ path: "categoryId" })
      .populate({ path: "productColor", populate: { path: "productSize" } })
      .limit(12);

   products = JSON.stringify(products);

   return {
      props: { products: products }, // will be passed to the page component as props
   };
}
