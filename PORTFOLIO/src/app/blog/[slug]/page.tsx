import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Category } from '@prisma/client'

interface PostCategory {
  category: Category
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: true }
  })

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.content.substring(0, 160)
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    }
  })

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <article className="max-w-3xl mx-auto">
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
          {post.categories.map(({ category }: PostCategory) => (
            <span
              key={category.name}
              className="bg-red-600/50 text-white px-3 py-1 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
} 