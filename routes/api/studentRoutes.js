// File: routes/studentRoutes.js
import express from 'express';
import {
  loginStudent
} from '../../controllers/api/studentController.js';

const router = express.Router();

router.post('/', loginStudent);

export default router;