import ActualizarPerfil from "../components/ActualizarPerfil";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VerPerfil() {
  const sectionStyle = {
    display: "flex",
    width: "300px",
  };

  const styleInterfazAside = {
    backgroundColor: "#9578bb",
    width: "300px",
    height: "90vh",
  };

  const styleOpciones={
    color: "white"
  }

  var mailSession = sessionStorage.getItem("userName");

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
          const admin = ["Comunidades", "Usuarios", "Desconectar"];
          setOpciones(admin);
        }
      });
  };

  console.log(opciones);

  return (
    <div>
      <Header></Header>

      <section style={sectionStyle}>
        <aside style={styleInterfazAside}>
          <h5>Hola,{mailSession}</h5>
            <ul>
            {opciones.map((opcion) => (
             
            <li key={opcion}> <Link  to={`/VerPerfil/${opcion}`} style={styleOpciones}>{opcion}</Link></li>
            ))}
            </ul>  
            
          
        </aside>
        <article>
          <ActualizarPerfil />
        </article>
      </section>
    </div>
  );
}
