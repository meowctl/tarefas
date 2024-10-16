import "./Tarefa.css"

function Tarefa(props) {
    return (
        <p className="tarefa" onClick={() => props.statusChanger(props.tarefa)}>
            {props.user.name}: {props.tarefa.title}
        </p>
    )
}

export default Tarefa