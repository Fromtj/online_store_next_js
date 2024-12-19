'use client';

import Baner from "@/components/baner/baner";
import { useRouter } from "next/navigation"; // Correct router hook for Next.js app directory
import { useState, useEffect } from "react";
import Card from "@/components/card/card";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_BASE_URL; // Define or import the `api` base URL

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProduct = async () => {
    try {
      const { data } = await axios.get('https://store-api.softclub.tj/Product/get-products');
      setProducts(data.data['products']);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    getProduct();
  }, [router]);

  return (<>
      <Baner />
      <section className="grid grid-cols-5 gap-[30px] max-w-6xl">
       {products.map((el,i) => {
        return <div key={i}>
         <Card title={el.productName} price={el.price} img={`${api}image/${el.image}`}/>
        </div>
       })}
      </section>
      <Card/>
    </>);
}
