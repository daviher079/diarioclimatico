import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../assets/css/aside.css"
import { BsArrowBarLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../assets/css/aside.css"
export default function VerPerfil() {
  const [isHabilitado, setHabilitado] = useState(true);



  const [mostrarOcultar, setMostrarOcultar] = useState("225px");
  const [mostrarOcultarUL, setMostrarOcultarhUL] = useState("block");


  const styleUL = {
    display: mostrarOcultarUL,
  };

  const handleMostrarOcultar = (e) => {
    e.preventDefault();
    if (isHabilitado === false) {
      setMostrarOcultar("225px");
      setHabilitado(true);
      setMostrarOcultarhUL("block");
    } else {
      setMostrarOcultar("60px");
      setHabilitado(false);
      setMostrarOcultarhUL("none");
    }
  };

  const styleInterfazAside = {
    backgroundColor: "#073b4c",
    width: mostrarOcultar,
    height: "100vh",
    //display: mostrarOcultar
  };



  const navigate = useNavigate();

  const opciones = [
    "Cambio climatico",
    "Contaminacion",
    "Energia no Renovable",
    "Energia Renovable",
    "Residuos",
  ];


  /**
   * Este apartado mustran los tipos de noticias que hay en la pagina y le
   * ofrece al usuario la opción de filtrar y mostrar todas las noticias que
   * contengan ese tipo
   */
  


  return (
    <div>
      <aside style={styleInterfazAside}>
        <button className="btn botonAside" onClick={handleMostrarOcultar}><BsArrowBarLeft size={30}/></button>
        <div className="estiloAside">
        
       
        <ul style={styleUL} className="lista">
          {opciones.map((opcion) => (
            <li key={opcion}>
              <a href={`/noticias/${opcion}`} className="itemDos">
                            {opcion}
                        </a>
            </li>
          ))}
        </ul>
        </div>
        
      </aside>

     
    </div>
  );
}
