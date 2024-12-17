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

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/new-question" element={<NewQuestion />} />
        <Route path="/question/:questionId" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
