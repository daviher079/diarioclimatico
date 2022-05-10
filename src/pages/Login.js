import React, { useState } from 'react'
import {useAuth} from '../context/authContext'
import {Link} from 'react-router-dom'

export default function Login() {

   // const navigate = useNavigate();
    //
    const [ user, setUser ] = useState({
        mail: "",
        password: ""
    });

    //const {login} = useAuth();

    const handleChange = ({target: {name, value}})=>
    {
        setUser({...user, [name]: value});
    }
/*
    const handleSubmit = async (e)=>
    {
        e.preventDefault()

        await login(user.mail, user.password);

            
        
    }
    */

  return (
    <div className="App">
        
        <header className="App-header">
            <h2>Registrar usuario</h2>
        </header>
        <main className="App-main">
            <form>
                <section>
                    <label htmlFor='mail'>
                        Email
                        <input type="email" name='mail' onChange={handleChange} />
                    </label>
                </section>

                <section>
                    <label htmlFor='password'>
                        Pass
                        <input type="password" name='password' onChange={handleChange}/>
                    </label>
                </section>


                <section className='botonera-login'>
                    
                    <Link to="./RegistrarUsuarios">
                        Nuevo Usuario
                    </Link>
                    <input type="submit" value="Login" />
                </section>
            </form>
        </main>
    </div>
  )
}