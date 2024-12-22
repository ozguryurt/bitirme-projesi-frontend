import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Question from './pages/Question';
import NewQuestion from './pages/NewQuestion';

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import DashboardLayout from './layouts/DashboardLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminQuestions from './pages/admin/AdminQuestions';
import EditQuestion from './pages/EditQuestion';
import MyQuestions from './schemas/MyQuestions';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/myquestions" element={<MyQuestions />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/new-question" element={<NewQuestion />} />
        <Route path="/edit-question" element={<EditQuestion />} />
        <Route path="/question/:questionId" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profil" element={<Profile />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="questions" element={<AdminQuestions />} />
        </Route>
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)