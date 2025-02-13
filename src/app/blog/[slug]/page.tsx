"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Comment {
  id: string
  content: string
  author: {
    name: string
  }
  createdAt: string
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  author: {
    name: string
  }
  categories: {
    category: {
      name: string
    }
  }[]
  comments?: Comment[]
  createdAt: string
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/slug/${params.slug}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost({
          ...data,
          comments: data.comments || []
        })
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (!response.ok) throw new Error('Failed to post comment')

      const updatedPost = await response.json()
      setPost(updatedPost)
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
      alert('Failed to post comment')
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="min-h-screen bg-black text-white flex items-center justify-center">{error}</div>
  if (!post) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Post not found</div>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blogs
        </Link>
        
        <article>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-8">
            <span>By {post.author.name}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            {post.content}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.categories.map(({ category }) => (
              <span
                key={category.name}
                className="bg-red-600/50 text-white px-3 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-4 bg-gray-800 rounded mb-4 min-h-[100px]"
              required
            />
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-800 p-4 rounded">
                <p className="mb-2">{comment.content}</p>
                <div className="text-sm text-gray-400">
                  <span>{comment.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 