import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../assets/css/header.css";
import imagenes from "../assets/imagenes";
import { useState, useEffect } from "react";

function Header() {
  const opciones = [
    "Cambio climatico",
    "Contaminacion",
    "Energia no Renovable",
    "Energia Renovable",
    "Residuos",
  ];

  const [login, setLogin] = useState({
    etiqueta: "Login",
    url: "/Login",
  });

  var mailSession = sessionStorage.getItem("userName");
  useEffect(() => {
    if (mailSession !== null) {
      setLogin({
        etiqueta: "Ver perfil",
        url: "/VerPerfil",
      });
    }
  }, [mailSession]);
  return (
    <Navbar className="cabecera" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          {" "}
          <img className="logo_centro" src={imagenes.logoCabecera2} alt=".." />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-light-example" />
        <Navbar.Collapse id="navbar-light-example" className="botones">
          <Nav >
            <NavDropdown
              id="nav-dropdown-light-example"
              title="Noticias"
              
            >
              {opciones.map((opcion) => (
                <Link
                  to={`/noticias/${opcion}`}
                  key={opcion}
                  style={{ textDecoration: "none", textAlign: "center" }}
                >
                  <p className="text-dark"> {opcion}</p>
                </Link>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Nav.Item>
          <Link
            to={`${login.url}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <span className="botones">{login.etiqueta}</span>
          </Link>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}

export default Header;
