import ActualizarPerfil from "../components/ActualizarPerfil";
import Header from "../components/Header";
import React from "react";
import Aside from "../components/Aside"

export default function VerPerfil() {
  const sectionStyle = {
    display: "flex",
    width: "100px",
  };


  /**
   * Desde la pagina de ver el perfil usuario será capaz de acceder a todas las
   * funcionalidades que le permita su rol de usuario desde el componente Aside tendrá 
   * disponible dichas opciones y en el componente ActualizarPerfil Se mostrará un formulario 
   * contendrá los datos del usuario y que por defecto aparecerá deshabilitado
   * 
   */
  return (
    <div>
      <Header></Header>

      <section style={sectionStyle}>
        <Aside />
        <article>
          <ActualizarPerfil />
        </article>
      </section>
    </div>
  );
}
