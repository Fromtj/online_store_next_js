'use client';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import Button from '@mui/material/Button';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { axiosRequest } from '@/utils/axiosRequest';
import { api } from '@/config/config';

export default function Header() {
  let path = usePathname();
  let [catalog,setCatalog] = useState(false)
  let [category,setCategory] = useState([])

  async function getCategories() {
    try {
      const {data} = await axiosRequest.get(api + 'Category/get-categories')
      setCategory(data.data)
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   getCategories()
  },[])
  return (
    <>
    {catalog && <div className='w-[100%] h-[100vh] bg-[rgba(99,98,98,0.43)] absolute z-20'>
      <div className='flex justify-end'>
      <CloseIcon className='m-[20px]' onClick={() =>{setCatalog(!catalog)}} />
      </div>
      <div className='flex justify-center items-center'>
      <div className='bg-white w-[100%] py-[20px] flex'>
         <div>
         {category.map((el) => {
              return(<>
              <div key={el.id}>
                <span>{el.categoryName}</span>
              </div>
              </>)
            })}
         </div>
        </div>
      </div>
        </div>}
      {path === '/' && (
        <header className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.23)] border-b-[1px] border-gray-200 z-10">
          <div className="max-w-6xl m-auto flex justify-between py-[20px] items-center">
            {/* Логотип и кнопка */}
            <div className="flex items-center gap-[50px]">
              <Image className="w-[100px]" src={logo} alt="Logo" />
              <Button
              onClick={() => setCatalog(!catalog)}
                className="flex gap-[10px]"
                sx={{ bgcolor: '#1ABC9C', color: 'white' }}
              >
                <svg
                  className="md:-mr-0.75"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                Каталог товаров
              </Button>
            </div>

            {/* Поле поиска */}
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 500,
                }}
              >
                <TextField
                  placeholder="Название товара"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon sx={{ color: '#1ABC9C' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px', // Скруглённые углы
                      '& fieldset': {
                        borderColor: '#E0E0E0', // Серый бордер
                      },
                      '&:hover fieldset': {
                        borderColor: '#BDBDBD',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#BDBDBD',
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px',
                    },
                  }}
                />
              </Box>
            </div>

            {/* Иконки */}
            <div className="flex gap-[30px]">
              <div>
                <RoomOutlinedIcon sx={{ color: 'black' }} />
              </div>
              <div>
                <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
              </div>
              <div>
                <ShoppingBasketOutlinedIcon sx={{ color: 'black' }} />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
