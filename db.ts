import prismaClient from '@prisma/client';
const prisma = new prismaClient.PrismaClient();

prisma.user.findFirst