import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 