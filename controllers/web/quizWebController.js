// File: controllers/quizWebController.js : Chỉ dùng cho quản lý data có giao diện (web ejs)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Hiển thị trang quản lý (GET)
const showQuizManagementPage = async (req, res) => {
  try {
    // 1. Lấy TẤT CẢ bộ đề từ CSDL
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true }, // Lấy cả số lượng câu hỏi
        },
      },
    });

    // 2. Render trang EJS và gửi dữ liệu qua
    res.render('pages/admin/quizzes', {
      pageTitle: 'Quản lý Bộ đề thi',
      quizzes: quizzes, // Gửi danh sách quizzes sang EJS
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi máy chủ');
  }
};

// Xử lý việc tạo bộ đề mới (POST)
const createQuizFromWeb = async (req, res) => {
  try {
    // 1. Lấy dữ liệu từ form (req.body)
    const { title, subject } = req.body;

    // 2. Tạo mới trong CSDL
    await prisma.quiz.create({
      data: {
        title: title,
        subject: subject,
      },
    });

    // 3. Quay trở lại trang quản lý
    res.redirect('/admin/quizzes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi tạo bộ đề');
  }
};

const deleteQuizFromWeb = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const deleteQuiz = await prisma.quiz.delete({
      where : {id: quizId},
    })
    res.redirect('/admin/quizzes');
  } catch (error) {
    console.log(error);
    res.status(500).send('Lỗi khi xóa bộ đề!');
  }
};

export  {
    showQuizManagementPage, createQuizFromWeb, deleteQuizFromWeb
}