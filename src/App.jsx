import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './components/adminPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
