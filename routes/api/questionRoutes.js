// File: routes/questionRoutes.js
import express from 'express';
import { createQuestion } from '../../controllers//api/questionController.js';

const router = express.Router();

router.post('/', createQuestion);

export default router;