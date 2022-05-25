import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../assets/css/aside.css"
import { BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function VerPerfil() {
  const [isHabilitado, setHabilitado] = useState(true);

  /**
   * A traves de esta función cuando el usuario hace clic en cerrar sesión
   * este será redirigido hacia la página de VerPerfil/Desconectar
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/VerPerfil/Desconectar");
  };

  /**
   * para recoger la variable almacenada en sesión se hace atraves del objeto 
   * sessionStorage.getItem
   */
  var mailSession = sessionStorage.getItem("userName");


  /**
   * A traves del uso de estos useState se crean las varaibles que manejaran
   * la barra lateral, la primera mostrará por defecto la barra y las dos 
   * siguientes el contenido que tendrá dicha barra
   * 
   */
  const [mostrarOcultar, setMostrarOcultar] = useState("225px");
  const [mostrarOcultarH5, setMostrarOcultarhH5] = useState("block");
  const [mostrarOcultarUL, setMostrarOcultarhUL] = useState("block");

  /**
   * A traves de estas dos funciones se maneja el estilo de la lista y 
   * la variable de saludo
   */


  const styleH5 = {
    display: mostrarOcultarH5,
  };

  const styleUL = {
    display: mostrarOcultarUL,
  };

  /**
   * Con esta función se controlará el estado de la barra del boton
   * haciendo click en el boton se mostrará o se ocultará en función 
   * de la decisión del usuario
   * 
   */

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

  /**
   * Esta función se cargará en la propiedad de estilo de la barra lateral
   * 
   */

  const styleInterfazAside = {
    backgroundColor: "#073b4c",
    width: mostrarOcultar,
    height: "100vh",
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


  /**
   * A traves de la función de misDatos se cargarán las opciones que tiene visible
   * el usuario esto se definirá a traves de su rol en caso de que sea ADMIN tendrá 
   * un mayor numero de funcionalidades que si es el user
   * Las opciones se cargaran en el useState de opciones
   * 
   * 
   */

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

  /**
   * En caso de pulsar en alguna de las opciones el usuario será dirigido 
   * a la funcionalidad en la que el haya hecho click. Salvo si el ha 
   * pulsado sobre la opcion de desconectar en ese caso se mostrará una 
   * ventana modal para que el usuario decida si desea cerrar sesion
   * 
   * 
   */
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

  /**
   * Este componente devuelve una barra lateral con un boton para controlar su estado
   * un h5 que contiene el saludo del usuario y una lista conm las opciones que puede 
   * ver dicho usuario
   * 
   * 
   */
  return (
    <div>
      <aside style={styleInterfazAside}>
        <button className="btn botonAside" onClick={handleMostrarOcultar}><BsArrowBarLeft size={30}/></button>
        <div className="estiloAside">
        
       <button className="btn" onClick={handleVerPerfil}> <h3 style={styleH5} className="nombre" >Usuario: {mailSession}</h3></button>
        <ul style={styleUL} className="lista">
          {
            /***
             * Metodo para recorrer y mostrar las opciones que tiene 
             * visibles el usuario
             */
          opciones.map((opcion) => (
            <li key={opcion}>
              <button
                onClick={(ev) => agregarClick(ev, { opcion })}
                style={styleOpciones}
                className="btn item"
              >
                {opcion}
              </button>
            </li>
          ))
          }
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
