'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function registerUser(obj) {
    try {
      const { data } = await axios.post(
        'https://store-api.softclub.tj/Account/register',
        obj
      );
      localStorage.setItem('access-token', data.data);
      router.push('/login');
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  }

  function handleRegistration(e) {
    e.preventDefault();
    const form = e.target;

    const obj = {
      userName: form['userName'].value.trim(),
      phoneNumber: form['phoneNumber'].value.trim(),
      email: form['email'].value.trim(),
      password: form['password'].value,
      confirmPassword: form['confirmPassword'].value,
    };

    // Basic validation
    if (
      !obj.userName ||
      !obj.phoneNumber ||
      !obj.email ||
      !obj.password ||
      !obj.confirmPassword
    ) {
      setErrorMessage('Please fill all the fields.');
      return;
    }

    if (obj.password !== obj.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(obj.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Phone number validation (basic example)
    // const phoneRegex = /^[0-9]{10,15}$/;
    // if (!phoneRegex.test(obj.phoneNumber)) {
    //   setErrorMessage('Please enter a valid phone number.');
    //   return;
    // }

    // Proceed with registration
    setErrorMessage('');
    registerUser(obj);
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <section className="w-full max-w-md">
        <form
          className="grid grid-cols-1 gap-5 p-5 border rounded-lg shadow-lg"
          onSubmit={handleRegistration}
        >
          <TextField
            name="userName"
            id="userName"
            label="Enter your username"
            variant="outlined"
            required
          />
          <TextField
            name="phoneNumber"
            id="phoneNumber"
            label="Enter your phone number"
            variant="outlined"
            required
          />
          <TextField
            name="email"
            id="email"
            label="Enter your email"
            type="email"
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
          <TextField
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm your password"
            type="password"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: 'green', color: 'white' }}
          >
            Register
          </Button>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </form>
      </section>
    </section>
  );
}