'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { axiosRequest } from "@/utils/axiosRequest"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function ById({ params }) {
    const router = useRouter();
    const [data, setData] = useState(null); // Initialize as null to represent no data.
 
    async function getId(id) {
        try {
            const {data} = await axiosRequest(`https://store-api.softclub.tj/Product/get-product-by-id?id=${id}`);
            setData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
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
          toast.error("Failed to add product to cart. Log in, please.");
        }
      };

    useEffect(() => {
            getId(params.byId);   
    }, [params.id]);

    console.log(data);
    return(<>
   <section className="max-w-5xl m-auto my-[130px] flex items-start gap-[60px]">
            <div>
                {data && data.images?.map((el, index) => {
                  return <div key={index}>
                        <Image 
                            src={`https://store-api.softclub.tj/images/${el.images}`} 
                            alt="Product Image"
                            width={300} 
                            height={300} 
                        />
                    </div>
})}
            </div>
            <div>
                <h1 className="text-[30px] font-[300] text-slate-800">{data && data.productName}</h1>
                <p className="text-[15px] text-gray-500 mt-[10px] mb-[30px]">Код товаров: {data && data.code}</p>
                <p className="text-[40px] font-[700] font-mono">{data && data.price}.с</p>
                <p className="text-[15px] text-gray-500 mt-[10px]">Brand:{data && data.brand}</p>
                <p className="text-[15px] text-gray-500 mt-[10px]">Color:{data && data.color}</p>
                <button 
                  onClick={() => {data && data.productInfoFromCart.quantity != 0 ? toast('This product is already in the cart.') : addToCart(data && data.id)}}
                  className={`mt-4 w-full py-2 ${
                   data && data.productInfoFromCart.quantity > 0 ? "bg-gray-400" : "bg-[#1ABC9C] hover:bg-[#95d8cb]"
                  } text-white rounded-lg`}>
                  {data && data.productInfoFromCart.quantity == 0 ? "В корзину" : "В корзине"}
                </button>
            </div>
            {data && data.hasDiscount == true ? <div>
              <p className="text-[20px] text-gray-500">Цена со скидкой: <span className="text-[#1ABC9C] font-[400]">{data && data.price}.с</span></p>
            </div> : <div></div>}
        </section>
    </>)
}