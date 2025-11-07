// File: controllers/quizController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy dữ liệu bộ đề' });
  }
};

// GET /api/quizzes/:id
export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Không tìm thấy bộ đề' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// POST /api/quizzes
export const createQuiz = async (req, res) => {
  try {
    const newQuiz = await prisma.quiz.create({
      data: req.body,
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Không thể tạo bộ đề mới' });
  }
};