'use client';
import { useState, useEffect } from "react";
import { axiosRequest } from "@/utils/axiosRequest";
import Image from "next/image";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';

export default function CardK() {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);

  async function getCart() {
    try {
      const { data } = await axiosRequest.get('https://store-api.softclub.tj/Cart/get-products-from-cart');
      setCart(data.data[0].productsInCart);
      setData(data.data[0]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart products.");
    }
  }

  async function IncreaseProduct(id) {
    try {
      await axiosRequest.put(`https://store-api.softclub.tj/Cart/increase-product-in-cart?id=${id}`);
      getCart();
      toast.success("Product quantity increased.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to increase product quantity.");
    }
  }

  async function ReduceProduct(id) {
    try {
      await axiosRequest.put(`https://store-api.softclub.tj/Cart/reduce-product-in-cart?id=${id}`);
      getCart();
      toast.success("Product quantity reduced.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reduce product quantity.");
    }
  }

  async function DeleteProduct(id) {
    try {
      await axiosRequest.delete(`https://store-api.softclub.tj/Cart/delete-product-from-cart?id=${id}`);
      getCart();
      toast.success("Product removed from cart.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product.");
    }
  }

  async function Clear() {
    try {
      await axiosRequest.delete('https://store-api.softclub.tj/Cart/clear-cart');
      getCart();
      toast.success("The cart has been successfully cleared.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart.");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="max-w-6xl m-auto flex justify-between items-start xs:block xs:px-[10px] xs:pt-[50px]">
      <section className="grid grid-cols-1 gap-[20px] w-[60%] xs:w-[100%] xs:mb-[40px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[17px] text-[#1ABC9C] font-[500]"><span className="text-[15px] text-gray-500">Корзина:</span> {data['totalProducts']} товаров</h1>
          <span onClick={()=>{Clear()}} className="text-red-500 cursor-pointer">Очистить корзину</span>
        </div>
        {cart.length > 0 ? (
          cart.map((el, i) => (
            <section key={i} className="border p-4 rounded shadow flex items-start gap-[50px] xs:grid xs:grid-cols-1 xs:gap-[10px]">
              <div>
                <Image
                  src={`https://store-api.softclub.tj/images/${el.product['image']}`}
                  width={200}
                  height={200}
                  className="h-48 object-cover"
                  alt="Product Image"
                />
              </div>
              <div>
                <p className="text-[19px] font-[600]">{el.product['price']}.с</p>
                <h3 className="text-gray-800 text-[16px] font-[400]">{el.product['productName']}</h3>
                <span className="text-[16px] text-gray-600">Color: <span style={{color: el.product['color']}}>{el.product['color']}</span></span>
                <div className="flex items-center gap-2 mt-[70px]">
                  <div>
                    <IconButton onClick={() => IncreaseProduct(el.id)}>
                      <AddBoxOutlinedIcon />
                    </IconButton>
                    <span>{el.quantity}</span>
                    <IconButton onClick={() => ReduceProduct(el.id)}>
                      <IndeterminateCheckBoxOutlinedIcon />
                    </IconButton>
                  </div>
                  <IconButton onClick={() => DeleteProduct(el.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </div>
              {el.product['hasDiscount'] && (
                <div>
                  <span className="text-gray-700 text-[16px] font-[400]">Цена со скидкой: <span className="text-[#1ABC9C] font-[500]">{el.product['discountPrice']}.с</span></span>
                </div>
              )}
            </section>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>
      <section className="bg-slate-200 p-[30px] rounded-[10px] grid grid-cols-1 gap-[10px] mt-[50px]">
        <p>Количество...............................{data['totalProducts']}</p>
        <p>Сумма.....................................{data['totalPrice']}.с</p>
        <p>Сумма со скидкой....................{data['totalDiscountPrice']}.с</p>
      </section>
      <Toaster />
    </section>
  );
}
