'use client';
import { useRouter } from "next/navigation"; // Correct router hook for Next.js app directory
import { useEffect } from "react";

//#1ABC9C
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      Home
    </>
  );
}
