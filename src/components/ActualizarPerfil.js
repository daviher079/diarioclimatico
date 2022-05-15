import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button'

function ActualizarPerfil() {
  var mailSession = sessionStorage.getItem("userName");

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apeUno, setApeUno] = useState("");
  const [apeDos, setApeDos] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled]= useState();
  const [rol, setRol] = useState();
  const [id, setId] = useState();
  const [userName, setUserName] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");



  useEffect(() => {

    misDatos();

  }, [])
  

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
        console.log(data);
        navigate("/VerPerfil");
      }
    } catch (error) {
      console.error(error.response.data); 
    }




  };

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
    if(isHabilitado===false){
      setDisabled(false);
      setHabilitado(true);

    }else{
      setDisabled(true);
      setHabilitado(false);
    }

  }

  return (
    <div className="container">
      <Button onClick={handleEnabled}>Editar</Button>
      <form method="put">
        <section>
          <label htmlFor="mail">
            Email
            <input
              type="email"
              name="mail"
              disabled={isDisabled}
              value={mail}
              onChange={(evento)=>{setMail(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="nombre">
            Nombre
            <input
              type="text"
              name="nombre"
              value={nombre}
              disabled={isDisabled}
              onChange={(evento)=>{setNombre(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="apeUno">
            Primer apellido
            <input
              type="text"
              name="apeUno"
              disabled={isDisabled}
              value={apeUno}
              onChange={(evento)=>{setApeUno(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="apeDos">
            Segundo Apellido
            <input
              type="text" name="apeDos" value={apeDos} disabled={isDisabled} onChange={(evento)=>{setApeDos(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="userName">
            Direccion
            <input
              type="text"
              name="userName"
              readOnly={true}
              value={userName}
              onChange={(evento)=>{setUserName(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="fNacimiento">
            Provincia
            <input
              type="date"
              disabled={isDisabled}
              name="fNacimiento"
              value={fechaNacimiento}
              onChange={(evento)=>{setFechaNacimiento(evento.target.value)}}
            />
          </label>
        </section>

        <section className="botonera-login">
          <button onClick={handleSubmit} disabled={isDisabled} >Actualizar</button>
        </section>
      </form>
    </div>
  );
}

export default ActualizarPerfil;