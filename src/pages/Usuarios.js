import Header from "../components/Header";
import Usuario from "../components/Usuario";
import React from "react";
import Aside from "../components/Aside"

export default function Usuarios() {
  
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

        <Usuario />
      </article>
      </section>
    </div>
  );
}
