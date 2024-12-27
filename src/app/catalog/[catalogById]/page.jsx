'use client';

import * as React from 'react'
import { axiosRequest } from '@/utils/axiosRequest';
import Link from 'next/link';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

export default function CatalogById({ params }) {
  const [data, setData] = useState({ subCategories: [] });
  const [brands, setBrands] = useState([]);
  const [colors,setColors] = useState([])
  let { catalogById } = React.use(params);

  console.log(catalogById);
  async function getCategory(id) {
    try {
      const response = await axiosRequest(`https://store-api.softclub.tj/Category/get-category-by-id?id=${id}`);
      setData(response.data?.data || {});
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }

  async function getBrands() {
    try {
      const response = await axiosRequest('https://store-api.softclub.tj/Brand/get-brands');
      setBrands(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  }

  async function getColors() {
    try {
      let {data} = await axiosRequest.get('https://store-api.softclub.tj/Color/get-colors')
      setColors(data.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getColors()
  },[])

  useEffect(() => {
    getBrands();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (catalogById) {
        getCategory(catalogById);
      }
    };
    fetchData();
  }, [catalogById]);
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
      toast.error("Failed to add product to cart. Log in, please.");
      router.push('/login')
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

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer('bottom', false)}
      onKeyDown={toggleDrawer('bottom', false)}
    >
      <List>
        <ListItem className="xs:hidden">
          <ListItem className="grid grid-cols-1 gap-[6px]">
            <h2 className="text-[18px] font-[600]">Brands</h2>
            {brands?.length ? (
              brands.map((el) => (
                <div key={el.id} className="flex items-center gap-[5px]">
                  <input className="w-[17px] h-[17px]" type="checkbox" />
                  <span className="text-[18px]">{el.brandName}</span>
                </div>
              ))
            ) : (
              <p>No brands available</p>
            )}
          </ListItem>
        </ListItem>
  
        <ListItem className="grid grid-cols-1 gap-[5px] mt-[15px]">
          <h2 className="text-[18px] font-[600]">Colors</h2>
          {colors.map((el) => (
            <ListItem key={el.id} className="flex items-center gap-[5px]">
              <input className="w-[17px] h-[17px]" type="checkbox" />
              <p className="text-[18px]">{el.colorName}</p>
            </ListItem>
          ))}
        </ListItem>
      </List>
      <Divider />
      <List>
      </List>
    </Box>
  );
  console.log(data);
  return (
    <section className="max-w-6xl m-auto my-[130px] xs:px-[10px] xs:pt-[40px]">
      <h1 className="text-blue-600 mb-[15px]">
        Catalog / {data?.categoryName || 'Loading...'}
      </h1>
      <div className="flex flex-wrap gap-[10px]">
        {data?.subCategories?.length ? (
          data.subCategories.map((el) => {
            console.log(el.subCategoryName);
           return <Link
              href={`/catalog/${data?.categoryName}/${el.id}`}
              key={el.id}
              className="bg-gray-200 hover:bg-gray-300 rounded-[15px] py-[4px] px-[12px]"
            >
              {el.subCategoryName}
            </Link>
})
        ) : (
          <p>No subcategories available</p>
        )}
      </div>
      <section className="w-[100%] mt-[100px] flex items-start gap-[100px] xs:gap-[30px] xs:grid xs:grid-cols-1">
<div >
<div className='grid grid-cols-1 gap-[6px]'>
          <h2 className='text-[18px] font-[600]'>Brands</h2>
          {brands?.length ? (
            brands.map((el) => {
           return <div key={el.id} className='flex items-center gap-[5px]'>
              <input className='w-[17px] h-[17px]' type="checkbox" />
              <span className='text-[18px]' key={el.id}>{el.brandName}</span>
              </div>})
          ) : (
            <p>No brands available</p>
          )}
        </div>
        <div className='grid grid-cols-1 gap-[5px] mt-[15px]'>
          <h2 className='text-[18px] font-[600]'>Colors</h2>
          {colors.map((el) => {
            return(<div key={el.id} className='flex items-center gap-[5px]'>
              <input className='w-[17px] h-[17px]' type="checkbox" />
              <p className='text-[18px]'>{el.colorName}</p>
            </div>)
          })}
        </div>
</div>
<Toaster />
<span onClick={toggleDrawer('bottom', true)} className='text-[18px] text-gray-500 border-gray-500 border-[1px] py-[5px] px-[10px] rounded-[3px] w-[100px] 3xl:hidden xs:block m-auto'>Фильтры</span>
<Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
      >
        {list()}
      </Drawer>
      <section className="grid grid-cols-4 gap-[30px] mx-auto xs:grid-cols-1 xs:px-[15px] xs:gap-[20px] xs:w-[100%]">
        {products.map((el) => (
        
          <div key={el.id}>
            <div className="max-w-xs xs:m-auto rounded-lg border border-gray-300 shadow-md overflow-hidden">
            <Link href={`/${el.id}`}>
              <Image 
                src={`https://store-api.softclub.tj/images/${el.image}`} 
                width={200} 
                height={200} 
                alt="Product image"
                className="w-full h-48 object-cover"
              />
               </Link>
              <div className="p-[16px]">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{el.productName}</h3>
                <p className="text-xl font-bold text-[#1ABC9C] mt-2">
{el.price}</p>
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

      </section>
    </section>
  );
}
