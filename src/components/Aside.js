import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../assets/css/aside.css"
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function VerPerfil() {
  const [isHabilitado, setHabilitado] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/VerPerfil/Desconectar");
  };

  var mailSession = sessionStorage.getItem("userName");

  const [mostrarOcultar, setMostrarOcultar] = useState("225px");
  const [mostrarOcultarH5, setMostrarOcultarhH5] = useState("block");
  const [mostrarOcultarUL, setMostrarOcultarhUL] = useState("block");
  const [boton, setBoton] = useState("BsArrowBarLeft");

  const styleH5 = {
    display: mostrarOcultarH5,
  };

  const styleUL = {
    display: mostrarOcultarUL,
  };

  const handleMostrarOcultar = (e) => {
    e.preventDefault();
    if (isHabilitado === false) {
      setMostrarOcultar("225px");
      setHabilitado(true);
      setMostrarOcultarhH5("block");
      setMostrarOcultarhUL("block");
    } else {
      setMostrarOcultar("60px");
      setHabilitado(false);
      setMostrarOcultarhH5("none");
      setMostrarOcultarhUL("none");
    }
  };

  const styleInterfazAside = {
    backgroundColor: "#073b4c",
    width: mostrarOcultar,
    height: "100%",
    //display: mostrarOcultar
  };

  const styleOpciones = {
    color: "black",
  };

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


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const agregarClick = (e, opcion) => {
    e.preventDefault();
    if (opcion.opcion === "Desconectar") {
      setShow(true);
    } else {
      navigate(`/VerPerfil/${opcion.opcion}`);
    }
  };

  const handleVerPerfil = ()=>{
    navigate("/VerPerfil");
  }

  return (
    <div>
      <aside style={styleInterfazAside}>
        <button className="btn botonAside" onClick={handleMostrarOcultar}><BsArrowBarLeft size={30}/></button>
        <div className="estiloAside">
        
       <button className="btn" onClick={handleVerPerfil}> <h3 style={styleH5} className="nombre" >Usuario: {mailSession}</h3></button>
        <ul style={styleUL} className="lista">
          {opciones.map((opcion) => (
            <li key={opcion}>
              <button
                onClick={(ev) => agregarClick(ev, { opcion })}
                style={styleOpciones}
                className="btn item"
              >
                {opcion}
              </button>
            </li>
          ))}
        </ul>
        </div>
        
      </aside>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Cerrar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea Cerrar Sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
