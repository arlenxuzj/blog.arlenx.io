import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = req.query.slug!.toString();

    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: { slug }
      });

      res.status(200).json(post);
    } else if (req.method === 'POST') {
      const newOrUpdatedPost = await prisma.post.upsert({
        where: { slug },
        update: {
          count: {
            increment: 1
          }
        },
        create: {
          slug
        }
      });

      res.status(200).json(newOrUpdatedPost);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export default handler;
