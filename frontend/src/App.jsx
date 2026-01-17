import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Chatbot from "./Chatbot";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}