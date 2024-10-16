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

    function statusChanger(incomingTask) {
        if (incomingTask.completed) return;

        setTarefas(
            tarefas.map((tarefa) => tarefa.id === incomingTask.id ? {...tarefa, completed: !tarefa.completed} : tarefa)
        );
    }

    function escreveTarefa(tarefa, filtrarPendentes){
        if (filtrarPendentes && !tarefa.completed || !filtrarPendentes && tarefa.completed) {
            return;
        }

        let usuario = usuarios.find(user => user.id === tarefa.userId);
        if (!usuario) {
            usuario = {"name": "Usuário desconhecido"};
        }
        return <Tarefa user={usuario} tarefa={tarefa} statusChanger={statusChanger} key={tarefa.id}/>
    }

    return (
        <div className="lista-de-tarefas">
            <div id="tarefas-completas">
                {tarefas.map((tarefa, key) => escreveTarefa(tarefa, true))}
            </div>

            <div id="tarefas-pendentes">
                {tarefas.map((tarefa, key) => escreveTarefa(tarefa, false))}
            </div>
        </div>
    )
}

export default ListaDeTarefas