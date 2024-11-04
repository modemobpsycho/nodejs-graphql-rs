import { PrismaClient } from '.prisma/client';
import { userLoader } from './userLoader.js';
import { profileIdLoader, profileLoader } from './profileLoader.js';
import { memberLoader, membersLoader } from './membersLoader.js';
import { postLoader, postsLoader } from './postsLoader.js';

export const gqlLoaders = (prisma: PrismaClient) => ({
  userLoader: userLoader(prisma),
  profileLoader: profileLoader(prisma),
  profileIdLoader: profileIdLoader(prisma),
  membersLoader: membersLoader(prisma),
  memberLoader: memberLoader(prisma),
  postsLoader: postsLoader(prisma),
  postLoader: postLoader(prisma),
});
