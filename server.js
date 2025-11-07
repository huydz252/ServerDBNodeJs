// File: server.js
import express from 'express';
import 'dotenv/config';
import path from 'path'; 
import session from 'express-session';

// Import router
import quizApiRoutes from './routes/api/quizRoutes.js';
import questionApiRoutes from './routes/api/questionRoutes.js';
import webAdminRoutes from './routes/web/adminRoutes.js';
import webAuthRoutes from './routes/web/authRoutes.js'; // <-- THÊM

// 2. Khởi tạo
const app = express();
const PORT = process.env.PORT || 3000;

// Lấy đường dẫn thư mục hiện tại (cần cho EJS và public)
const __dirname = path.resolve();

// 3. Cấu hình View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Báo cho Express biết thư mục views ở đâu

// 4. Cấu hình Middleware
app.use(express.json()); // Cho API
app.use(express.urlencoded({ extended: true })); // Cho Form Web
app.use(express.static(path.join(__dirname, 'public'))); // Cho CSS, JS


app.use(session({
  secret: process.env.SESSION_SECRET || 'mot-bi-mat-rat-an-toan', // Thay bằng biến .env
  resave: false,
  saveUninitialized: false, // Chỉ lưu session khi đã đăng nhập
  cookie: {
    secure: false, // Để 'false' khi test ở localhost (HTTP)
    maxAge: 1000 * 60 * 60 * 24 * 30// 1 ngày
  }
}));

// 5. Lắp ráp các Routes
// ---- API ROUTES (trả về JSON) ----
app.use('/api/quizzes', quizApiRoutes);
app.use('/api/questions', questionApiRoutes);
app.use('/admin', webAdminRoutes);
app.use('/auth', webAuthRoutes);
app.get('/', (req, res) => {
  res.redirect('/auth/login'); 
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API đang chạy!' });
});

app.listen(PORT, () => {
  console.log(`ServerDBNodeJs đang chạy tại http://localhost:${PORT}`);
});