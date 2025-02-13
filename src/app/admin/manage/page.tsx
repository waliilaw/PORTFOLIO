"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNav from '@/components/AdminNav'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Post {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
}

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      setPosts(posts.filter(post => post.id !== id))
      alert('Post deleted successfully')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Posts</h1>
            <Link 
              href="/admin" 
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Create New Post
            </Link>
          </div>

          <div className="space-y-4">
            {posts.map(post => (
              <div 
                key={post.id} 
                className="bg-gray-800 p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/admin/edit/${post.id}`}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 