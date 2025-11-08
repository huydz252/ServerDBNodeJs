import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = await prisma.question.create({
      data: req.body,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể tạo câu hỏi mới' });
  }
};