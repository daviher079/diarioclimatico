import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Header from "../components/Header";
export default function Login() {

   const navigate = useNavigate();
    //
    const [ user, setUser ] = useState({
        mail: "",
        password: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  

    //const {login} = useAuth();

    const handleChange = ({target: {name, value}})=>
    {
        setUser({...user, [name]: value});
    }

    /**
     * Esta petición se ejecutará al hacer clic en el boton de login 
     * los parametros serán enviados al back mediante un metodo post 
     * y la respuesta del back será o un 200 o 404 en caso de dar un 
     * 200 el username del usuario será guardado en la session y 
     * redirigido hacia la vista de incio, pero en caso de que el back
     *  devuelva un 404 el usuario será notificado del error    
     * 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        let peticion = `http://localhost:8080/usuarios/login/${user.userName}/${user.password}`;
        const peticionInicial = await fetch(peticion, {
          method: "POST",
        });
    
        if (peticionInicial.ok === true) {
          console.log("Todo ok Jose Luis");
          
    
          sessionStorage.setItem("userName", user.userName);
    
          navigate("/");
        } else {
            
            setShow(true);
        }
      };

      const error = {
        color: "red"
      };


      /**
       * Esta vista cargará la ventana de login para que el usuario introduzca sus datos
       * en caso de estar registrado. Ademas tiene un boton que nos lleva hasta la vista 
       * de dar alta a un usuario 
       * 
       */
  return (
    
    <div>
    <Header></Header>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Login Incorrecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p style={error}>Contraseña o usuario incorrectos</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
               
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                    <div className="img">
          
              </div>
                    <div className="login-wrap p-4 p-md-5">
                    <h2 className="heading-section">INTRODUCE TUS DATOS</h2>
                        <form method="POST" className="signin-form">
                      <div className="form-group mb-3">
                          <label className="label" htmlFor="userName">Nombre </label>
                          <input type="email" name="userName" onChange={handleChange} className="form-control" required/>
                      </div>
                <div className="form-group mb-3">
                    <label className="label" htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} className="form-control" required/>
                 
                </div>
                <div className="form-group">
                    
                    <button onClick={handleSubmit} className="form-control btn btn-primary rounded submit px-3" >Login</button>
                </div>
                <div className="form-group d-md-flex">
                    <div className="w-50 text-left">
              <Link to="/">Volver</Link>
                        
                                </div>
                                <div className="w-50 text-md-right">
                                <Link to="/DarAlta">Nuevo Usuario</Link>
                                </div>
                </div>
              </form>
              
            </div>
          </div>
            </div>
        </div>
    </div>
);
}