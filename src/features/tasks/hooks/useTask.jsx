import { useEffect, useState } from "react";
import * as taskService from '../services/taskService';
import { taskSchema } from "../config/taskFormConfig";

export default function useTask(initialTasks = [], initialIsLoading = false) {
    const [isLoading, setIsLoading] = useState(initialIsLoading);
    const [tasks, setTasks] = useState(initialTasks);

    const [feedback, setFeedback] = useState({ info: '', message: '' });


    useEffect(() => {

        async function getAlltasks() {

            //? Contrato: {success, message, ?tasks}

            setIsLoading(true);

            const res = await taskService.getAllTasks();

            if (!res.success) {
                setFeedback({ info: 'error', message: res.message });
            }

            setTasks(res.tasks);
            setIsLoading(false);
        }

        getAlltasks();

    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFeedback({ info: '', message: '' });
        }, 3000);

        return () => { clearTimeout(timer) };
    }, [feedback.info]);

    async function criarTarefa({ setTasks, dataForm }) {

        setIsLoading(true);

        const newTask = {
            title: dataForm.title,
            desc: dataForm.desc,
            date: dataForm.date,
            priority: dataForm.priority,
            status: dataForm.status,
        }

        const schema = taskSchema.safeParse(newTask);

        if (!schema.success) {
            return setFeedback({ info: 'error', message: schema.error.issues[0].message });
        }

        const res = await taskService.createTask(newTask);

        if (!res.success) setFeedback({ info: 'error', message: res.message });

        setIsLoading(false);
        setTasks((prev) => [...prev, res.task]);
        setFeedback({ info: 'success', message: res.message });
    }

    async function deleteTask(taskId) {

        //Como não é um formulário, não precisamos de schema para verificar! 
        //Nesse caso, só precisamos repassar a chamada para o service passando o id da task e gerenciar estados após isso.

        const res = await taskService.deleteTask(taskId);

        if (!res.success) { setFeedback({ info: 'error', message: res.message || "Algo deu errado em excluir" }) };

        //Aqui vamos tirar aquela tarefa da lista das nossas tarefas

        setTasks(prev => prev.filter(task => task.id !== taskId));
        setFeedback({ info: 'success', message: res.message || 'Tarefa deletada com sucesso!' });

    }

    async function changeStatus({ newStatus, taskId }) {

        try {

            const res = await taskService.changeStatus({ newStatus, taskId });

            setTasks(prev => prev.map(task => task.id === taskId ? res : task));
            setFeedback({ info: 'success', message: 'Status de tarefa alterado com sucesso!' });

        } catch (error) {
            setFeedback({ info: 'error', message: 'Erro no servidor ao mudar status de tarefa!' });
        }

    }

    async function editTask(dataTask) {

        //Recebo 'dataTask' sem desestruturar, pra garantir que fique enxuto e eu consiga repassar essa variável para o service de forma limpa.
        try {
            const schema = taskSchema.safeParse(dataTask);

            if (!schema.success) {
                setFeedback({ info: 'error', message: schema.error.issues[0].message });
            }

            const editedTask = await taskService.editTask(dataTask);

            setFeedback({ info: 'success', message: 'Tarefa editada com sucesso!' });

            //Forma mais eficiente para substituir localmente a mesma tarefa que foi substituida pelo service, utilizando ao máximo comparações enxutas e eficientes!
            setTasks(prev => prev.map(task => task.id === dataTask.id ? task = editedTask : task));

        } catch (error) {
            console.log("error chegando: ", error);

            setFeedback({ info: 'error', message: 'Algo deu errado no servidor! Tente novamente mais tarde' });
        }



    }


    return { tasks, setTasks, isLoading, feedback, setFeedback, criarTarefa, deleteTask, changeStatus, editTask };
}
