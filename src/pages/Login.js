import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
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

  return (
    <section className="ftco-section">
    <div className="container">
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
                <h2 className="heading-section">INTRODUCE TUS DATOS</h2>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
                <div className="wrap d-md-flex">
                    <div className="img">
          
              </div>
                    <div className="login-wrap p-4 p-md-5">
                    
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
</section>
);
}