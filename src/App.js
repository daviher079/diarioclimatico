import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
