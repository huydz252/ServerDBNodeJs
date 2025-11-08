// File: middleware/authMiddleware.js

export const requireLogin = (req, res, next) => {
  // 1. Kiểm tra xem session có thông tin userId hay không
  if (req.session && req.session.userId) {
    // 2. Nếu CÓ, cho phép đi tiếp
    return next();
  } else {
    // 3. Nếu KHÔNG, đá về trang đăng nhập
    return res.redirect('/auth/login');
  }
};