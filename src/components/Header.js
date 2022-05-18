import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../assets/css/header.css";
import imagenes from "../assets/imagenes";
import {  useState, useEffect } from "react";

function Header() {

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
          <img className="logo_centro" src={imagenes.logo} alt=".." />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Categorias"
              menuVariant="light"
            >
              <Link
                to={"/noticias/cambioClimatico"}
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                <p className="text-dark">Cambio Climatico</p>
              </Link>
              <Link
                to={"/noticias/residuos"}
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                <p className="text-dark">Residuos</p>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
       
        <Nav.Item>
        <Link
            to={`${login.url}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <span className="text-dark">{login.etiqueta}</span>
          </Link>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}

export default Header;
