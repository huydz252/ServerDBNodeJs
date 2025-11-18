import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST /api/results
// Body: { quizId, studentMachineName, score }
export const createExamResult = async (req, res) => {
  try {
    const { quizId, studentMachineName, score } = req.body;

    if (quizId == null || studentMachineName == null || score == null) {
      return res.status(400).json({ error: 'Thiếu dữ liệu' });
    }

    const newResult = await prisma.examResult.create({
      data: {
        quizId: parseInt(quizId),
        studentMachineName: studentMachineName.toString(),
        score: parseFloat(score),
      },
    });
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi lưu kết quả thi' });
  }
};