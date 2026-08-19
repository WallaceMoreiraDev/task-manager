import { useOutletContext } from "react-router-dom"
import useTask from "../hooks/useTask";
import Feedback from "../../../components/Feedback";
import Modal from "../../../components/Modal";
import { useEffect, useState } from "react";
import EditTaskForm from "../components/EditTaskForm";
import useFilter from "../hooks/useFilter";

export function Tarefas() {
    const { tasks, isLoading, feedback, deleteTask, changeStatus, editTask } = useTask();
    const { filterTitle, setFilterTitle, filterDate, setFilterDate, filterStatus, setFilterStatus, filterSort } = useFilter();

    const [editingTaskId, setEditingTaskId] = useState(null);

    const filteredTasks = filterSort(tasks);

    // Helper feita pela IA na estilização do badge da tarefa
    const getPriorityClass = (priority) => {
        const p = priority?.toLowerCase() || '';
        if (p.includes('alta')) return 'badge-alta';
        if (p.includes('média') || p.includes('media')) return 'badge-media';
        return 'badge-baixa'; // padrão ou baixa
    };

    return (
        <div className="container-tarefas">
            <h1>Lista das suas Tarefas</h1>
            <p>Gerencie, edite e acompanhe o andamento de cada atividade abaixo.</p>

            <div className="container-filtros">
                <input className="input-filtro" type="text" placeholder="Buscar por título..." onChange={(e) => { setFilterTitle(e.target.value) }} />
                <input className="input-filtro" type="date" onChange={(e) => { setFilterDate(e.target.value) }} />
                <select className="select-filtro" onChange={(e) => { setFilterStatus(e.target.value) }}>
                    <option value="">Todos os status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluida">Concluída</option>
                </select>
            </div>

            {feedback.info !== '' ? (<Feedback feedback={feedback} />) : null}

            <div className="div-lista-tarefas">
                {feedback === 'error' ? (<p>{feedback.message}</p>) : isLoading ? (<p>Carregando...</p>) : filteredTasks.length > 0 ? filteredTasks.map(task => (
                    <div key={task.id} className="div-tarefa">
                        <div className="tarefa-header">
                            <h3 className="tarefa-title">{task.title}</h3>
                            <span className={`tarefa-badge ${getPriorityClass(task.priority)}`}>
                                {task.priority || "Baixa"}
                            </span>
                        </div>

                        {console.log(task.status)}

                        <p className="tarefa-desc">{task.desc}</p>

                        <div className="tarefa-status-wrapper">
                            <label className="tarefa-status-label">Status:</label>
                            {/* Este select é apenas visual por enquanto. Você pode adicionar um onChange depois! */}
                            <select className="tarefa-status-select" defaultValue={task.status} onChange={(e) => { changeStatus({ newStatus: e.target.value, taskId: task.id }) }}>
                                <option value="Pendente">Pendente</option>
                                <option value="Em andamento">Em Andamento</option>
                                <option value="Concluida">Concluída</option>
                            </select>
                        </div>

                        <div className="tarefa-footer">
                            <div className="tarefa-date">
                                {/* Um ícone de calendário simples (SVG) para ficar charmoso */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {task.date ? new Date(task.date).toLocaleDateString('pt-BR') : 'Sem data'}
                            </div>

                            <div className="tarefa-actions">
                                {/* Botão de Editar (Visual) */}
                                <button className="btn-icon edit" title="Editar tarefa" onClick={() => { setEditingTaskId(task.id) }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>

                                <Modal modalIsOpen={editingTaskId === task.id} closeModal={() => { setEditingTaskId(null) }}>
                                    <EditTaskForm initialTitle={task.title} initialDesc={task.desc} initialDate={task.date} initialPriority={task.priority} id={task.id} status={task.status} setEditingTaskId={setEditingTaskId} editTask={editTask} />
                                </Modal>

                                {/* Botão de Excluir */}
                                <button className="btn-icon delete" title="Excluir tarefa" onClick={() => { deleteTask(task.id) }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )) : 'Nenhuma tarefa encontrada com os filtros atuais!'}
            </div>
        </div>
    )
}