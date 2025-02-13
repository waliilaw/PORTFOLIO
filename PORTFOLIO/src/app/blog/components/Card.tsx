"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Category } from '@prisma/client'

interface PostCategory {
  category: Category
}

interface Post {
  id: string
  title: string
  content: string
  slug: string
  author: {
    name: string
  }
  categories: PostCategory[]
  createdAt: string
}

export function Card() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-300 mb-4">
              {post.content.substring(0, 150)}...
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(({ category }) => (
                <span
                  key={category.name}
                  className="bg-red-600/50 text-white px-2 py-1 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className="text-gray-400 text-sm">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
} 