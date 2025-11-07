// File: routes/quizRoutes.js
import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
} from '../../controllers/quizController.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);

export default router;