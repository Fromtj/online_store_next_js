'use client'

import { useState,useEffect } from "react"
import { axiosRequest } from "@/utils/axiosRequest"

export default function subCategoryById({params}) {
    let [data,setData] = useState([])
    const [brands, setBrands] = useState([]);
    const [colors,setColors] = useState([])

    async function getSubCategoryById(id) {
        try {
        let {data} = await axiosRequest('https://store-api.softclub.tj/SubCategory/get-sub-category-by-id?id=' + id)
        setData(data.data)
        }catch (error) {
        console.error(error);
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
    getSubCategoryById(params.subcategoryByid)
    })

    return(<section className="max-w-6xl m-auto my-[130px]">
    <h1 className="text-blue-600">Catalog / {data.subCategoryName}</h1>
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
    </section>)
}