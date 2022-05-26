import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AsideNoticias from "../components/AsideNoticias";
import Header from "../components/Header";
import "../assets/css/aside.css";

function NoticiaDetalle() {
  const [noticia, setNoticia] = useState([]);
  const { campo, id } = useParams();

  const sectionStyle = {
    display: "flex",
  };

  /**
   * El useEffect en este caso lo que está haciendo es que en el momemnto en el que se
   * se renderice el componente lanzará la petición al servidor y recuperará todos los datos
   * de la noticia. Para esto lo que hará será utilizar el hook useParams y recuperar el id 
   * que le llega por la url en el momento que le llegan los campos de la noticia son guardados
   * en el useState de noticia
   * 
   */

  useEffect(() => {
    const misNoticias = async () => {
      let peticion = "http://localhost:8080/noticias/find/" + id;
      const peticionInicial = await fetch(peticion);
      const peticionResultados = await peticionInicial.json();
      console.log(peticionResultados);
      setNoticia(peticionResultados);
    };
    misNoticias();
  }, []);


  /**
   * Este componente renderizará en cada etiqueta HTML los campos de la noticia
   * 
   */
  return (
    <div>
      <Header></Header>

      <section style={sectionStyle}>
        <AsideNoticias />
        <article className="art">
          
            <div className="imgFondo"></div>
            <h5>{noticia.fecha}</h5>
            <h1>{noticia.titulo}</h1>
            <h3>{noticia.tipo}</h3>
            <p>{noticia.cuerpo}</p>
        </article>
      </section>
    </div>
  );
}

export default NoticiaDetalle;
