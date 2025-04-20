import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import Testing from './components/testing'
import LoginPage from './pages/login/login'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register/register'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {


  return (
    <>
    <GoogleOAuthProvider clientId="16118776437-mjfhq89k6ig84s5vjin2eig2g90f0snn.apps.googleusercontent.com">
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path="/testing" element={<Testing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
