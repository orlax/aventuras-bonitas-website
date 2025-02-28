"use client";
import React from "react";
import Product from "./cards/Product";

const ProductList = ({
  productListDict,
}: {
  productListDict: {
    title: string;
    description: string;
    dev_to_company: string;
    small_img: string;
  }[];
}) => {
  return (
    <div className="flex flex-row gap-4 flex-wrap w-full">
      {productListDict.map((product, index) => (
        <Product key={`product_${index}`} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
