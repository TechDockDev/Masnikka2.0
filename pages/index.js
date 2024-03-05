import Homepage from "@/components/homepage/homepage";
import Layout from "@/components/layout";
import dbConnect from "@/lib/dbConnect";
import brandModel from "@/models/product/brandModel";
import categoriesModel from "@/models/product/categoriesModel";
import productColorModel from "@/models/product/productColorModel";
import productSizeModel from "@/models/product/productSizeModel";
import Product from "@/models/product/productModel";
import React, { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function Home({ products, brands, categories, totalPages }) {
  const router = useRouter();
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        // alert("This page is reloaded");
        router.replace("/", undefined, { shallow: true });
      }
    }
  }, []);

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Layout>
        {loading ? (
          <Box sx={center}>
            <CircularProgress sx={{ color: "maroon" }} />
          </Box>
        ) : (
          <Homepage
            products={JSON.parse(products)}
            brands={brands}
            categories={categories}
            totalPages={totalPages}
          />
        )}
      </Layout>
    </ErrorBoundary>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const targetBrandNames = context.query.brands
    ? JSON.parse(context.query.brands)
    : []; // Array of brandId names to match
  const targetCategoryNames = context.query.categories
    ? JSON.parse(context.query.categories)
    : []; // Array of category names to match
  const sizes = context.query.sizes ? JSON.parse(context.query.sizes) : [];
  const { lowerLimit, upperLimit } = context.query.price
    ? JSON.parse(context.query.price)
    : { lowerLimit: 0, upperLimit: -1 };
  const page = parseInt(context.query.page) || 0;
  const products = await Product.find({ visibility: true })
    .populate({ path: "brandId" })
    .populate({ path: "categoryId" })
    .populate({ path: "productColor", populate: { path: "productSize" } });
  let filteredProducts = products;
  if (targetBrandNames.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const productBrandName = product.brandId ? product.brandId.name : "";
      return targetBrandNames.includes(
        productBrandName.replace(/\s/g, "").toLowerCase()
      );
    });
  }

  if (targetCategoryNames.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const categoryName = product.categoryId ? product.categoryId.name : "";
      return targetCategoryNames.includes(categoryName.toLowerCase());
    });
  }

  if (sizes.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const productSizes = product.productColor.map(
        (color) => color.productSize
      );
      const productSizesArr = productSizes[0].map((color) => color.size);
      return sizes.some((size) => productSizesArr.includes(size));
    });
  }
  if (lowerLimit >= 0 && upperLimit >= 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const price =
        (product.productColor[0].productSize[0].unitPrice *
          (100 - product.discountPercent)) /
        100;
      return lowerLimit <= price && price <= upperLimit;
    });
  }
  const totalPages = Math.ceil(filteredProducts.length / 12);
  page === 0
    ? (filteredProducts = filteredProducts.slice(0, 12))
    : (filteredProducts = filteredProducts.slice((page - 1) * 12, page * 12));
  const brands = await brandModel.find({});
  const categories = await categoriesModel.find({});
  return {
    props: {
      products: JSON.stringify(filteredProducts) || "[]",
      brands: JSON.stringify(brands),
      categories: JSON.stringify(categories),
      totalPages,
    }, // will be passed to the page component as props
  };
}
