import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const showQuizDetailPage = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    
    // 1. Lấy thông tin bộ đề
    // 2. Lấy kèm TẤT CẢ câu hỏi thuộc về bộ đề đó
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true, // Đây là mấu chốt!
      },
    });

    if (!quiz) {
      return res.status(404).send('Không tìm thấy bộ đề');
    }

    // 3. Render trang EJS mới và gửi dữ liệu qua
    res.render('pages/admin/quiz-detail', {
      pageTitle: `Quản lý: ${quiz.title}`,
      quiz: quiz, // Gửi toàn bộ đối tượng quiz (có kèm questions)
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi máy chủ');
  }
};

const addQuestionToQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const { questionText, option1, option2, option3, option4, correctAnswerIndex } = req.body;

    // 1. Gom các options lại thành 1 mảng JSON
    const options = [option1, option2, option3, option4];

    // 2. Tạo câu hỏi mới trong CSDL, gắn nó với quizId
    await prisma.question.create({
      data: {
        questionText: questionText,
        options: options, // Lưu mảng options
        correctAnswerIndex: parseInt(correctAnswerIndex), // Chuyển sang số
        quizId: quizId, // Gắn vào bộ đề
      },
    });

    // 3. Quay trở lại trang chi tiết của bộ đề đó
    res.redirect(`/admin/quizzes/${quizId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi thêm câu hỏi');
  }
};

// HIỂN THỊ TRANG SỬA CÂU HỎI (GET)
const showEditQuestionPage = async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return res.status(404).send('Không tìm thấy câu hỏi');
    }

    res.render('pages/admin/question-edit', {
      pageTitle: 'Chỉnh sửa câu hỏi',
      question: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi máy chủ');
  }
};

// XỬ LÝ CẬP NHẬT CÂU HỎI (POST)
const handleUpdateQuestion = async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const { questionText, option1, option2, option3, option4, correctAnswerIndex } = req.body;
    const options = [option1, option2, option3, option4];

    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        questionText: questionText,
        options: options,
        correctAnswerIndex: parseInt(correctAnswerIndex),
      },
    });
    res.redirect(`/admin/quizzes/${updatedQuestion.quizId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi cập nhật câu hỏi');
  }
};
const handleDeleteQuestion = async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);

    // 1. Xóa câu hỏi khỏi CSDL
    const deletedQuestion = await prisma.question.delete({
      where: { id: questionId },
    });

    // 2. Chuyển hướng người dùng trở lại trang chi tiết của bộ đề
    res.redirect(`/admin/quizzes/${deletedQuestion.quizId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi xóa câu hỏi');
  }
};

export {
    showQuizDetailPage, addQuestionToQuiz, handleUpdateQuestion, showEditQuestionPage,
    handleDeleteQuestion
}