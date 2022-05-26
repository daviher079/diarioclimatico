import Header from "../components/Header";
import NoticiaNuevaDetalle from "../components/NoticiaNuevaDetalle";


/**
 * 
 * Desde esta pagina el usuario verá un formulario para introducir los
 * campos de una noticia 
 * 
 */

export default function DarAlta(){
    return(
        <div>
            <Header></Header>
            <NoticiaNuevaDetalle></NoticiaNuevaDetalle>

        </div>
    );
}