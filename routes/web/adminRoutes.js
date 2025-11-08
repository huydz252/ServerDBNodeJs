import express from 'express';
import {
  //quiz
  showQuizManagementPage,
  createQuizFromWeb,
} from '../../controllers/web/quizWebController.js'; 
  
import {
  //question
  showQuizDetailPage,
  addQuestionToQuiz,
  showEditQuestionPage,   
  handleUpdateQuestion,
  handleDeleteQuestion,
} from '../../controllers/web/questionWebController.js'; 
  

const router = express.Router();

// GET /admin/quizzes - Hiển thị trang quản lý
router.get('/quizzes', showQuizManagementPage);

// POST /admin/quizzes - Xử lý tạo mới
router.post('/quizzes', createQuizFromWeb);

//show chi tiết câu hỏi
router.get('/quizzes/:id', showQuizDetailPage);

//thêm câu hỏi
router.post('/quizzes/:id/questions', addQuestionToQuiz);

//lấy-sửa câu hỏi
router.get('/questions/:id/edit', showEditQuestionPage); 
router.post('/questions/:id/edit', handleUpdateQuestion);

//xóa câu hỏi
router.delete('/questions/:id', handleDeleteQuestion);

export default router;