import DataLoader from 'dataloader';
import { PrismaClient } from '.prisma/client';

export const postsLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: ids as string[],
        },
      },
    });
    return ids.map((id) => posts.filter((post) => post.authorId === id));
  });
};

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });
    return ids.map((id) => posts.find((post) => post.id === id));
  });
};
