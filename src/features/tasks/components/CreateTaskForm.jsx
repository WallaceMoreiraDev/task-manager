import { useState, useEffect } from "react";
import Feedback from "../../../components/Feedback";
import useForm from "../hooks/useForm";
import useTask from "../hooks/useTask";

export function CreateTaskForm({ setTasks }) {

    const { title, setTitle, desc, setDesc, date, setDate, priority, status, setStatus, setPriority } = useForm(); //Utilizando useForm(), que foi o hook que construi para não ficar tudo nesse componente
    const { criarTarefa, feedback, isLoading } = useTask();

    return (
        <div className="container-form">
            {
                feedback.info !== '' ? (<Feedback feedback={feedback} />) : null
            }

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    criarTarefa({ setTasks, dataForm: { title, desc, date, priority, status } });

                }}
                className="form-criar-tarefa"
            >
                <input type="text" id="titulo" name="titulo" placeholder="Digite o titulo da tarefa" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                <input type="text" id="desc" name="desc" placeholder="Digite a descrição da tarefa" value={desc} onChange={(e) => { setDesc(e.target.value) }} />

                <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />

                <label htmlFor="prioridade">Selecione a prioridade</label>
                <select name="" id="prioridade" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
                <label htmlFor="status">Selecione o status</label>
                <select name="status" id="status" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluida">Concluída</option>
                </select>
                <button disabled={isLoading}>{isLoading ? "Carregando..." : "Criar Tarefa"}</button>
            </form>
        </div>

    )
}