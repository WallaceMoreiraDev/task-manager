import { useOutletContext } from "react-router-dom";
import { CreateTaskForm } from '../components/CreateTaskForm';
import useTask from "../hooks/useTask";

export function CriarTarefa() {
  const { setTasks } = useTask();
  
  return (
    <div className="container-criar-tarefa">
      <h1>Criar tarefas</h1>
      <CreateTaskForm setTasks={setTasks} />
    </div>
  );
}

export default CriarTarefa;
