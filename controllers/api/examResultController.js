import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST /api/results
export const createExamResult = async (req, res) => {
  try {
    const { quizId, studentMachineName, fullName, studentCode, score, className, submittedAt } = req.body;

    if (
        quizId == null || studentMachineName == null || fullName == null || 
        studentCode == null || score == null || className == null || submittedAt == null
      ) {
      return res.status(400).json({ error: 'Thiếu dữ liệu' });
    }

    //lấy studentId:
    let realStudentId = null;
    if (studentCode) {
      const student = await prisma.student.findUnique({
        where: { studentCode: studentCode.toString() }
      });
      
      if (student) {
        realStudentId = student.id; 
      }
    }

    const newResult = await prisma.examResult.create({
      data: {
        quizId: parseInt(quizId),
        studentMachineName: studentMachineName.toString() ,
        fullName: fullName ? fullName.toString() : (studentCode || "Unknown Student"),
        studentId : realStudentId,
        studentCode : studentCode.toString(),        
        score: parseFloat(score),
        className : className ? className.toString() : "Unknown",
        submittedAt : submittedAt ? new Date(submittedAt) : undefined
      },
    });
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi lưu kết quả thi' });
  }
};