import { useEffect, useState } from "react"
import Tarefa from "../Tarefa"
import "./ListaDeTarefas.css"

function ListaDeTarefas() {
    let [usuarios, setUsuarios] = useState([]);
    let [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => setUsuarios(users));
    }, []);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(todos => setTarefas(todos));
    }, []);

    function escreveTarefa(tarefa, filtrarPendentes, key){
        if (filtrarPendentes && !tarefa.completed) {
            return;
        }
        let usuario = usuarios.find(user => user.id === tarefa.userId);
        if (!usuario) {
            usuario = {"name": "Usuário desconhecido"};
        }
        return <Tarefa user={usuario} titulo={tarefa.title} key={key}/>
    }

    return (
        <div className="lista-de-tarefas">
            <div id="tarefas-completas">
                {tarefas.map((tarefa, key) => escreveTarefa(tarefa, true, key))}
            </div>

            <div id="tarefas-pendentes">
                {tarefas.map((tarefa, key) => escreveTarefa(tarefa, false, key))}
            </div>
        </div>
    )
}

export default ListaDeTarefas