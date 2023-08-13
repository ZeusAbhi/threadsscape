"use client";
import React, { useEffect, useState } from "react";
import { medusaClient } from "../utils/client";
import ProductCard from "../components/productcard";
import Link from "next/link";



const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const results = await medusaClient.products.list();
      setProducts(results.products);
    };

    getProducts();
  }, []);
  return (
    <>
      <div className="flex h-[100vh]   bg-slate-100 ">
        <div className="mx-5 my-5  md:flex md:flex-col md:flex-grow md:flex-nowrap flex flex-wrap gap-5 ">
          {products.map((e) => {
            return (
              <Link href={`/shop/${e.id}`} className=" flex flex-grow" key={e.id}>
                <ProductCard
                  key={e.title}
                  title={e.title}
                  desc={e.description}
                  thumb={e.thumbnail}
                  price={e.variants[0].prices[1].amount}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Shop;
