import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST /api/auth/student-login
const loginStudent = async (req, res) => {
  try {
    const { studentCode, fullName } = req.body;

    if (!studentCode || !fullName) {
      return res.status(400).json({ error: 'Thiếu Mã SV hoặc Họ tên' });
    }

    const student = await prisma.student.findUnique({
      where: {
        studentCode: studentCode
      }
    });

    if (!student) {
      return res.status(401).json({ error: 'Mã sinh viên không tồn tại' });
    }

    if (student.fullName.trim().toLowerCase() !== fullName.trim().toLowerCase()) {
       return res.status(401).json({ error: 'Họ tên không khớp với Mã SV' });
    }

    return res.status(200).json({
      message: 'Login thành công',
      student: {
        id: student.id,
        studentCode: student.studentCode,
        fullName: student.fullName,
        classParams: student.classParams
      }
    });

  } catch (error) {
    console.error("Lỗi loginStudent:", error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export { loginStudent,
}