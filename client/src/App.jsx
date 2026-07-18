import { Routes, Route } from "react-router-dom";
import './styles/index.css'
import Home from "./pages/Home";
// import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className='min-h-screen bg-black text-white overflow-x-hidden'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
