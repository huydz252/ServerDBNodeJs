// File: controllers/authWebController.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// --- ĐĂNG KÝ (REGISTER) ---

// Hiển thị form đăng ký
export const showRegisterPage = (req, res) => {
  res.render('pages/auth/register', { pageTitle: 'Đăng ký' });
};

// Xử lý đăng ký
export const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    // 2. Lưu vào CSDL
    await prisma.adminUser.create({
      data: {
        username: username,
        passwordHash: passwordHash
      }
    });
    // 3. Chuyển đến trang đăng nhập
    res.redirect('/auth/login');
  } catch (error) {
    // Lỗi (có thể do trùng username)
    console.error(error);
    res.redirect('/auth/register');
  }
};

// --- ĐĂNG NHẬP (LOGIN) ---

// Hiển thị form đăng nhập
export const showLoginPage = (req, res) => {
  res.render('pages/auth/login', { pageTitle: 'Đăng nhập' });
};

// Xử lý đăng nhập
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Tìm user
    const user = await prisma.adminUser.findUnique({
      where: { username: username }
    });
    if (!user) {
      // Không tìm thấy user
      return res.redirect('/auth/login');
    }

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      // Sai mật khẩu
      return res.redirect('/auth/login');
    }

    // 3. ĐĂNG NHẬP THÀNH CÔNG: Lưu thông tin vào session
    req.session.userId = user.id;
    req.session.username = user.username;

    // 4. Chuyển đến trang admin
    res.redirect('/admin/quizzes');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/login');
  }
};

// --- ĐĂNG XUẤT (LOGOUT) ---
export const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin/quizzes'); // Nếu lỗi, cứ về trang admin
    }
    res.clearCookie('connect.sid'); // Xóa cookie session
    res.redirect('/auth/login'); // Về trang login
  });
};