import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { AuthProvider } from './providers/AuthProvider';

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
import MyQuestions from './pages/MyQuestions';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import useAuthStore from './stores/authStore';

// Özel rota: Kullanıcı giriş yapmadıysa login sayfasına yönlendir
const UnprivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuthStore();
  return (user === null) ? element : <Navigate to="/" />;
};

// Özel rota: Kullanıcı giriş yapmadıysa login sayfasına yönlendir
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuthStore();
  return (user !== null) ? element : <Navigate to="/login" />;
};

// Admin rota: Admin girişi yapılmadıysa admin login sayfasına yönlendir
const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuthStore();
  return (user !== null && user.role === "admin") ? element : <Navigate to="/" />;
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Kullanıcı sayfaları */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/myquestions" element={<PrivateRoute element={<MyQuestions />} />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/new-question" element={<PrivateRoute element={<NewQuestion />} />} />
          <Route path="/edit-question" element={<PrivateRoute element={<EditQuestion />} />} />
          <Route path="/question/:questionId" element={<Question />} />
          <Route path="/login" element={<UnprivateRoute element={<Login />} />} />
          <Route path="/register" element={<UnprivateRoute element={<Register />} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        {/* Admin sayfaları */}
        <Route path="admin" element={<AdminLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminRoute element={<AdminHome />} />} />
            <Route path="users" element={<AdminRoute element={<AdminUsers />} />} />
            <Route path="questions" element={<AdminRoute element={<AdminQuestions />} />} />
          </Route>
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* 404 Sayfası */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)