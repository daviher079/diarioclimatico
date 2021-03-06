import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Desconectar from "./pages/Desconectar"
import { AuthProvider } from "./context/authContext";
import VerPerfil from "./pages/VerPerfil";
import DarAlta from "./pages/DarAlta";
import Comunidades from "./pages/Comunidades";
import Usuarios from "./pages/Usuarios";
import Alta from "./pages/Alta";
import Noticias from "./pages/Noticias"
import NoticiaNueva from "./pages/NoticiaNueva"
import NoticiasCampo from "./pages/NoticiasCampo";
import NoticiaDetalle from "./pages/NoticiaDetalle";



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/VerPerfil" element={<VerPerfil/>}/>
          <Route path="/DarAlta" element={<DarAlta/>}/>
          <Route path="/VerPerfil/Desconectar" element={<Desconectar/>}/>
          <Route path="/VerPerfil/Comunidades" element={<Comunidades/>}/>
          <Route path="/VerPerfil/Usuarios" element={<Usuarios/>}/>
          <Route path="/VerPerfil/Usuarios/Alta" element={<Alta/>}/>
          <Route path="/VerPerfil/Noticias" element={<Noticias/>}/>
          <Route path="/VerPerfil/Noticias/Nueva" element={<NoticiaNueva/>}/>
          <Route path="/noticias/:campo" element={<NoticiasCampo />}/>
          <Route path="/noticias/:campo/:id" element={<NoticiaDetalle />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
