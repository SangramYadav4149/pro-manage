import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Components/Register/Register";
import Homepage from "./Pages/HomePage/Homepage";
function App() {
  return (
    <div className="app-container">
      <div className="app-section">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
