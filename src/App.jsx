import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Footer from "./components/Footer";
import './index.css'

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     </>
//   )
// }

// export default App
