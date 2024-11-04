import DataLoader from 'dataloader';
import { PrismaClient } from '.prisma/client';
import { UUID } from 'crypto';

export const userLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (userIds: readonly UUID[]) => {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds as UUID[],
        },
      },
      include: {
        subscribedToUser: true,
        userSubscribedTo: true,
      },
    });

    return userIds.map((id) => users.find((user) => user.id === id));
  });
};
