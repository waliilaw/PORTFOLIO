import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { title, content, categories, coverImage } = await request.json()
    
    // Create URL-friendly slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
    
    // For now, we'll use the test user as the author
    const author = await prisma.user.findFirst()
    if (!author) {
      return NextResponse.json(
        { error: 'No author found' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        published: true,
        imageUrl: coverImage,
        authorId: author.id,
        categories: {
          create: categories.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 