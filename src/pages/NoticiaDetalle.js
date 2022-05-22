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
