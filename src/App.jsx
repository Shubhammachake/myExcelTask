import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/ExcelUpload";

import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Nav /> */}
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
      ;
    </BrowserRouter>
  );
}
