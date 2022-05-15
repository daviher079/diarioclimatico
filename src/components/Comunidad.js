import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState } from "react";

export default function Comunidad(props) {
  const { comunidades } = props;
  const [nombre, setNombre] = useState("");

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const[cc01, setCc01]=useState(0);
  const[cc02, setCc02]=useState(0);
  const[cc03, setCc03]=useState(0);
  const[cc04, setCc04]=useState(0);
  const[cc05, setCc05]=useState(0);

  const[co01, setCo01]=useState(0);
  const[co02, setCo02]=useState("");
  const[co03, setCo03]=useState(0);
  const[co04, setCo04]=useState("");

  const[enr01, setEnr01]=useState(0);
  const[enr02, setEnr02]=useState(0);
  const[enr03, setEnr03]=useState(0);
  const[enr04, setEnr04]=useState(0);

  const[er01, setEr01]=useState(0);
  const[er02, setEr02]=useState(0);
  const[er03, setEr03]=useState(0);
  const[er04, setEr04]=useState(0);

  const handleClose = () => setShow(false);
  function handleShow(breakpoint, opcion) {
    setNombre(opcion.nombre);
    setFullscreen(breakpoint);
    datosComunidad(opcion.nombre);
    setShow(true);
  }


  const datosComunidad = async (nombre) => {
    let peticion = `http://localhost:8080/comunidades/findByNombre/${nombre}`;

    return await fetch(peticion, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
       console.log(response)
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
      });
  };

  return (
    <Container>
      <Row className="container px-4 px-lg-5 mt-5 row-cols-3 row-cols-md-3 row-cols-xl-3 justify-content-center">
        {comunidades.map((comunidad) => {
          return (
            <Col xs={4} className="abs-center" key={comunidad.nombre}>
              <Button size="lg" onClick={(v) => handleShow(v, comunidad)}>
                {comunidad.nombre}
              </Button>
            </Col>
          );
        })}
      </Row>
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
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="cambioClimatico" title="CambioClimatico">
            <form method="put">
        <section>
          <label htmlFor="enr01">
            Niveles de CO2
            <input
              type="number"
              name="enr01"
              value={cc01}
              onChange={(evento)=>{setCc01(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="cc02">
            Temperatura Media
            <input
              type="number"
              name="cc02"
              value={cc02}
              onChange={(evento)=>{setCc02(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="cc03">
            Niveles de lluvia
            <input
              type="number"
              name="cc03"
              
              value={cc03}
              onChange={(evento)=>{setCc03(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="cc04">
          Nº de incendios en la ult. decada
            <input
              type="number" name="cc04" 
              value={cc04}
              onChange={(evento)=>{setCc04(evento.target.value)}}
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
              onChange={(evento)=>{setCc05(evento.target.value)}}
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
              value={co01}
              onChange={(evento)=>{setCo01(evento.target.value)}}
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
              onChange={(evento)=>{setCo02(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="co03">
            Contaminacion atmosferica
            <input
              type="number"
              name="co03"
              
              value={co03}
              onChange={(evento)=>{setCo03(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="co04">
            Nivel de vegetación
            <input
              type="text" name="co04" 
              value={co04}
              onChange={(evento)=>{setCo04(evento.target.value)}}
            />
          </label>
        </section>
</form>
            </Tab>
            <Tab eventKey="EnergiaRenovable" title="Energía Renovable">
            <form method="put">
            <section>
          <label htmlFor="enr01">
            Nivel de petroleo
            <input
              type="number"
              name="enr01"
              value={enr01}
              onChange={(evento)=>{setEnr01(evento.target.value)}}
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
              onChange={(evento)=>{setEnr02(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="enr03">
            Niveles de gas natural
            <input
              type="number"
              name="enr03"
              
              value={enr03}
              onChange={(evento)=>{setEnr03(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="enr04">
            Nivel de carbón
            <input
              type="number" name="enr04" 
              value={enr04}
              onChange={(evento)=>{setEnr04(evento.target.value)}}
            />
          </label>
        </section>
            </form>
            </Tab>
            <Tab eventKey="EnergiaRenovable" title="Energia Renovable">
            <form method="put">
            <section>
          <label htmlFor="er01">
            Nivel de petroleo
            <input
              type="number"
              name="er01"
              value={er01}
              onChange={(evento)=>{setEr01(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="er02">
            Nivel de uranio
            <input
              type="number"
              name="er02"
              value={er02}
              onChange={(evento)=>{setEr02(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="er03">
            Niveles de gas natural
            <input
              type="number"
              name="er03"
              
              value={er03}
              onChange={(evento)=>{setEr03(evento.target.value)}}
            />
          </label>
        </section>

        <section>
          <label htmlFor="er04">
            Nivel de carbón
            <input
              type="number" name="er04" 
              value={er04}
              onChange={(evento)=>{setEr04(evento.target.value)}}
            />
          </label>
        </section>
            </form>
            </Tab>
            <Tab eventKey="contact" title="Contact"></Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
