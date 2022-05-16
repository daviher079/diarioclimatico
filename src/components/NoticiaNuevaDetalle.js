import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NoticiaNuevaDetalle() {
  const navigate = useNavigate();
  const [vacioApeUno, setVacioApeUno] = useState("none");

  const [tipo, setTipo] = useState()
  
  const [noticia, setNotica] = useState({
    titulo: "",
    cuerpo: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setNotica({ ...noticia, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fecha = hoy.toLocaleDateString();

    axios.post('http://localhost:8080/noticias/save', {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo,
        usuario: {
            id:1
        },
        tipo: "Cambio climatico",
        fecha:  "2019-07-04 20:38:38"
    })
      .then(function (response) {
          if(response.status===200){
            //sessionStorage.setItem("userName", user.userName);
            
            navigate("/VerPerfil/Noticias");
          }
          
        
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log("errooooor")
        
        setVacioApeUno("none");
        
        if(error.response.data.apeUno===""){
            setVacioApeUno("block");
        }
        
        

    });

     
  };


  const errorVacioApeUno = {
    color: "red",
    display: vacioApeUno,
  };




  return (
    <div className="container">
      <div className="row align-items-stretch no-gutters contact-wrap">
        <div className="col-md-12">
          <div className="form h-100">
            <h3>Registro</h3>
            <form
              method="POST"
              className="form-horizontal mb-5"
              id="contactForm"
              name="contactForm"
            >
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label className="col-form-label" htmlFor="mail">
                    Titulo
                  </label>
                  <input
                    name="titulo"
                    type="text"
                    placeholder="Titulo"
                    className="form-control input-md"
                    onChange={handleChange}
                    required={true}
                    value={noticia.titulo}
                  />
                 
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="col-form-label" htmlFor="nombre">
                    Tipo de Noticia
                  </label>
                  <select className="form-select form-select-lg col-lg-12" onChange={(evento)=>{setTipo(evento.target.value)}} aria-label=".form-select-lg example">
                    <option value="Cambio Climatico">Cambio climatico</option>
                    <option value="Contaminacion">Contaminación</option>
                    <option value="Energia no Renovable">Energia no Renovable</option>
                    <option value="Energia Renovable">Energia Renovable</option>
                    <option value="Residuos">Residuos</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group mb-6">
                  <label className="col-form-label" htmlFor="apeUno">
                    Cuerpo
                  </label>
                  <textarea name="cuerpo" rows="10" cols="50" placeholder="Primer apellido"
                    className="form-control input-md"
                    required={true}
                    onChange={handleChange}
                    value={noticia.cuerpo}>

                  </textarea>
                 
                  <p style={errorVacioApeUno}>
                    Error. El campo no puede estar vacio
                  </p>
                </div>
                
              </div>



              

              <div className="row">
                <div className="col-md-12 form-group">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary rounded-0 py-2 px-4"
                  >
                    Nueva Noticia
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
