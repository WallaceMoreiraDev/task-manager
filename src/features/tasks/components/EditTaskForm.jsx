import useTask from "../hooks/useTask"
import useForm from "../hooks/useForm";
import { useState } from "react"

export default function EditTaskForm({ initialTitle = '', initialDesc = '', initialDate = '', initialPriority = '', status = 'Pendente', id, setEditingTaskId, editTask } = {}) {

    const { title, setTitle, desc, setDesc, date, setDate, priority, setPriority } = useForm({ initialTitle, initialDesc, initialDate, initialPriority });
    const [isLoading, setIsLoading] = useState(false);

    async function isSubmitting() {

        setIsLoading(true);

        console.log("Objeto chegando EditTaskForm: ", { id, title, desc, date, priority, status })

        await editTask({ id, title, desc, date, priority, status });

        setIsLoading(false);
        setEditingTaskId(null);

    }

    return (
        <>
            <div className="modal-header">
                <h2>Editar Tarefa</h2>
                <p>Atualize as informações da sua tarefa.</p>
            </div>
            <div className="modal-form-campos">
                <div className="modal-campo">
                    <label>Título</label>
                    <input type="text" placeholder="Digite o título..." value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="modal-campo">
                    <label>Descrição</label>
                    <textarea rows="3" placeholder="Descreva a tarefa..." value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
                </div>
                <div className="modal-row">
                    <div className="modal-campo">
                        <label>Data</label>
                        <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    </div>
                    <div className="modal-campo">
                        <label>Prioridade</label>
                        <select value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                </div>
                <button className="btn-salvar" onClick={() => { isSubmitting() }} disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Alterações"}</button>
            </div>
        </>
    )
}
