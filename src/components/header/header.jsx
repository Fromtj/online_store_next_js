'use client';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { axiosRequest } from '@/utils/axiosRequest';
import { api } from '@/config/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function Header() {
  const path = usePathname();
  const [catalog, setCatalog] = useState(false);
  const [category, setCategory] = useState([]);
  const [idx, setIdx] = useState(null);
  const [byIdx, setbyIdx] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setToken(token);
  }, []); 

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axiosRequest.get(api + 'Category/get-categories');
        setCategory(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);
  
  useEffect(() => {
    if (idx !== null) {
      const filteredCategories = category.filter((el) => el.id !== idx);
      setbyIdx(filteredCategories);
    }
  }, [idx, category]);

  const handleCartClick = () => {
    if (!token) {
      router.push('/login');
      alert('Log in, please');
    } else {
      router.push('/korzina');
    }
  };
  const handleProfileClick = () => {
    if (!token) {
      router.push('/login');
      alert('Log in, please');
    } else {
      router.push('/profile');
    }
  };

  return (
    <>
      {catalog && (
        <div className="w-full h-screen bg-[rgba(99,98,98,0.43)] absolute z-20">
          <div className="flex justify-end">
            <CloseIcon className="m-5 cursor-pointer" onClick={() => setCatalog(!catalog)} />
          </div>
          <div className="bg-white w-full">
            {category.map((el) => (
              <div className="w-2/5 bg-gray-200" key={el.id}>
                <div className="ml-[40%] w-3/5 py-2">
                  <span
                    className="p-2 rounded hover:bg-white hover:text-[#1ABC9C] w-full cursor-pointer"
                    onMouseOver={() => setIdx(el.id)}
                  >
                    {el.categoryName}
                  </span>
                </div>
              </div>
            ))}
            {/* subcategory */}
           {}
          </div>
        </div>
      )}
      {( <header className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.23)] border-b border-gray-200 z-10">
          <div className="max-w-6xl mx-auto flex justify-between py-5 items-center">
            <div className="flex items-center gap-12">
              <Image className="w-24" src={logo} alt="Company Logo" />
              <Button
                onClick={() => setCatalog(!catalog)}
                className="flex gap-2"
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
                      borderRadius: '8px',
                      '& fieldset': { borderColor: '#E0E0E0' },
                      '&:hover fieldset': { borderColor: '#BDBDBD' },
                      '&.Mui-focused fieldset': { borderColor: '#BDBDBD' },
                    },
                    '& .MuiInputBase-input': { padding: '12px' },
                  }}
                />
              </Box>
            </div>
            <div className="flex gap-8 items-center">
              <div>
                <RoomOutlinedIcon sx={{ color: 'black' }} />
              </div>
              <div>
                <IconButton onClick={() => {handleProfileClick()}}>
                  <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={() => {handleCartClick()}}>
                  <ShoppingBasketOutlinedIcon sx={{ color: 'black' }} />
                </IconButton>
              </div>
            </div>
          </div>
        </header>)}
    </>
  );
}