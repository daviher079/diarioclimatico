import React from "react";
import AsideNoticias from "../components/AsideNoticias"
import Header from "../components/Header";
import NoticiasTipo from "../components/NoticiasTipo";
import { Routes, Route } from 'react-router-dom';

function NoticiasPage() {

  
    const sectionStyle = {
        display: "flex"
      };
return(
    
    <div>
      <Header></Header>

     <section style={sectionStyle}>
        <AsideNoticias />
        <article>
         <NoticiasTipo/>
         <Routes>
                <Route path='/noticias/:campo' element={<NoticiasTipo />} />
            </Routes>
        </article>
      </section>
    
    </div>
);

}


export default NoticiasPage;