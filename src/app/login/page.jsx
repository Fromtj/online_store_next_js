'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { api } from '@/config/config';
import { useRouter } from 'next/navigation'; // Correct import for Next.js app directory
import { useState } from 'react';

export default function LogInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function LogIn(obj) {
    try {
      const { data } = await axios.post(api + 'Account/login', obj); // Use POST and pass `obj`
      localStorage.setItem('access_token', data.data);
      router.push('/');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  }

  function handleLogIn(e) {
    e.preventDefault();
    const form = e.target;

    const userName = form['userName'].value.trim();
    const password = form['password'].value.trim();

    if (!userName || !password) {
      setErrorMessage('Both username and password are required.');
      return;
    }

    const obj = { userName, password };
    LogIn(obj);
  }

  function toRegist() {
    router.push('/registration')
  }
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <section>
        <form
          className="grid grid-cols-1 gap-5 p-5 border rounded-lg"
          onSubmit={handleLogIn}
        >
          <TextField
            name="userName"
            id="userName"
            label="Enter your username"
            variant="outlined"
            required
          />
          <TextField
            name="password"
            id="password"
            label="Enter your password"
            type="password"
            variant="outlined"
            required
          />
          <Button type="submit" variant="outlined">
            Log In
          </Button>
          <p className='text-gray-500 font-[400] text-[18px]'>If you don`t account you can regist.</p>
          <Button onClick={() => {toRegist()}} variant="outlined">
            Registration
          </Button>
        </form>
        {errorMessage && (
          <p className="text-red-500 mt-3">{errorMessage}</p>
        )}
      </section>
    </section>
  );
}
