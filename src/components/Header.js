import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../assets/css/header.css";
import imagenes from "../assets/imagenes";
import { useState, useEffect } from "react";

function Header() {

  /**
   * El componente Header es desde donde se puede acceder a hacer login,
   * Al inicio de la aplicación y a consultar las noticias que contiene 
   * la página 
   */


  /**
   * Dentro de este array estan contenidas las opciones para filtrar la busqueda de las noticias
   * 
   */
  const opciones = [
    "Cambio climatico",
    "Contaminacion",
    "Energia no Renovable",
    "Energia Renovable",
    "Residuos",
  ];

/**
 * En este useState está almacenado por defecto para que nos muestre el
 * boton de hacer login en caso de tener la sesión activa el boton será 
 * modificado para que nos conduzca a ver el perfil del usuario
 */

  const [login, setLogin] = useState({
    etiqueta: "Login",
    url: "/Login",
  });

  /**
   * En esta variable se recupera el campo Username del usuario
   * Necesario para mantener la sesión activa
   */
  var mailSession = sessionStorage.getItem("userName");

  /**
   * El useEffect se lleva a cabo en el momento en el que este componente 
   * sufre algun cambio en caso de sufrir algun cambio y comprobar que la variable 
   * mailSession no sea null se cambiará el useState de login para mostrar en el
   * boton la opcion de ver perfil
   */
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
              {
                /**
                 * En el navbar.brand situado arriba se muestra el logo de la web
                 * que se utiliza como boton para volver a la pagina de inicio de la web
                 * 
                 * 
                 * Y en el NavDropdown se recorre el array de opciones anteriormente
                 * descrito para poder llevar a cabo el filtro de las noticias
                 */
              opciones.map((opcion) => (
                 <a href={`/noticias/${opcion}`}
                  key={opcion}
                  style={{ textDecoration: "none", textAlign: "center" }}
                >
                  <p className="text-dark"> {opcion}</p>
                </a>
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
