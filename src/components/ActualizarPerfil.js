import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../assets/css/actualizaPerfil.css"

function ActualizarPerfil() {
  var mailSession = sessionStorage.getItem("userName");

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apeUno, setApeUno] = useState("");
  const [apeDos, setApeDos] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState();
  const [rol, setRol] = useState();
  const [id, setId] = useState();
  const [userName, setUserName] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  useEffect(() => {
    misDatos();
  }, []);

  /**
   * Mediante el uso de esta petición el front le pasará los datos al back 
   * para que los modifique. En caso de estar todo correcto se volverá a 
   * renderizar la vista
   * 
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    let peticion = `http://localhost:8080/usuarios/update/${id}`;

    try {
      const { data } = await axios.put(peticion, {
        nombre,
        apeUno,
        apeDos,
        mail,
        password,
        userName,
        fechaNacimiento,
        rol,
        enabled,
      });
      if (data === "ok") {
        console.log(data);
        navigate("/VerPerfil");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  /**
   * Con el uso de esta función se recuperarán todos los datos del usuario
   * para poder rellenar el formulario correctamente con todos los datos
   * 
   */

  const misDatos = async () => {
    let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;

    return await fetch(peticion, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setMail(response.mail);
        setNombre(response.nombre);
        setApeUno(response.apeUno);
        setApeDos(response.apeDos);
        setUserName(response.userName);
        setPassword(response.password);
        setEnabled(response.enabled);
        setFechaNacimiento(response.fechaNacimiento);
        setRol(response.rol);
        setId(response.id);
      });
  };

  const [isHabilitado, setHabilitado] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const handleEnabled = (e) => {
    e.preventDefault();
    if (isHabilitado === false) {
      setDisabled(false);
      setHabilitado(true);
    } else {
      setDisabled(true);
      setHabilitado(false);
    };
    
  }
  /**
   * El componente ActualizarPerfil es un formulario que por defecto aparecerá 
   * deshabilitado y en la parte superior mostrará un boton que tendrá la 
   * funcionalidad de habilitar o deshabilitar el formulario 
   * En el formulario estará recogido los datos que podrá modificar el usuario de su perfil
   * que serán todos menos el campo de username
   */

  return (
    <div className="caja">
      <Button onClick={handleEnabled}>Editar</Button>
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-12">
          <div>
            <h3 className="titulo">Actualizar perfil</h3>
            <form method="put" className="form-horizontal mb-5">
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="mail">Email</label>
                  <input
                    type="email"
                    name="mail"
                    disabled={isDisabled}
                    value={mail}
                    onChange={(evento) => {
                      setMail(evento.target.value);
                    }}
                  />
                </div>

                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nombre}
                    disabled={isDisabled}
                    onChange={(evento) => {
                      setNombre(evento.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                <label htmlFor="apeUno">
                  Primer apellido
                  
                </label>
                <input
                    type="text"
                    name="apeUno"
                    disabled={isDisabled}
                    value={apeUno}
                    onChange={(evento) => {
                      setApeUno(evento.target.value);
                    }}
                  />
                </div>

                <div className="col-md-6 form-group mb-3">
                <label htmlFor="apeDos">
                  Segundo Apellido
                  
                </label>
                <input
                    type="text"
                    name="apeDos"
                    value={apeDos}
                    disabled={isDisabled}
                    onChange={(evento) => {
                      setApeDos(evento.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                <label htmlFor="userName">
                  username
                  
                </label>
                <input
                    type="text"
                    name="userName"
                    readOnly={true}
                    value={userName}
                    onChange={(evento) => {
                      setUserName(evento.target.value);
                    }}
                  />

                </div>

                <div className="col-md-6 form-group mb-3">
                <label htmlFor="fNacimiento">
                  Fecha de nacimiento
                  
                </label>
                <input
                    type="date"
                    disabled={isDisabled}
                    name="fNacimiento"
                    value={fechaNacimiento}
                    onChange={(evento) => {
                      setFechaNacimiento(evento.target.value);
                    }}
                  />
                </div>
              </div>

             
              <section className="botonera-login">
                <Button onClick={handleSubmit} className="btn btn-outline-dark" disabled={isDisabled}>
                  Actualizar
                </Button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActualizarPerfil;
