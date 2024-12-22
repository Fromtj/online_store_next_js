'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { axiosRequest } from "@/utils/axiosRequest";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function Card() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProduct = async () => {
    try {
      const { data } = await axiosRequest.get('https://store-api.softclub.tj/Product/get-products');
      setProducts(data.data['products']);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    }
  };

  const addToCart = async (id) => {
    try {
      await axiosRequest.post('https://store-api.softclub.tj/Cart/add-product-to-cart?id=' + id);
      toast.success("Product added to cart successfully!");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, productInfoFromCart: true } : product
        )
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    getProduct();
  }, [router]);

  return (
    <>
      <Toaster />
      <section className="grid grid-cols-5 gap-[30px] max-w-6xl mx-auto my-[100px]">
        {products.map((el) => (
          <div key={el.id}>
            <div className="max-w-xs rounded-lg border border-gray-300 shadow-md overflow-hidden">
              <Image 
                src={`https://store-api.softclub.tj/images/${el.image}`} 
                width={200} 
                height={200} 
                alt={el.productName || "Product image"} 
                className="w-full h-48 object-cover"
              />
              <div className="p-[16px]">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{el.productName}</h3>
                <p className="text-xl font-bold text-[#1ABC9C] mt-2">{el.price}</p>
                <button 
                  onClick={() => {el.productInfoFromCart != null ? toast('This product is already in the cart.') : addToCart(el.id)}}
                  className={`mt-4 w-full py-2 ${
                    el.productInfoFromCart != null ? "bg-gray-400" : "bg-[#1ABC9C] hover:bg-[#95d8cb]"
                  } text-white rounded-lg`}                >
                  {el.productInfoFromCart == null ? "В корзину" : "В корзине"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
