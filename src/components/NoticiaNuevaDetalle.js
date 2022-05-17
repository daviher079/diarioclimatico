import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NoticiaNuevaDetalle() {

  var mailSession = sessionStorage.getItem("userName");
  const navigate = useNavigate();
  const [vacioCuerpo, setVacioCuerpo] = useState("none");
  const [vacioTitulo, setVacioTitulo] = useState("none");

  const [tipo, setTipo] = useState("Cambio Climatico")
  const [miId, setId] = useState(0);
  const [noticia, setNotica] = useState({
    titulo: "",
    cuerpo: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setNotica({ ...noticia, [name]: value });
  };


  useEffect(() => {
    misDatos();
  }, []);
  const misDatos = async () => {
    let peticion = `http://localhost:8080/usuarios/findN/${mailSession}`;
    return await fetch(peticion, {
      method: "GET",
    })
    .then((response) => response.json())
      .then((response) => {
        console.log("hola")
        setId(response.id);
      });
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("despues de mis noticias")
    misDatos();
    const moment = require('moment');
    let fecha = moment().format('YYYY-MM-DD');

    
    console.log("44"+miId);
    axios.post('http://localhost:8080/noticias/save', {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo,
        usuario: {
            id:miId
        },
        tipo: tipo,
        fecha: fecha
    })
      .then(function (response) {
          if(response.status===200){
            //sessionStorage.setItem("userName", user.userName);
            
            navigate("/VerPerfil/Noticias");
          }
          
        
      })
      .catch(function (error) {
        console.log(error.response);
        console.log("errooooor")
        
        setVacioCuerpo("none");
        setVacioTitulo("none");
        
        if(error.response.data.titulo===""){
            setVacioTitulo("block");
        }

        if(error.response.data.cuerpo===""){
          setVacioCuerpo("block");
        }
        
        

    });

     
  };


  const errorVacioTitulo = {
    color: "red",
    display: vacioTitulo,
  };

  const errorVacioCuerpo = {
    color: "red",
    display: vacioCuerpo,
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
                 
                 <p style={errorVacioTitulo}>
                    Error. El campo no puede estar vacio
                  </p>
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="col-form-label" htmlFor="nombre">
                    Tipo de Noticia
                  </label>
                  <select className="form-select form-select-lg col-lg-12" onChange={(evento)=>{setTipo(evento.target.value)}} aria-label=".form-select-lg example">
                    <option value="Cambio Climatico" >Cambio climatico</option>
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
                  <textarea name="cuerpo" rows="10" cols="50" placeholder="Introducir texto..."
                    className="form-control input-md"
                    required={true}
                    onChange={handleChange}
                    value={noticia.cuerpo}>

                  </textarea>
                 
                  <p style={errorVacioCuerpo}>
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
