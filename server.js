import express from 'express';
import 'dotenv/config';
import path from 'path'; 
import session from 'express-session';

import { requireLogin } from './middleware/authMiddleware.js';
import quizApiRoutes from './routes/api/quizRoutes.js';
import examResultApiRoutes from './routes/api/examResultRoutes.js';
import questionApiRoutes from './routes/api/questionRoutes.js';
import webAdminRoutes from './routes/web/adminRoutes.js';
import webAuthRoutes from './routes/web/authRoutes.js'; 


const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SESSION_SECRET || 'mot-bi-mat-rat-an-toan', 
  resave: false,
  saveUninitialized: false, 
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24
  }
}));


app.use('/api/quizzes', quizApiRoutes);
app.use('/api/questions', questionApiRoutes);
app.use('/api/results', examResultApiRoutes);
app.use('/admin', requireLogin, webAdminRoutes);
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