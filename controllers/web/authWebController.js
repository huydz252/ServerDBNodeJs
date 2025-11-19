 import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

 
const showRegisterPage = (req, res) => {
  res.render('pages/auth/register', { pageTitle: 'Đăng ký' });
};

const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  
   const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
     await prisma.adminUser.create({
      data: {
        username: username,
        passwordHash: passwordHash
      }
    });
     res.redirect('/auth/login');
  } catch (error) {
     console.error(error);
    res.redirect('/auth/register');
  }
};
 
const showLoginPage = (req, res) => {
  res.render('pages/auth/login', { pageTitle: 'Đăng nhập' });
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
     const user = await prisma.adminUser.findUnique({
      where: { username: username }
    });
    if (!user) {
       return res.redirect('/auth/login');
    }

     const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
       return res.redirect('/auth/login');
    }

     req.session.userId = user.id;
    req.session.username = user.username;

     res.redirect('/admin/quizzes');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/login');
  }
};

const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin/quizzes');  
    }
    res.clearCookie('connect.sid');  
    res.redirect('/auth/login');  
  });
};


export { showRegisterPage,
  handleRegister,
  showLoginPage,
  handleLogin,
  handleLogout
}