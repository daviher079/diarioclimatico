import ActualizarPerfil from "../components/ActualizarPerfil";
import Header from "../components/Header";
import React from "react";
import Aside from "../components/Aside"

export default function VerPerfil() {
  const sectionStyle = {
    display: "flex",
    width: "100px",
  };

  return (
    <div>
      <Header></Header>

      <section style={sectionStyle}>
        <Aside />
        <article>
          <ActualizarPerfil />
        </article>
      </section>
    </div>
  );
}
