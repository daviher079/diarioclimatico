import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'
export default function NuevoUsuarioAdm(){

    const navigate = useNavigate();
    const [miDisplay, setMiDisplay] = useState('none');
	const [miUserName, setMiUserName] = useState('none');
	const [vacioMail, setVacioMail] = useState('none');
	const [vacioPass, setVacioPass] = useState('none')
	const [vacioNombre, setVacioNombre] = useState('none')
	const [vacioApeUno, setVacioApeUno] = useState('none')
	const [vacioApeDos, setVacioApeDos] = useState('none')
	const [vacioUserName, setVacioUserName] = useState('none')
	const [vacioFecha, setVacioFecha] = useState('none')

    const [ user, setUser ] = useState({
        mail: "",
        password: "",
        rep: "",
        nombre: "",
        apeUno: "",
        apeDos: "",
        userName: "",
        fecha:""
    });

    const handleChange = ({target: {name, value}})=>
    {
        setUser({...user, [name]: value});
    }

   

    const handleSubmit = async (e) => {
        e.preventDefault();
		
        if(user.password===user.rep){
            axios.post('http://localhost:8080/usuarios/save', {
            nombre: user.nombre,
            apeUno: user.apeUno,
            apeDos: user.apeDos,
            mail: user.mail,
            password: user.password,
			userName: user.userName,
            fechaNacimiento: user.fecha,
            rol: "USUARIO",
            enabled: true
          })
          .then(function (response) {
			  if(response.status===200){
				
				console.log(response);
				navigate("/VerPerfil/Usuarios");
			  }
			  
            
          })
          .catch(function (error) {
            console.log(error.response.data);
			console.log("errooooor")
			
			setMiDisplay("none");
			setMiUserName("none");
			setVacioApeDos("none");
			setVacioApeUno("none");
			setVacioFecha("none");
			setVacioMail("none");
			setVacioNombre("none");
			setVacioPass("none");
			setVacioUserName("none");
			
			if(error.response.data.apeDos===""){
				setVacioApeDos("block");
			}
			if(error.response.data.apeUno===""){
				setVacioApeUno("block");
			}
			
			if(error.response.data.fechaNacimiento===null){
				setVacioFecha("block");
			}

			if(error.response.data.mail===""){
				setVacioMail("block");
			}

			if(error.response.data.nombre===""){
				setVacioNombre("block");
			}

			if(error.response.data.password===""){
				setVacioPass("block");
			}

			if(error.response.data.userName===""){
				setVacioUserName("block");
			}

			if(error.response.data.userName===null)
			{
				setMiUserName("block");
			}

			

          });
        }else{
            setMiDisplay("block");
        }
        
      };

      const error = {
        color: "red",
        display: miDisplay
      };

	  const errorUserName = {
        color: "red",
        display: miUserName
      };

	  const errorVacioFecha =
	  {
		color: "red",
        display: vacioFecha
	  }

	  const errorVacioApeUno =
	  {
		color: "red",
        display: vacioApeUno
	  }
	  const errorVacioApeDos =
	  {
		color: "red",
        display: vacioApeDos
	  }

	  const errorVacioMail =
	  {
		color: "red",
        display: vacioMail
	  }

	  const errorVacioNombre =
	  {
		color: "red",
        display: vacioNombre
	  }

	  const errorVacioPass =
	  {
		color: "red",
        display: vacioPass
	  }

	  const errorVacioUserName =
	  {
		color: "red",
        display: vacioUserName
	  }

    return(
        <div className="container">
		<div className="row align-items-stretch no-gutters contact-wrap">
			<div className="col-md-12">
				<div className="form h-100">
					<h3>Registro</h3>
					<form method="POST" className="form-horizontal mb-5" id="contactForm" name="contactForm">
						<div className="row">
							<div className="col-md-6 form-group mb-3">
								<label className="col-form-label" htmlFor="mail">Email</label> 
                                <input name="mail" type="email" placeholder="mail"
									className="form-control input-md" onChange={handleChange} required={true} value={user.mail}/>
								<p style={errorVacioMail}>Error. El campo no puede estar vacio</p>
							</div>
							<div className="col-md-6 form-group mb-3">
								<label className="col-form-label" htmlFor="nombre">Nombre</label> <input
									name="nombre" type="text" placeholder="nombre"
									className="form-control input-md" onChange={handleChange} required={true} value={user.nombre}/>
									<p style={errorVacioNombre}>Error. El campo no puede estar vacio</p>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 form-group mb-3">

								<label className="col-form-label" htmlFor="apeUno">Primer
									apellido</label> <input name="apeUno" type="text"
									placeholder="Primer apellido" className="form-control input-md"
									required={true} onChange={handleChange} value={user.apeUno}/>
									<p style={errorVacioApeUno}>Error. El campo no puede estar vacio</p>
							</div>
							<div className="col-md-6 form-group mb-3">

								<label className="col-form-label" htmlFor="apeDos">Segundo
									apellido</label> <input name="apeDos" type="text"
									placeholder="Segundo apellido" className="form-control input-md" onChange={handleChange}
									required={true} value={user.apeDos}/>
									<p style={errorVacioApeDos}>Error. El campo no puede estar vacio</p>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 form-group mb-3">
								<label className="col-form-label" htmlFor="userName">Username</label>

								<input name="userName" type="text"
									placeholder="Username" onChange={handleChange} className="form-control input-md" required={true}
									value={user.userName}/>
								<p style={errorVacioUserName}>Error. El campo no puede estar vacio</p>	
								<p style={errorUserName}>Error. El nombre de usuario ya existe</p>
							</div>
							<div className="col-md-6 form-group mb-3">
								<label className="col-form-label" htmlFor="fecha">Fecha de Nacimiento</label>

								<input name="fecha" type="date" onChange={handleChange}
									className="form-control input-md" required={true}
									value={user.fechaNacimiento}/>
								<p style={errorVacioFecha}>Error. El campo no puede estar vacio</p>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 form-group mb-3">
                            <label className="col-form-label" htmlFor="password">Password</label> <input
									name="password" type="password" onChange={handleChange}
									className="form-control input-md" required={true} value={user.password}/>
									<p style={errorVacioPass}>Error. El campo no puede estar vacio</p>
							</div>

							<div className="col-md-6 form-group mb-3">

                            <label className="col-md-4 control-label" htmlFor="rep">Rep.
									password</label> <input name="rep"
									type="password" onChange={handleChange} className="form-control input-md"
									required={true} value={user.repPassword}/>
								<p style={error}>Error. Asegurese de poner la misma contraseña</p>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 form-group mb-3">
                            <button onClick={handleSubmit} className="btn btn-primary rounded-0 py-2 px-4">
                                Crear Usuario
                            </button>
							</div>
							<div className="col-md-6 form-group mb-3 d-flex flex-row-reverse">
								<Link to="/VerPerfil/Usuarios">Volver</Link>

							</div>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
    );
}