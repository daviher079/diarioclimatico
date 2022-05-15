import Header from "../components/Header";

import "../assets/css/comunidades.css";
import { useState, useEffect } from 'react';
import Comunidad from "../components/Comunidad";


export default function Comunidades() {


    const [comunidades, setComunidades] = useState([]);

    useEffect(()=>
    {
      const misComunidades = async() =>
      {
        let peticion ='http://localhost:8080/comunidades/all';
        const peticionInicial = await fetch(peticion);
        const peticionResultados = await peticionInicial.json();
        
        setComunidades(peticionResultados);
      }
      misComunidades()
    }, []);


  return (
      <div className="container">
      <Header></Header>
         <Comunidad comunidades={comunidades}></Comunidad>
      </div>
  );
}
