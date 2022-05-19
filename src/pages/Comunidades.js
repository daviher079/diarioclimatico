import Header from "../components/Header";
import Aside from "../components/Aside";

import "../assets/css/comunidades.css";
import Comunidad from "../components/Comunidad";
import React from "react";

export default function Comunidades() {
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
          <Comunidad />
        </article>
      </section>
    </div>
  );
}
