import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import CPF from "./Pages/CPF";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cpf" element={<CPF />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}