"use client";
import Product from "@/app/components/product";
import { medusaClient } from "@/app/utils/client";
import React, { useEffect, useState } from "react";

const productDetails = () => {
  const[product,setProduct]=useState([]);
  const [variants,setVariants]=useState([]);
  const[price,setPrice]=useState(0)

  useEffect(() => {
    const getProduct=async ()=>{
      var url = window.location.href;
      var productID = url.substring(url.lastIndexOf("/shop/") + 6);
      const results=await medusaClient.products.retrieve(productID)
      setPrice(results.product.variants[0].prices[1].amount);
      setProduct(results.product)
    }
    getProduct()
    
  }, []);
  useEffect(()=>{
     setVariants(product.variants)
  },[product])
  return (
    <>
     <Product title={product.title} thumb={product.thumbnail} desc={product.description} weight={product.weight} price={price} variants={variants} />
    </>
  );
};

export default productDetails;
