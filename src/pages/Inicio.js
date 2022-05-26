import Header from "../components/Header";
import Mapa from "../components/Mapa";

import React, { useState } from "react";

function Inicio() {

  /**
   * En la pagina de inicio se muestra el header con el que el usuario
   * podrá acceder a las noticias, a hacer login o darse de alta en la aplicación
   * A mayores contendrá el componente del mapa con el que podrá interactuar 
   * el usuario y consultar todos los datos de las noticias
   */
  
  return (
    <div>
      <Header></Header>
      
     <Mapa/>
    </div>
  );
}

export default Inicio;
