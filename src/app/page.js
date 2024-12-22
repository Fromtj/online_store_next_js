'use client';
import Baner from "@/components/baner/baner";
import { useRouter } from "next/navigation"; // Correct router hook for Next.js app directory
import { useState, useEffect } from "react";
import Card from "@/components/card/card";
import axios from "axios";

export default function Home() {

  return (<>
      <Baner />
      <Card/>
    </>);
}
