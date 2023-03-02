import React from "react";
import { useParams } from "react-router-dom";

import { Paper } from "@mui/material";

import { GetProduct } from "../hooks/GetProduct";
import ReviewSection from "../components/review/ReviewSection";

const Product = () => {
  const { productId } = useParams();

  const { loading, error, data } = GetProduct(productId);

  if (loading) return <div>Spinner</div>;
  if (error) return <div>Error</div>;
  if (data) {
    const product = data.product;
    return (
      <React.Fragment>
        <div className="grid sm:grid-cols-5 gap-5 sm:gap-6 lg:gap-7 xl:gap-9 2xl:gap-10 mb-6">
          <Paper
            elevation={3}
            className="sm:col-span-2 !bg-green-500 h-[85vw] sm:h-[35vw] md:h-[32.5vw] !rounded-lg"
          >
            <img
              src={product.image}
              alt=""
              className="rounded-lg h-full w-full !object-cover"
            />
          </Paper>
          <div className="sm:col-span-3 border-b pb-6 sm:pb-0 flex flex-col">
            <div className="flex items-center">
              <h1 className="mr-4">{product.name}</h1>
              {product.onSale && (
                <h3 className="bg-red-500 text-white rounded-lg px-2">Sale</h3>
              )}
            </div>
            <hr className="mt-3 mb-6 sm:mb-0" />
            <div className="h-full flex flex-col sm:justify-center md:gap-1 lg:gap-3 xl:gap-5 2xl:gap-7">
              <h2 className="mb-3">$ {product.price.toFixed(2)}</h2>
              <p className="mb-3">
                <strong>Category:</strong>{" "}
                {product.category && product.category.name}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          </div>
        </div>
        <ReviewSection product={product} />
      </React.Fragment>
    );
  }
};

export default Product;
