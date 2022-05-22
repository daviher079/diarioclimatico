import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/estiloNoticia.css";
import Figure from 'react-bootstrap/Figure'
import imagenes from "../assets/imagenes";
import { useNavigate } from "react-router-dom";

function NoticiasTipo() {
  const { campo } = useParams();
  const [noticias, setNoticias] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      
    const misNoticias = async () => {
      
        let peticion = "http://localhost:8080/noticias/findT/"+campo;
        const peticionInicial = await fetch(peticion);
        const peticionResultados = await peticionInicial.json();
        console.log(peticionResultados);
        setNoticias(peticionResultados);
      };
      misNoticias();
  }, []);

  function handleVerNoticia(breakpoint, noticia) {
      console.log(noticia.id)
      console.log(campo)

    navigate(`/noticias/${campo}/${noticia.id}`);
  }

  return (
    <div className="contenedor">
     {noticias.map((noticia) => {
        return (
          <div key={noticia.id} className="estiloNoticia">
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={imagenes.fondo}
              />
              <Figure.Caption>
              {noticia.tipo}
              </Figure.Caption>
            </Figure>
            <div className="datos">
            <h3  onClick={(ev) => handleVerNoticia(ev, noticia)} className="boton">{noticia.titulo}</h3>
            <p>{noticia.fecha}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NoticiasTipo;
