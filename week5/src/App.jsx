import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basic from "@/pages/Basic";
import Home from "@/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
