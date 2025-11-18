import express from 'express';

import { createExamResult } from '../../controllers/api/examResultController.js';

const router = express.Router();

//Post create
router.post('/', createExamResult);

export default router;