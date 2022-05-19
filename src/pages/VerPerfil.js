import ActualizarPerfil from "../components/ActualizarPerfil";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

export default function VerPerfil() {

  const [mostrarOcultar, setMostrarOcultar] = useState("block");
  const [isHabilitado, setHabilitado] = useState(true);
  const sectionStyle = {
    display: "flex",
    width: "300px",
  };

  const handleMostrarOcultar = (e) => {
    e.preventDefault();
    if(isHabilitado===false){
      setMostrarOcultar("block");
      setHabilitado(true);

    }else{
      setMostrarOcultar("none");
      setHabilitado(false);
    }
  }  

  const styleInterfazAside = {
    backgroundColor: "#9578bb",
    width: "300px",
    height: "90vh",
    display: mostrarOcultar
  };

  const styleOpciones = {
    color: "black",
  };

  var mailSession = sessionStorage.getItem("userName");
  const navigate = useNavigate();

  const [opciones, setOpciones] = useState([]);
  useEffect(() => {
    misDatos();
  }, []);



  const misDatos = async () => {
    let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;

    return await fetch(peticion, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.rol === "ADMIN") {
          const admin = ["Comunidades", "Usuarios", "Noticias", "Desconectar"];
          setOpciones(admin);
        }
        if (response.rol === "USUARIO") {
          const user = ["Noticias", "Desconectar"];
          setOpciones(user);
        }
      });
  };

  const agregarClick = (e, opcion) => {
    e.preventDefault();
    if (opcion.opcion === "Desconectar") {
      setShow(true);
    } else {
      navigate(`/VerPerfil/${opcion.opcion}`);
    }
  };



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/VerPerfil/Desconectar');
  }

  return (
    <div>
      <Header></Header>


      <section style={sectionStyle}>
      <aside style={styleInterfazAside}>
          <h5>Hola,{mailSession}</h5>
          <ul>
            {opciones.map((opcion) => (
              <li key={opcion}>
                <button
                  onClick={(ev) => agregarClick(ev, { opcion })}
                  style={styleOpciones}
                  className="btn btn-outline-light"
                >
                  {opcion}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      
        <article>

        <button onClick={handleMostrarOcultar}>Mostrar</button>
          <Modal
            show={show}
            onHide={handleClose}
          >
            <Modal.Header>
              <Modal.Title>Cerrar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Está seguro que desea Cerrar Sesión?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
              <Button variant="primary" onClick={handleSubmit}>Cerrar Sesión</Button>
            </Modal.Footer>
          </Modal>

          <ActualizarPerfil />
        </article>
      </section>
    </div>
  );
}
