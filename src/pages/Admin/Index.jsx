import './Admin.css';
import { useState, useEffect } from 'react';
import {db} from '../../services/index';
import {auth} from '../../services/index'
import {signOut} from 'firebase/auth';
import {
    addDoc, 
    collection, 
    onSnapshot,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc
    } from 'firebase/firestore';

export default function Admin(){


    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() =>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser");
            setUser(JSON.parse(userDetail));
            
            
            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas");
                const q = query(tarefaRef,orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) =>{
                    let lista = [];
                    snapshot.forEach((doc) =>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                   
                    setTarefas(lista)
                })
            }
        }


        loadTarefas()
    },[])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ''){
            alert('Digite uma tarefa antes de salvar')
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }


        await addDoc(collection(db,"tarefas"),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then((response) => {
            setTarefaInput('');
            alert('Tarefa Adicionada')
        })
        .catch(() => alert('Erro ao adicionar tarefa'))
    }

    async function handleLogout(){
        await signOut(auth);
    }

    async function deletarTarefa(id){
        const docRef = doc(db,"tarefas", id)
        await deleteDoc(docRef)
        
    }

    async function editarTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item)
        

    }

    async function handleUpdateTarefa(){
        const docRef = doc(db,"tarefas", edit.id)
        await updateDoc(docRef,{
            tarefa: tarefaInput
        })
        .then(() =>{
            setTarefaInput('');
            setEdit({})
        })
        .catch(erro => {
            setEdit({})
            setTarefaInput('')
            alert(erro)
        })
    }


    return(
        <div className="home_container">
            <h1>Minhas tarefas</h1>
            <form onSubmit={handleRegister}>
                <textarea 
                cols="30" 
                rows="10"
                value={tarefaInput}
                onChange={e => setTarefaInput(e.target.value)}
                placeholder='Digite sua tarefa'
                />
                {
                    Object.keys(edit).length > 0 ?(
                        <button className='btn_register' style={{background: '#6add39', color: 'black'}} type='submit'>Atualizar Tarefa</button> 
                    ) : (
                        <button className='btn_register' type='submit'>Cadastrar Tarefa</button> 
                    )
                }               
            </form>

                {
                    tarefas.map( (item) =>(
                        <article className='list' key={item.id}>
                            <p>{item.tarefa}</p>
                        <div>
                            <button onClick={() => editarTarefa(item)}>Editar</button>
                            <button className='btn-delete' onClick={() =>deletarTarefa(item.id)}>Concluir</button>
                        </div>
                    </article>
                    )
                    )
                }
           

            <button className='btn_logout' onClick={handleLogout} >Sair</button>
        </div>
    )
}