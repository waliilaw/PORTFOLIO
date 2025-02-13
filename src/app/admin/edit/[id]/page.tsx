"use client"
import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/AdminNav'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Category {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  categories: {
    category: {
      id: string
      name: string
    }
  }[]
}

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch post data
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        const post: Post = await response.json()
        
        setTitle(post.title)
        setContent(post.content)
        setImageUrl(post.imageUrl || '')
        setSelectedCategories(post.categories.map(c => c.category.id))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching post:', error)
        alert('Failed to fetch post')
      }
    }

    // Fetch categories
    async function fetchCategories() {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }

    fetchPost()
    fetchCategories()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          categories: selectedCategories,
        }),
      })

      if (!response.ok) throw new Error('Failed to update post')

      alert('Post updated successfully!')
      router.push('/admin/manage')
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Featured Image</label>
              <CldUploadWidget
                uploadPreset="blog_uploads"
                onUpload={(result: any) => {
                  setImageUrl(result.info.secure_url)
                }}
              >
                {({ open }) => (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => open()}
                      className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Upload Image
                    </button>
                    {imageUrl && (
                      <div>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full max-h-48 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            <div>
              <label className="block mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded h-48"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 rounded-full ${
                      selectedCategories.includes(category.id)
                        ? 'bg-red-600'
                        : 'bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 