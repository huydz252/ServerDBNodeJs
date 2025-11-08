// File: routes/web/authRoutes.js
import express from 'express';
import {
  showRegisterPage,
  handleRegister,
  showLoginPage,
  handleLogin,
  handleLogout
} from '../../controllers/web/authWebController.js';

const router = express.Router();

// Đăng ký  
router.get('/register', showRegisterPage);
router.post('/register', handleRegister);

// Đăng nhập
router.get('/login', showLoginPage);
router.post('/login', handleLogin);

// Đăng xuất
router.get('/logout', handleLogout);

export default router;