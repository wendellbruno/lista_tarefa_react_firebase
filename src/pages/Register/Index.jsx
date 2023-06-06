import './register.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../services/index';
import {createUserWithEmailAndPassword} from 'firebase/auth';

export default function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


   async function handleRegister(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth,email,password)
            .then(() =>{
                navigate("/admin", {replace: true})
            })
            .catch((e) =>{
                alert(e)
            })
        }else{
            alert('Preencha todos os campos')
        }
    }


    return(
        <div className='home_container'>
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta ! </span>

            <form onSubmit={handleRegister}>
                <input type="text"
                placeholder='Digite seu Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input type="password"
                
                placeholder='*******'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />

                <button type='submit' >Cadastrar</button>
            </form>


            <Link to='/'>Já possui uma conta ? faça login </Link>





        </div>
    )
}