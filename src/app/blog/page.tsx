"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "./components/Card"  
import Image from "next/image"
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from "next/link"

// Add this type definition
type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  update: () => void
  draw: () => void
}

export default function Page() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

//this is the snowfall in back 

useEffect(() => {
  if (!canvasRef.current) return

  const canvas = canvasRef.current
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: Particle[] = []
  const particleCount = 100

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number

    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.1
      this.speedX = Math.random() * 2 - 1
      this.speedY = Math.random() * 2 - 1
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width) this.x = 0
      if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      if (this.y < 0) this.y = canvas.height
    }

    draw() {
      if (!ctx) return
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function animate() {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const particle of particles) {
      particle.update()
      particle.draw()
    }

    requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    if (!canvasRef.current) return
    canvasRef.current.width = window.innerWidth
    canvasRef.current.height = window.innerHeight
  }

  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (<div>
        
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
   
      <canvas ref={canvasRef} className="absolute inset-0 h-screen w-screen bg- z-0 bg-transparent" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-12">
      
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white px-11 py-5 rounded-full text-lg font-semibold transition-colors duration-300 transform hover:scale-100 absolute top-[calc(0%+0rem)] right-[calc(0%-1rem)] h-2 w-5 flex items-center justify-center">
            Home
          </button>
        </Link>

        <motion.h1
          className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-600 to-red-600 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blogs
        </motion.h1>
        <motion.p
          className="text-2xl sm:text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Random Bits of Knowledge
        </motion.p>
        
        <div className="w-full max-w-7xl px-4">
          <Card />
        </div>
      </div>

      <Image 
        src="/blog3.png" 
        alt="Blog" 
        className="absolute top-2 left-2 bg-transparent z-30" 
        width={75} 
        height={75} 
      />
      
    </div>
    
    </div>
  )
}

