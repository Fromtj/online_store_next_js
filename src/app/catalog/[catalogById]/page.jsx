'use client';

import { useState, useEffect } from 'react';
import { axiosRequest } from '@/utils/axiosRequest';
import Link from 'next/link';

export default function CatalogById({ params }) {
  const [data, setData] = useState({ subCategories: [] });
  const [brands, setBrands] = useState([]);
  const [colors,setColors] = useState([])

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
    if (params?.catalogById) {
      getCategory(params.catalogById);
    }
  }, [params?.catalogById]);

  return (
    <section className="max-w-6xl m-auto my-[130px]">
      <h1 className="text-blue-600 mb-[15px]">
        Catalog / {data?.categoryName || 'Loading...'}
      </h1>
      <div className="flex flex-wrap gap-[10px]">
        {data?.subCategories?.length ? (
          data.subCategories.map((el) => (
            <Link
              href={`/catalog/${data?.categoryName}/${el.id}`}
              key={el.id}
              className="bg-gray-200 hover:bg-gray-300 rounded-[15px] py-[4px] px-[12px]"
            >
              {el.subCategoryName}
            </Link>
          ))
        ) : (
          <p>No subcategories available</p>
        )}
      </div>
      <section className="w-[100%] mt-[100px]">
<div>
<div className='grid grid-cols-1 gap-[6px]'>
          <h2 className='text-[18px] font-[600]'>Brands</h2>
          {brands?.length ? (
            brands.map((el) => {
           return <div className='flex items-center gap-[5px]'>
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
      </section>
    </section>
  );
}
