'use client'

import { axiosRequest } from "@/utils/axiosRequest"
import { useState,useEffect } from "react"
import Link from "next/link"

export default function Catalog() {
    let [data,setData] = useState([])

    async function getCategory() {
        try {
            let {data} = await axiosRequest('https://store-api.softclub.tj/Category/get-categories')
            setData(data.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
    getCategory()
    },[])
    return(<>
    <section className="max-w-6xl m-auto my-[130px] grid grid-cols-4 gap-[50px] xs:grid-cols-1 xs:px-[10px]">
        {data.map((el) => {
            return(<div key={el.id}>
                <Link href={`/catalog/${el.id}`} className="text-black text-[18px] font-[600] hover:text-[#1ABC9C]">{el.categoryName}</Link>
                <div className="grid grid-cols-1">{el.subCategories.map((e) => {
                    return(<Link href={`/catalog/${el.categoryName}/${e.id}`} className="text-gray-600 text-[15px] hover:text-[#1ABC9C]">{e.subCategoryName}</Link>)
                })}</div>
            </div>)
        })}
    </section>
    </>)
}