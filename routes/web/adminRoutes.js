// File: routes/web/adminRoutes.js
import express from 'express';
import {
  showQuizManagementPage,
  createQuizFromWeb,
} from '../../controllers/quizWebController.js'; // Chú ý đường dẫn

const router = express.Router();

// GET /admin/quizzes - Hiển thị trang quản lý
router.get('/quizzes', showQuizManagementPage);

// POST /admin/quizzes - Xử lý tạo mới
router.post('/quizzes', createQuizFromWeb);

export default router;