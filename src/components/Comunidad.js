import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Comunidad() {
  const [nombre, setNombre] = useState("");
  const [nombreDetalle, setNombreDetalle] = useState("");
  const navigate = useNavigate();
  const [id, setId] = useState(0);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [cc01, setCc01] = useState(0);
  const [cc02, setCc02] = useState(0);
  const [cc03, setCc03] = useState(0);
  const [cc04, setCc04] = useState(0);
  const [cc05, setCc05] = useState(0);

  const [co01, setCo01] = useState(0);
  const [co02, setCo02] = useState("");
  const [co03, setCo03] = useState(0);
  const [co04, setCo04] = useState("");

  const [enr01, setEnr01] = useState(0);
  const [enr02, setEnr02] = useState(0);
  const [enr03, setEnr03] = useState(0);
  const [enr04, setEnr04] = useState(0);

  const [er01, setEr01] = useState(0);
  const [er02, setEr02] = useState(0);
  const [er03, setEr03] = useState(0);
  const [er04, setEr04] = useState(0);

  const [res01, setRes01] = useState(0);
  const [res02, setRes02] = useState(0);
  const [res03, setRes03] = useState(0);
  const [res04, setRes04] = useState(0);
  const [res05, setRes05] = useState(0);

  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    misComunidades();
  }, []);

  /**
   * Esta funcion flecha se ejecuta cada vez que haya un cambio en el componente 
   * y se cargaran todas las comunidades que estén en la base de datos en useState
   * de comunidades
   */

  const misComunidades = async () => {
    let peticion = "http://localhost:8080/comunidades/all";
    const peticionInicial = await fetch(peticion);
    const peticionResultados = await peticionInicial.json();

    setComunidades(peticionResultados);
  };

  const handleClose = () => setShow(false);
  function handleShow(breakpoint, opcion) {
    setNombre(opcion.nombre);
    setId(opcion.id);
    setFullscreen(breakpoint);
    datosComunidad(opcion.nombre);
    setShow(true);
  }

  /**
   * Esta función será será la que se ejecute cada vez que se quiera acceder
   * a los datos de una comunidad en concreto. Dicha comunidad se mostrarán
   * sus datos en una ventana modal 
   * 
   */
  const datosComunidad = async (nombre) => {
    let peticion = `http://localhost:8080/comunidades/findByNombre/${nombre}`;

    return await fetch(peticion, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        /**
         * Los datos son cargados en cada uno de los useState de cada campo
         * para cambio climatico, contaminación, energía renovable
         * energia no renovable y residuos
         * 
         * 
         */
        setNombreDetalle(response.nombre);
        setId(response.id);
        setCc01(response.cambioClimatico.cc01);
        setCc02(response.cambioClimatico.cc02);
        setCc03(response.cambioClimatico.cc03);
        setCc04(response.cambioClimatico.cc04);
        setCc05(response.cambioClimatico.cc05);

        setCo01(response.contaminacion.co01);
        setCo02(response.contaminacion.co02);
        setCo03(response.contaminacion.co03);
        setCo04(response.contaminacion.co04);

        setEnr01(response.energiaNoRenovable.enr01);
        setEnr02(response.energiaNoRenovable.enr02);
        setEnr03(response.energiaNoRenovable.enr03);
        setEnr04(response.energiaNoRenovable.enr04);

        setEr01(response.energiaRenovable.er01);
        setEr02(response.energiaRenovable.er02);
        setEr03(response.energiaRenovable.er03);
        setEr04(response.energiaRenovable.er04);

        setRes01(response.residuos.res01);
        setRes02(response.residuos.res02);
        setRes03(response.residuos.res03);
        setRes04(response.residuos.res04);
        setRes05(response.residuos.res05);
      });
  };


  /***
   * Está función será la encargada de actualizar los campos de la comunidad en caso 
   * de dejar algun campo vacio no se ejecutarán y los campos no sufriran ninguna modificación
   */
  function actualizaCC() {
    let peticion = "http://localhost:8080/comunidades/cambioClimatico/update";

    axios
      .put(peticion, {
        cc01: cc01,
        cc02: cc02,
        cc03: cc03,
        cc04: cc04,
        cc05: cc05,
        comunidad: {
          id: id,
          nombre: nombreDetalle,
          cambioClimatico: null,
          contaminacion: null,
          energiaRenovable: null,
          energiaNoRenovable: null,
          residuos: null,
        },
      })
      .then((data) => {
        /**
         * En caso de actualizar los campos correctamente el usuario será dirigido 
         * al apartado de comunidades donde se volverán a renderizar todas de nuevo
         */
        console.log(data.data);
        if (data.data === "ok") {
          navigate("/VerPerfil/Comunidades");
          misComunidades();
          setShow(false);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }
/**
 * Esta función será la que se ejecute cuando se esté mostrando la ventana modal
 * y el usuario haga clic en el boton de actualizar lo que desencadenará la peticion
 * 
 * 
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    actualizaCC();
  };

  const tabsKeys = Object.keys(comunidades);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);
  return (
    <Container>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          {comunidades.map((comunidad) => {
            return (
              <div
                key={comunidad.id}
                className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
              >
                <div className="col mb-5">
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{comunidad.nombre}</h5>

                        <Button onClick={(v) => handleShow(v, comunidad)}>
                          Actualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        fullscreen={fullscreen}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title>Comunidad: {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="cambioClimatico"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="cambioClimatico" title="Cambio Climatico">
              <form method="put">
                <section>
                  <label htmlFor="cc01">
                    Niveles de CO2
                    <input
                      type="number"
                      name="cc01"
                      min={1}
                      value={cc01}
                      onChange={(evento) => {
                        setCc01(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="cc02">
                    Temperatura Media
                    <input
                      type="number"
                      name="cc02"
                      min={1}
                      value={cc02}
                      onChange={(evento) => {
                        setCc02(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="cc03">
                    Niveles de lluvia
                    <input
                      type="number"
                      name="cc03"
                      min={1}
                      value={cc03}
                      onChange={(evento) => {
                        setCc03(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="cc04">
                    Nº de incendios en la ult. decada
                    <input
                      type="number"
                      name="cc04"
                      value={cc04}
                      min={1}
                      onChange={(evento) => {
                        setCc04(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="cc05">
                    Hectareas de nuevos bosques
                    <input
                      type="number"
                      name="cc05"
                      value={cc05}
                      min={1}
                      onChange={(evento) => {
                        setCc05(evento.target.value);
                      }}
                    />
                  </label>
                </section>
              </form>
            </Tab>
            <Tab eventKey="Contaminacion" title="Contaminacion">
              <form method="put">
                <section>
                  <label htmlFor="co01">
                    Consumo de combustibles fosiles
                    <input
                      type="number"
                      name="co01"
                      min={1}
                      value={co01}
                      onChange={(evento) => {
                        setCo01(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="co02">
                    Calidad del aire
                    <input
                      type="text"
                      name="co02"
                      value={co02}
                      onChange={(evento) => {
                        setCo02(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="co03">
                    Contaminacion atmosferica
                    <input
                      type="number"
                      name="co03"
                      min={1}
                      value={co03}
                      onChange={(evento) => {
                        setCo03(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="co04">
                    Nivel de vegetación
                    <input
                      type="text"
                      name="co04"
                      value={co04}
                      onChange={(evento) => {
                        setCo04(evento.target.value);
                      }}
                    />
                  </label>
                </section>
              </form>
            </Tab>
            <Tab eventKey="energiaNoRenovable" title="Energía No Renovable">
              <form method="put">
                <section>
                  <label htmlFor="enr01">
                    Nivel de petroleo
                    <input
                      type="number"
                      name="enr01"
                      min={1}
                      value={enr01}
                      onChange={(evento) => {
                        setEnr01(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="enr02">
                    Nivel de uranio
                    <input
                      type="number"
                      name="enr02"
                      value={enr02}
                      onChange={(evento) => {
                        setEnr02(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="enr03">
                    Niveles de gas natural
                    <input
                      type="number"
                      name="enr03"
                      min={1}
                      value={enr03}
                      onChange={(evento) => {
                        setEnr03(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="enr04">
                    Nivel de carbón
                    <input
                      type="number"
                      name="enr04"
                      value={enr04}
                      min={1}
                      onChange={(evento) => {
                        setEnr04(evento.target.value);
                      }}
                    />
                  </label>
                </section>
              </form>
            </Tab>
            <Tab eventKey="energiaRenovable" title="Energía Renovable">
              <form method="put">
                <section>
                  <label htmlFor="er01">
                    Potencia eólica
                    <input
                      type="number"
                      name="er01"
                      min={1}
                      value={er01}
                      onChange={(evento) => {
                        setEr01(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="er02">
                    Potencia solar fotovoltaica
                    <input
                      type="number"
                      name="er02"
                      min={1}
                      value={er02}
                      onChange={(evento) => {
                        setEr02(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="er03">
                    Potencia solar termica
                    <input
                      type="number"
                      name="er03"
                      min={1}
                      value={er03}
                      onChange={(evento) => {
                        setEr03(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="er04">
                    Potencia hidraulica
                    <input
                      type="number"
                      name="er04"
                      value={er04}
                      min={1}
                      onChange={(evento) => {
                        setEr04(evento.target.value);
                      }}
                    />
                  </label>
                </section>
              </form>
            </Tab>
            <Tab eventKey="residuos" title="Residuos">
              <form method="put">
                <section>
                  <label htmlFor="res01">
                    Res. urbanos recogidos por habitante
                    <input
                      type="number"
                      name="res01"
                      min={1}
                      value={res01}
                      onChange={(evento) => {
                        setRes01(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="res02">
                    Res. mezclados recogidos por habitante
                    <input
                      type="number"
                      min={1}
                      name="res02"
                      value={res02}
                      onChange={(evento) => {
                        setRes02(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="res03">
                    Res. de papel y cartón recogidos por habitante
                    <input
                      type="number"
                      name="res03"
                      min={1}
                      value={res03}
                      onChange={(evento) => {
                        setRes03(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="res04">
                    Res. de vidrio recogidos por habitante
                    <input
                      type="number"
                      name="res04"
                      value={res04}
                      min={1}
                      onChange={(evento) => {
                        setRes04(evento.target.value);
                      }}
                    />
                  </label>
                </section>

                <section>
                  <label htmlFor="res05">
                    Envases mixtos y embalajes mezclados recogidos por habitante
                    <input
                      type="number"
                      name="res05"
                      value={res05}
                      min={1}
                      onChange={(evento) => {
                        setRes05(evento.target.value);
                      }}
                    />
                  </label>
                </section>
              </form>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
