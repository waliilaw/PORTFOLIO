"use client"
import { useEffect, useState } from 'react'
import { FocusCards } from "@/components/ui/focus-cards"

interface Post {
  id: string
  title: string
  content: string
  slug: string
  coverImage: string | null
  author: {
    name: string
  }
  categories: {
    category: {
      name: string
    }
  }[]
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
        console.log('Fetched posts (detailed):', JSON.stringify(data, null, 2))
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

  const cards = posts.map(post => ({
    title: post.title,
    src: post.coverImage || 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop',
    slug: post.slug
  }))

  console.log('Transformed cards:', cards)

  return (
    <div className="w-full">
      <FocusCards cards={cards} />
    </div>
  )
}



