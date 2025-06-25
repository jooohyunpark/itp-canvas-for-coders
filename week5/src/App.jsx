import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basic from "@/pages/Basic";
import Home from "@/pages/Home";
import Spring from "@/pages/Spring";
import Exercise from "@/pages/Exercise";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/spring" element={<Spring />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
