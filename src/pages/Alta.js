import Header from "../components/Header";
import NuevoUsuarioAdm from "../components/NuevoUsuarioAdm";


export default function DarAlta(){
/**
 * En esta página se encuentra el alta de un usuario cuando aún
 * no está un usuario dado de alta en la aplicacion
 * Está compuesta por un componente Header que se mostrará en 
 * todas las páginas de la web y un componente que contendrá el
 * formulario para la entrada de datos
 */
    return(
        <div>
            <Header></Header>
            <NuevoUsuarioAdm></NuevoUsuarioAdm>

        </div>
    );
}