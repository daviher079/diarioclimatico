import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Noticia() {

    const [noticias, setNoticias] = useState([]);
    var mailSession = sessionStorage.getItem("userName");
    const navigate = useNavigate();
    const handleClose = () => setShow(false);

    const [titulo, setTitulo]= useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [tipo, setTipo] = useState("");
    const[fecha, setFecha] = useState(null);
    const[mySelected, setMyselected] = useState("");
  
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    
  
    useEffect(() => {
      
        misNoticias();
    }, []);
  
  
    const misNoticias = async () => {
      let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;
      const peticionInicial = await fetch(peticion);
      const peticionResultados = await peticionInicial.json();
      console.log(peticionResultados.noticias);
      
      setNoticias(peticionResultados.noticias);
    };
  
    const agregarClick = (e) => {
      e.preventDefault();
  
      navigate("/VerPerfil/Noticias/Nueva");
    };



    function handleModificar(breakpoint, noticia) {
      console.log(noticia)
      setTitulo(noticia.titulo);
      setCuerpo(noticia.cuerpo);
      setTipo(noticia.tipo);
      setFecha(noticia.fecha);
    setFullscreen(breakpoint);

    setShow(true);
  }

    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      /*let peticion = `http://localhost:8080/usuarios/update/${id}`;
      
      try {
  
        const { data } = await axios.put(
          peticion,
          {
            nombre,
            apeUno,
            apeDos,
            mail,
            password,
            userName,
            fechaNacimiento,
            rol,
            enabled
          }
        );
        if(data==="ok"){
          console.log(data);
          navigate("/VerPerfil");
          setShow(false);
        }
      } catch (error) {
        console.error(error.response.data); 
      }*/
    };

    return(
        <div className="d-flex justify-content-center row">
        <div className=" col-md-12 col-sm-8 col-xl-12 ">
          <div className="rounded">
            <div className="table-responsive table-borderless">
              <Button size="lg" onClick={(ev) => agregarClick(ev)}>
                Nueva noticia
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
                      <tr className="cell-1" key={noticia.id} >
                       
                       <td>
                          {noticia.titulo}
                        </td>
                        <td>{noticia.tipo}</td>
                        <td>{noticia.fecha}</td>
                        <td>
                          <Button
                            size="lg"
                            className="btn btn-warning"
                            onClick={(ev) => handleModificar(ev, noticia)}
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
              <Modal
                show={show}
                onHide={handleClose}
                fullscreen={fullscreen}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header>
                  <Modal.Title>Datos Noticia: {titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form method="put">
                    <section>
                      <label htmlFor="titulo">
                        Titulo
                        <input
                          type="text"
                          name="titulo"
                          value={titulo}
                          onChange={(evento) => {
                            setTitulo(evento.target.value);
                          }}
                        />
                      </label>
                    </section>

                    <section>
                      <label htmlFor="fecha">
                        Primer apellido
                        <input
                          type="date"
                          name="fecha"
                          value={fecha}
                          onChange={(evento) => {
                            setFecha(evento.target.value);
                          }}
                        />
                      </label>
                    </section>

                    <section>
                      <label htmlFor="apeDos">
                        Tipo
                        <select className="form-select form-select-lg col-lg-12" onChange={(evento)=>{setTipo(evento.target.value)}} aria-label=".form-select-lg example">
                    <option value="Cambio Climatico">Cambio climatico</option>
                    <option value="Contaminacion">Contaminación</option>
                    <option value="Energia no Renovable" selected>Energia no Renovable</option>
                    <option value="Energia Renovable">Energia Renovable</option>
                    <option value="Residuos">Residuos</option>
                  </select>
                      </label>
                    </section>

                    <section>
                      <label htmlFor="mail">
                        Mail
                        <textarea name="cuerpo" rows="10" cols="50" placeholder="Primer apellido"
                    className="form-control input-md"
                    required={true}
                    onChange={(evento) => {
                      setCuerpo(evento.target.value);
                    }}
                    value={cuerpo}>

                  </textarea>
                      </label>
                    </section>

                   
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                  </Button>
                </Modal.Footer>
              </Modal>
              

        
  
            </div>
          </div>
        </div>
      </div>
    );


}

export default Noticia;