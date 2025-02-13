"use client"
import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import AdminNav from '@/components/AdminNav'

interface Category {
  id: string
  name: string
}

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  // Check if Cloudinary is configured
  if (!cloudName || !uploadPreset) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <AdminNav />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Configuration Error</h1>
          <p className="text-red-500">
            Cloudinary configuration is missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET environment variables.
          </p>
        </div>
      </div>
    )
  }

  // Fetch categories when the page loads
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          coverImage: imageUrl,
          categories: selectedCategories,
        }),
      })

      if (!response.ok) throw new Error('Failed to create post')

      setTitle('')
      setContent('')
      setImageUrl('')
      setSelectedCategories([])
      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
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
              <label className="block mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded min-h-[200px]"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Featured Image</label>
              <CldUploadWidget
                uploadPreset={uploadPreset}
                onUpload={(result: any) => {
                  if (result.info?.secure_url) {
                    setImageUrl(result.info.secure_url)
                  }
                }}
              >
                {({ open }) => (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => open?.()}
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
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 