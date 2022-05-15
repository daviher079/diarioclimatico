import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import VerPerfil from "./pages/VerPerfil";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/VerPerfil" element={<VerPerfil/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
