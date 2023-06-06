import './home.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../services/index';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home(){
    const navegate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then( result =>{
                navegate('/admin', {replace: true})
            })
            .catch(e => alert(e));
        }else{
            alert('Preencha todos os campos')
        }
    }


    return(
        <div className='home_container'>
            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda de forma facil ! </span>

            <form onSubmit={handleLogin}>
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

                <button type='submit' >Acessar</button>
            </form>


            <Link to='/register'>Não possui uma conta? Cadastre-se </Link>





        </div>
    )
}