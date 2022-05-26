import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
export default function Desconectar() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        sessionStorage.clear();
    
          navigate("/");
    }

    /**
     * Esta página nos devolverá a la ventana de inicio 
     * pero antes se vaciará todo el contenido que haya 
     * almacenado en sessionStorage
     * 
     */
    return(

        <div>
             <Header></Header>
             <h1>Se ha cerrado sesion</h1>
             <button onClick={handleSubmit} 
            className="btn btn-outline-dark" >Volver</button>
       
        </div>
       
    );
}