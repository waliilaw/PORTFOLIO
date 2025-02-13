import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password_here',
    },
  })

  // Create categories with proper type annotations
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Technology' } }),
    prisma.category.create({ data: { name: 'Programming' } }),
    prisma.category.create({ data: { name: 'Web Development' } }),
  ])

  // Create a test post with proper type annotations
  await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js',
      content: 'This is a test blog post about Next.js...',
      slug: 'getting-started-with-nextjs',
      published: true,
      authorId: user.id,
      categories: {
        create: categories.map((category) => ({
          category: {
            connect: {
              id: category.id
            }
          }
        }))
      }
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 