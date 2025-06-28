import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basic from "@/pages/Basic";
import Home from "@/pages/Home";
import Spring from "@/pages/Spring";
import Exercise from "@/pages/Exercise";
import Drei1 from "@/pages/Drei1";
import Drei2 from "@/pages/Drei2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/spring" element={<Spring />} />
        <Route path="/drei-1" element={<Drei1 />} />
        <Route path="/drei-2" element={<Drei2 />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
