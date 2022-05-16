import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Noticia() {

    const [noticias, setNoticias] = useState([]);
    var mailSession = sessionStorage.getItem("userName");
    const navigate = useNavigate();
  
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
  
    useEffect(() => {
      
        misNoticias();
    }, []);
  
  
    const misNoticias = async () => {
      let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;
      const peticionInicial = await fetch(peticion);
      const peticionResultados = await peticionInicial.json();
      console.log(peticionResultados.noticias);
      setId(peticionResultados.id);
      setNoticias(peticionResultados.noticias);
    };
  
    const agregarClick = (e) => {
      e.preventDefault();
  
      navigate("/VerPerfil/Noticias/Nueva");
    };
  
    

    return(
        <div className="d-flex justify-content-center row">
        <div className=" col-md-12 col-sm-8 col-xl-12 ">
          <div className="rounded">
            <div className="table-responsive table-borderless">
              <Button size="lg" onClick={(ev) => agregarClick(ev)}>
                Nuevo usuario
              </Button>

              <table className="table">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Modificar</th>
                    <th>Baja</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {noticias.map((noticia) => {
                    return (
                      <tr className="cell-1" >
                       
                       <td>
                          {noticia.titulo}
                        </td>
                        <td>{noticia.tipo}</td>
                        <td>{noticia.fecha}</td>
                        <td>
                          <Button
                            size="lg"
                            className="btn btn-warning"
                            //onClick={(ev) => handleModificar(ev, usuario)}
                          >
                            Modificar
                          </Button>
                        </td>

                        <td>
                        <Button
                            size="lg"
                            className="btn btn-warning"
                           // onClick={(ev) => handleDelete(ev, usuario)}
                          >
                            Dar baja
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              

        
  
            </div>
          </div>
        </div>
      </div>
    );


}

export default Noticia;