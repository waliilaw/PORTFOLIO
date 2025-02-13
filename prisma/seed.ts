const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // First check if user exists
  let user = await prisma.user.findFirst({
    where: { email: 'test@example.com' }
  })

  // Create user only if it doesn't exist
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password_here',
      },
    })
  }

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' }
    }),
    prisma.category.upsert({
      where: { name: 'Programming' },
      update: {},
      create: { name: 'Programming' }
    }),
    prisma.category.upsert({
      where: { name: 'Web Development' },
      update: {},
      create: { name: 'Web Development' }
    })
  ])

  // Create or update the test post
  await prisma.post.upsert({
    where: { slug: 'getting-started-with-nextjs' },
    update: {
      coverImage: 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop'
    },
    create: {
      title: 'Getting Started with Next.js',
      content: 'This is a test blog post about Next.js...',
      slug: 'getting-started-with-nextjs',
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop',
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
    }
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