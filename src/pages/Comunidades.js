import Header from "../components/Header";
import Aside from "../components/Aside";

import "../assets/css/comunidades.css";
import Comunidad from "../components/Comunidad";
import React from "react";

export default function Comunidades() {
  /**
   * Esta función se utiliza para dar estilo al html que utiliza el componente
   * a traves de la propiedad style={}
   * 
   */
  const sectionStyle = {
    display: "flex",
    width: "100px",
  };
  

  /**
   * El componente contiene otros dos componentes en este caso son
   * aside que contiene las acciones que puede llevar a cabo el usuario
   * y comunidad en este componente se muestran las comunidades que hay 
   * en la aplicacion para poder modificar sus datos
   */
  return (
    <div>
      <Header></Header>

      <section style={sectionStyle}>
      <Aside />
        <article>
          <Comunidad />
        </article>
      </section>
    </div>
  );
}
