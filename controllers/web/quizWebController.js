import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const showQuizManagementPage = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true }, 
        },
      },
    });

    res.render('pages/admin/quizzes', {
      pageTitle: 'Quản lý Bộ đề thi',
      quizzes: quizzes, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi máy chủ');
  }
};

const createQuizFromWeb = async (req, res) => {
  try {
    const { title, subject, timeLimit } = req.body;

    await prisma.quiz.create({
      data: {
        title: title,
        subject: subject,
        timeLimit: parseInt(timeLimit) || 45,
      },
    });

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