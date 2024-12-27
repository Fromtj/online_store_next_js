'use client';

import React, { useState, useEffect } from 'react';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Link from 'next/link';
import { axiosRequest } from '@/utils/axiosRequest';
import { api } from '@/config/config';
import CategoryIcon from '@mui/icons-material/Category';

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const [catalog, setCatalog] = useState(false);
  const [category, setCategory] = useState([]);
  const [idx, setIdx] = useState(null);
  const [byIdx, setByIdx] = useState([]);
  const [token, setToken] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
  }, []);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axiosRequest.get(`${api}Category/get-categories`);
        setCategory(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);

  // Update subcategories based on selected category
  useEffect(() => {
    setByIdx(category.filter((el) => el.id === idx));
  }, [category, idx]);

  // Handlers
  const handleCartClick = () => {
    if (!token) {
      alert('Log in, please');
      router.push('/login');
    } else {
      router.push('/korzina');
    }
  };

  const handleProfileClick = () => {
    if (!token) {
      alert('Log in, please');
      router.push('/login');
    } else {
      router.push('/profile');
    }
  };

  const handleCatalogClick = () => {
    router.push('/catalog');
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex items-center gap-[5px]">
            <RoomOutlinedIcon sx={{ color: 'black' }} />
            Location
          </div>
          <div className="flex items-center gap-[5px]">
            <IconButton onClick={handleProfileClick}>
              <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            Profile
          </div>
          <div className="flex items-center gap-[5px]">
            <IconButton onClick={handleCartClick}>
              <ShoppingBasketOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            Cart
          </div>
          <div className="flex items-center gap-[5px]">
            <IconButton onClick={handleCatalogClick}>
              <CategoryIcon />
            </IconButton>
            Catalog
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <>
      {catalog && (
        <div className="w-full h-screen bg-[rgba(99,98,98,0.43)] fixed top-0 left-0 z-20 overflow-hidden">
          <div className="flex justify-end">
            <CloseIcon
              className="m-5 cursor-pointer"
              onClick={() => setCatalog(false)}
            />
          </div>
          <div className="bg-white w-full h-[90%] m-auto flex items-start overflow-hidden rounded-lg">
            {/* Categories */}
            <div className="w-[40%] max-h-full py-[50px] bg-gray-200 overflow-auto">
              {category.map((el) => (
                <div className="bg-gray-200" key={el.id}>
                  <div className="ml-[40%] w-3/5 py-2">
                    <Link
                      href={`/catalog/${el.id}`}
                      className="p-2 rounded hover:bg-white hover:text-[#1ABC9C] w-full cursor-pointer"
                      onClick={() => setCatalog(false)}
                      onMouseOver={() => {
                        setIdx(el.id);
                        setCategoryName(el.categoryName);
                      }}
                    >
                      {el.categoryName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Subcategories */}
            <div className="mx-[20px] w-[60%] grid grid-cols-3 gap-x-[30px] gap-y-[15px] py-[50px] overflow-auto">
              {idx !== null &&
                byIdx.length > 0 &&
                byIdx[0]?.subCategories?.map((e) => (
                  <div key={e.id} className="w-[200px]">
                    <Link
                      href={`catalog/${categoryName}/${e.id}`}
                      onClick={() => setCatalog(false)}
                      className="hover:text-[#1ABC9C]"
                    >
                      {e.subCategoryName}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {path !== '/login' && path !== '/registration' && (
        <header className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.81)] border-b border-gray-200 z-10">
          <div className="max-w-6xl mx-auto flex justify-between py-5 items-center xs:block xs:px-[10px]">
            <div className="flex items-center gap-12">
              <div className="xs:m-auto xs:flex xs:items-center xs:justify-between xs:gap-[200px] xs:my-[10px]">
                <Image className="w-24 xs:w-[80px]" src={logo} alt="Company Logo" />
                <svg
                  onClick={toggleDrawer(true)}
                  className="md:-mr-0.75 3xl:hidden xs:block"
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
              </div>
              <Button
                onClick={() => setCatalog(!catalog)}
                className="flex gap-2 xs:hidden"
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
            <div className="flex gap-8 items-center xs:hidden">
              <div>
                <RoomOutlinedIcon sx={{ color: 'black' }} />
              </div>
              <div>
                <IconButton onClick={handleProfileClick}>
                  <PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={handleCartClick}>
                  <ShoppingBasketOutlinedIcon sx={{ color: 'black' }} />
                </IconButton>
              </div>
            </div>
          </div>
        </header>
      )}
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
