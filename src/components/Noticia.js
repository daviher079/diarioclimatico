import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/usuario.css"
function Noticia() {

  const [noticias, setNoticias] = useState([]);
  var mailSession = sessionStorage.getItem("userName");
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState(null);
  const [idNoticia, setIdNoticia] = useState(0);
  const [idUser, setIdUser] = useState(0);

  const [vacioTitulo, setVacioTitulo] = useState("none");
  const [vacioCuerpo, setVacioCuerpo] = useState("none");
  const [vacioFecha, setVacioFecha] = useState("none");

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [fullscreenClose, setFullscreenClose] = useState(true);
  const [showClose, setShowClose] = useState(false);

  const handleCloseDelete = () => setShowClose(false);

  const opciones = [
    "Cambio climatico",
    "Contaminacion",
    "Energia no Renovable",
    "Energia Renovable",
    "Residuos",
  ];

  useEffect(() => {
    misNoticias();
  }, []);

  /**
   * Por medio del uso de esta función se recuperan todas las noticias que 
   * haya generado el usuario anteriormente
   * 
   */

  const misNoticias = async () => {
    let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;
    const peticionInicial = await fetch(peticion);
    const peticionResultados = await peticionInicial.json();
    console.log(peticionResultados.noticias);

    setNoticias(peticionResultados.noticias);
    setIdUser(peticionResultados.id);
  };

  const agregarClick = (e) => {
    e.preventDefault();

    navigate("/VerPerfil/Noticias/Nueva");
  };

  function handleModificar(breakpoint, noticia) {
    setTitulo(noticia.titulo);
    setCuerpo(noticia.cuerpo);
    setTipo(noticia.tipo);
    setFecha(noticia.fecha);
    setIdNoticia(noticia.id);

    setFullscreen(breakpoint);

    setShow(true);
  }

  /**
   * A traves de esta función el fron envia al back los parametros de la noticia 
   * que el usuario desea modificar mediante el id el back se encargará de modificarlos
   * Para enviar los datos al back es necesario generar un JSON que será la forma que 
   * tenga el back de entener los datos
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let peticion = `http://localhost:8080/noticias/update/${idNoticia}`;
    
   

    try {
      const { data } = await axios.put(peticion, {
        titulo: titulo,
        cuerpo: cuerpo,
        usuario: {
          id: idUser,
        },
        tipo: tipo,
        fecha: fecha,
      });
      if (data === "ok") {
        console.log(data);
        misNoticias();
        navigate("/VerPerfil/Noticias");
        setShow(false);
      }
    } catch (error) {
      console.error(error.response.data);
      setVacioTitulo("none");
      setVacioCuerpo("none");
      setVacioFecha("none");

      if (error.response.data.titulo === "") {
        setVacioTitulo("block");
      }
      if (error.response.data.cuerpo === "") {
        setVacioCuerpo("block");
      }

      if (error.response.data.fechaNacimiento === null) {
        setVacioFecha("block");
      }
    }
  };

  const errorVacioTitulo = {
    color: "red",
    display: vacioTitulo,
  };

  const errorVacioCuerpo = {
    color: "red",
    display: vacioCuerpo,
  };

  const errorVacioFecha = {
    color: "red",
    display: vacioFecha,
  };

  /**
   * Esta función mustra la ventana modal para confirmar un borrado
   * 
   */

  function handleDelete (breakpoint, noticia){
    
    
    setIdNoticia(noticia.id);

    setFullscreenClose(breakpoint);
  
    setShowClose(true);
    
};

/**
 * Esta función será ejecutada en caso de que el usuario confirme
 * que desea borrar la noticia en la que ha hecho el clic el back recibirá el id y este
 * se encargará de borrarlo
 */

const handleSubmitDelete = async (e)=>{
  e.preventDefault();
  console.log(idNoticia)

  let peticion = `http://localhost:8080/noticias/delete/${idNoticia}`;


    return await fetch(peticion, { method: 'DELETE' })
    .then((response) => {
      console.log(response)
      if(response.status===200){
        
        navigate("/VerPerfil/Noticias");
        setShowClose(false);
        misNoticias();
      }
    });
};

/**
 * En este componente se renderizarán todas las noticias que tiene visibles el usuario
 * y tendrá la posibilidad de añadir borrar o modificar cualquier noticia.
 * En caso de añadir será dirigido a otra pagina diferente. Pero en caso de querer 
 * actualizar algun campo de la noticia aparecerá una ventana modal con los datos
 * de la noticia que se desean cambiar. Y en caso de borrar una noticia aparecerá
 * otra ventana emergente que confirmará el borrado de la noticia
 */

  return (
    <div className="d-flex justify-content-center row caja">
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
                    <tr className="cell-1" key={noticia.id}>
                      <td>{noticia.titulo}</td>
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
                           onClick={(ev) => handleDelete(ev, noticia)}
                        >
                          Borrar noticia
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
                <form method="put" >
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
                        <p style={errorVacioTitulo}>Error. El campo no puede estar vacio</p>
                  </section>

                  <section>
                    <label htmlFor="fecha">
                      Fecha
                      <input
                        type="date"
                        name="fecha"
                        value={fecha}
                        onChange={(evento) => {
                          setFecha(evento.target.value);
                        }}
                      />
                    </label>
                    <p style={errorVacioFecha}>Error. El campo no puede estar vacio</p>
                  </section>

                  <section>
                    <label htmlFor="tipo">
                      Tipo
                      <select
                        className="form-select form-select-lg col-lg-12"
                        onChange={(evento) => {
                          setTipo(evento.target.value);
                        }}
                        aria-label=".form-select-lg example"
                      >
                        {opciones.map((opcion) => (
                          <option
                            value={opcion}
                            selected={tipo === opcion}
                            key={opcion}
                          >
                            {opcion}
                          </option>
                        ))}
                      </select>
                    </label>
                  </section>

                  <section>
                    <label htmlFor="cuerpo">
                      Cuerpo
                      <textarea
                        name="cuerpo"
                        rows="10"
                        cols="50"
                        placeholder="Primer apellido"
                        className="form-control input-md"
                        required={true}
                        onChange={(evento) => {
                          setCuerpo(evento.target.value);
                        }}
                        value={cuerpo}
                      ></textarea>
                    </label>
                    <p style={errorVacioCuerpo}>Error. El campo no puede estar vacio</p>
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

            <Modal
                show={showClose}
                onHide={handleClose}
                fullscreen={fullscreenClose}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header>
                  <Modal.Title>Borrar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>¿Desea eliminar este usuario?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDelete}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSubmitDelete}>
                    Eliminar
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
