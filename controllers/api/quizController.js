// File: controllers/quizController.js : Controller API: ko render,redirect EJS! chỉ dùng cho Java(CLientManager, Client)
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

    // 1. Sửa từng câu hỏi: Giữ lại dữ liệu cũ (...q) và chỉ ghi đè options
    const questionsFixed = quiz.questions.map(q => {
      let parsedOptions = [];
      try {
        parsedOptions = JSON.parse(q.options); 
      } catch (e) {
        parsedOptions = []; 
      }

      return {
        ...q,                  // <--- QUAN TRỌNG: Giữ lại id, questionText, correctAnswerIndex...
        options: parsedOptions // Ghi đè options (String -> Array)
      };
    });

    // 2. Tạo phản hồi: Giữ lại thông tin Quiz (...quiz) và thay danh sách câu hỏi mới
    const quizResponse = {
      ...quiz,                // <--- Giữ lại title, subject, timeLimit...
      questions: questionsFixed 
    };

    res.json(quizResponse);
  } catch (error) {
    console.error(error);
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