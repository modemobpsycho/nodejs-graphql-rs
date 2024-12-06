import DataLoader from 'dataloader';
import { PrismaClient } from '.prisma/client';

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: {
          in: ids as string[],
        },
      },
    });
    return ids.map((id) => profiles.find((profile) => profile.userId === id));
  });
};

export const profileIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const profiles = await prisma.profile.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });
    return ids.map((id) => profiles.find((profile) => profile.id === id));
  });
};
