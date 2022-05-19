import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
  
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apeUno, setApeUno] = useState("");
    const [apeDos, setApeDos] = useState(""); 
    const [mail, setMail] = useState("");
    const [userName, setUsername] = useState("");
    const [fechaNacimiento, setFecha] = useState(null);
    const [password, setPassword] = useState(""); 
    const [enabled, setEnabled]= useState();
    const [rol, setRol] = useState();
    const [id, setId] = useState();
    const [vacioNombre, setVacioNombre] = useState("none");
    const [vacioApeUno, setVacioApeUno] = useState("none");
    const [vacioApeDos, setVacioApeDos] = useState("none");
    const [vacioMail, setVacioMail] = useState("none");

    const [fullscreenClose, setFullscreenClose] = useState(true);
    const [showClose, setShowClose] = useState(false);
  
    useEffect(() => {
      
      misUsuarios();
    }, []);
  

  
    const misUsuarios = async () => {
      let peticion = "http://localhost:8080/usuarios/all";
      const peticionInicial = await fetch(peticion);
      const peticionResultados = await peticionInicial.json();
      console.log(peticionResultados);
      setUsuarios(peticionResultados);
    };
  
    const agregarClick = (e) => {
      e.preventDefault();
  
      navigate("/VerPerfil/Usuarios/Alta");
    };
  
    const handleClose = () => setShow(false);

    const handleCloseDelete = () => setShowClose(false);


    function handleModificar(breakpoint, usuario) {
        console.log(usuario)
      
        setNombre(usuario.nombre);
        setApeUno(usuario.apeUno);
        setApeDos(usuario.apeDos);
        setUsername(usuario.userName);
        setMail(usuario.mail);
        setFecha(usuario.fechaNacimiento);
        setPassword(usuario.password);
        setEnabled(usuario.setEnabled);
        setRol(usuario.rol);
        setId(usuario.id);

      setFullscreen(breakpoint);
  
      setShow(true);
    }

    function handleDelete(breakpoint, usuario) {
        console.log(usuario)
        setId(usuario.id)
        setFullscreenClose(breakpoint);
  
      setShowClose(true);
    }

    const handleSubmitDelete = async (e)=>{
      e.preventDefault();
      let peticion = `http://localhost:8080/usuarios/delete/${id}`;


      return await fetch(peticion, { method: 'DELETE' })
      .then((response) => {
        console.log(response)
        if(response.status===200){
          
          navigate("/VerPerfil/Usuarios");
          setShowClose(false);
          misUsuarios();
        }
      });
  };
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let peticion = `http://localhost:8080/usuarios/update/${id}`;
      
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
          
          navigate("/VerPerfil/Usuarios");
          setShow(false);
          misUsuarios();
        }
      } catch (error) {
        console.error(error.response.data);
        
        setVacioNombre("none");
        setVacioApeUno("none");
        setVacioApeDos("none");
        setVacioMail("none");

        if (error.response.data.nombre === "") {
          setVacioNombre("block");
        }

        if (error.response.data.apeUno === "") {
          setVacioApeUno("block");
        }

        if (error.response.data.apeDos === "") {
          setVacioApeDos("block");
        }

        if (error.response.data.mail === "") {
          setVacioMail("block");
        }  

        
      }
    };
  

    const errorVacioNombre = {
      color: "red",
      display: vacioNombre
    };
  
    const errorVacioApeUno = {
      color: "red",
      display: vacioApeUno
    };
  
    const errorVacioApeDos = {
      color: "red",
      display: vacioApeDos
    };

    const errorVacioMail = {
      color: "red",
      display: vacioMail
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
                    <th>Nombre</th>
                    <th>Mail</th>
                    <th>Username</th>
                    <th>Fecha</th>
                    <th>Modificar</th>
                    <th>Baja</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {usuarios.map((usuario) => {
                    return (
                      <tr className="cell-1" key={usuario.id}>
                        <td>
                          {usuario.nombre} {usuario.apeUno} {usuario.apeDos}
                        </td>
                        <td>{usuario.mail}</td>
                        <td>{usuario.userName}</td>
                        <td>{usuario.fechaNacimiento}</td>

                        <td>
                          <Button
                            size="lg"
                            className="btn btn-warning"
                            onClick={(ev) => handleModificar(ev, usuario)}
                          >
                            Modificar
                          </Button>
                        </td>

                        <td>
                        <Button
                            size="lg"
                            className="btn btn-warning"
                            onClick={(ev) => handleDelete(ev, usuario)}
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
                  <Modal.Title>Datos Usuario: {nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form method="put">
                    <section>
                      <label htmlFor="nombre">
                        Nombre
                        <input
                          type="text"
                          name="nombre"
                          value={nombre}
                          onChange={(evento) => {
                            setNombre(evento.target.value);
                          }}
                        />
                      </label>
                      <p style={errorVacioNombre}>Error. El campo no puede estar vacio</p>
                    </section>

                    <section>
                      <label htmlFor="apeUno">
                        Primer apellido
                        <input
                          type="text"
                          name="apeUno"
                          value={apeUno}
                          onChange={(evento) => {
                            setApeUno(evento.target.value);
                          }}
                        />
                      </label>
                      <p style={errorVacioApeUno}>Error. El campo no puede estar vacio</p>
                    </section>

                    <section>
                      <label htmlFor="apeDos">
                        Segundo apellido
                        <input
                          type="text"
                          name="apeDos"
                          value={apeDos}
                          onChange={(evento) => {
                            setApeDos(evento.target.value);
                          }}
                        />
                      </label>
                      <p style={errorVacioApeDos}>Error. El campo no puede estar vacio</p>
                    </section>

                    <section>
                      <label htmlFor="mail">
                        Mail
                        <input
                          type="email"
                          name="mail"
                          value={mail}
                          onChange={(evento) => {
                            setMail(evento.target.value);
                          }}
                        />
                      </label>
                      <p style={errorVacioMail}>Error. El campo no puede estar vacio</p>
                    </section>

                    <section>
                      <label htmlFor="userName">
                        Username
                        <input
                          type="text"
                          name="userName"
                          readOnly={true}
                          value={userName}
                          onChange={(evento) => {
                            setUsername(evento.target.value);
                          }}
                        />
                      </label>
                    
                    </section>

                    <section>
                      <label htmlFor="fecha">
                        Fecha de Nacimiento
                        <input
                          type="date"
                          name="fecha"
                          value={fechaNacimiento}
                          onChange={(evento) => {
                            setFecha(evento.target.value);
                          }}
                        />
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
export default Usuario;