import "./Tarefa.css"

function Tarefa(props){
    return (
        <p className="tarefa">{props.user.name}: {props.titulo}</p>
    )
}
export default Tarefa