"use client";
import { Stack } from '../components/Stack';
import React, { useEffect } from "react";
import { Type } from '@/components/Type';
// import {Tweet} from '../components/Tweet';
// import { Number } from "@/components/Number";
import { Analytics } from "@vercel/analytics/react"
import { motion } from "framer-motion"
import Link from "next/link"
// import Image from "next/image"

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import CodeIcon from '@mui/icons-material/Code';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Projects from '@/components/Projects';
// import { Connect } from '@/components/Connect';


// import { Scroll } from "@/components/Scroll";
export default function Page() {
  useEffect(() => {
    // Force dark mode on the entire site
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>

  <Analytics />
      <div className="h-[200rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <p className="text-6xl sm:text-7xl font-bold absolute top-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Hi! I&apos;m{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-orange-600 py-8">Wali</span>
        </p>

        {/* Image below the text with margin-top */}
        <img
          src="/PFP.jpg"
          alt="Wali"
          className="rounded-full h-80 w-50 absolute top-[calc(3%+2rem)] left-1/2 transform -translate-x-1/2 opacity-85"
        />

        {/* <div className="absolute top-[calc(0%+0rem)] right-0">
        <Number />
        </div> */}

<div className ="cursor-pointer ">


<GitHubIcon
  sx={{
    background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
    borderRadius: "30%",
    padding: "8px",
    color: "white",
    opacity: "0.8",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: "1",
    },
    "&:active": {
      opacity: "1",
    },
  }}
  fontSize="large" 
  onClick={() => window.open("https://github.com/waliilaw/")}
  className="absolute top-[calc(5%+2rem)] left-[calc(20%-2rem)]"
/>

<InstagramIcon
sx={{
  background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
  borderRadius: "30%",
  padding: "8px",
  color: "white",
  opacity: "0.8",
  transition: "opacity 0.3s ease",
  "&:hover": {
    opacity: "1",
  },
  "&:active": {
    opacity: "1",
  },
}}
  fontSize="large"
  onClick={() => window.open("https://www.instagram.com/waliilaww/")}
  className="absolute top-[calc(5%+2rem)] right-[calc(21%-2rem)]"
/>

<LinkedInIcon
 sx={{
  background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
    borderRadius: "30%",
    padding: "8px",
    color: "white",
    opacity: "0.8",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: "1",
    },
    "&:active": {
      opacity: "1",
    },
}}
  fontSize="large"
  onClick={() => window.open("https://www.linkedin.com/in/humaidwali20/")}
  className="absolute top-[calc(7.5%+2rem)] left-[calc(20%-2rem)]"
/>

<GraphicEqIcon sx={{
    background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
    borderRadius: "30%",
    padding: "8px",
    color: "white",
    opacity: "0.8",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: "1",
    },
    "&:active": {
      opacity: "1",
    },
  }}
  fontSize="large"
  onClick={() => {window.open("https://music.youtube.com/playlist?list=PLpW-D5yMNMq3t6vjZAtMmIR-ZbxrtoLrj&si=7tVUFHhSVgyOXIyl")}}
  className="absolute top-[calc(7.5%+2rem)] right-[calc(21%-2rem)]" 
  />

<XIcon
sx={{
  background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
    borderRadius: "30%",
    padding: "8px",
    color: "white",
    opacity: "0.8",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: "1",
    },
    "&:active": {
      opacity: "1",
    },
}}
  fontSize="large"
  onClick={() => window.open("https://x.com/Waliilaww")}
  className="absolute top-[calc(10%+2rem)] left-[calc(20%-2rem)]"
/>

<CodeIcon
  sx={{
    background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
    borderRadius: "30%",
    padding: "8px",
    color: "white",
    opacity: "0.8",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: "1",
    },
    "&:active": {
      opacity: "1",
    },
  }}
  fontSize="large"
  onClick={() => window.open("https://leetcode.com/u/waliilaw/")}
  className="absolute top-[calc(10%+2rem)] right-[calc(21%-2rem)]"
/>
</div>

        <Stack />        
        
        <div className="  absolute top-[calc(14.6%+2rem)] left-[calc(18%-2rem)] right-[calc(21%-2rem)]">
        <Type />
        </div>

<div className='absolute top-[calc(39%+8rem)]  pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-400 to-black bg-clip-text text-center text-2xl font-semibold leading-none text-transparent dark:from-black dark:to-white'>
Here are some of my
</div>

      <div className="absolute top-[calc(42%+5rem)]  pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-400 to-black bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-black dark:to-gray-100 ">
        ProJects
      </div>

<div className='absolute bottom-0 '>

      <Projects/>

</div>


</div>
        {/* <Tweet id="your-tweet-id" apiUrl="https://x.com/Waliilaww/status/1882463874462749016" /> */}
        {/* <div className='absolute bottom-[calc(10%+2rem)'>
        <Scroll />
        </div>
      </div> */}

      {/* Blog Button */}
     
        <Link href="/blog">
          <button className="bg-orange-500 hover:bg-orange-700 text-white px-11 py-5 rounded-full text-lg font-semibold transition-colors duration-300 transform hover:scale-100 absolute top-[calc(0%+0.8rem)] left-[calc(0%-1rem)] h-2 w-5 flex items-center justify-center">
            Blog
          </button>
        </Link>

    </>
  )
}