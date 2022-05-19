import Header from "../components/Header";
import Noticia from "../components/Noticia";
import React from "react";
import Aside from "../components/Aside"

export default function Noticias() {
  
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
          <Noticia />
        </article>
      </section>
    
    </div>
  );
}