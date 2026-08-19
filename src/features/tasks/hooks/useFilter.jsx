import { useState } from "react"

export default function useFilter() {
    const [filterTitle, setFilterTitle] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');


    //Ao colocar essa função de filtro e ordenação aqui no hook eu garanto que não o componente Tarefas.jsx não fique poluído com lógica complexa (seguindo SPR), além de manter o projeto organizado.

    const weightStatus = {
        "Pendente": 3,
        "Em andamento": 2,
        "Concluida": 1,
    };



    function filterSort(tasks) {

        const filteredTasks = tasks.filter(task => {

            console.log("Veja aqui o objeto com valor do objeto de fato e o valor vindo no filtro", { valorLista: task.title, valorFiltro: filterTitle });

            const resTitle = task.title.toLowerCase().includes(filterTitle.toLowerCase()) || filterTitle.trim() === '';

            const resDate = task.date.toLowerCase().includes(filterDate.toLowerCase()) || filterDate.trim() === '';

            const resStatus = task.status.toLowerCase().includes(filterStatus.toLowerCase()) || filterStatus.trim() === '';

            return (resTitle && resDate && resStatus);
        }).sort((a, b) => { //Aqui foi tomada uma decisão de UX, aonde eu decidi que seria melhor uma ordenação por status (em breve talvez possa ter uma separação explícita pra cada status visualmente, mas por agora é isso).

            console.log("Objeto 'a' vindo ordenação status: ", a)
            console.log("Objeto 'b' vindo ordenação status: ", b)

            //Usei colchetes para sinalizar que quero acessar com base na variável a.status e não literalmente uma chave 'a' e depois uma chave 'status' (um outro aprendizado básico).
            const weightStatusA = weightStatus[a.status];
            const weightStatusB = weightStatus[b.status];

            return weightStatusA - weightStatusB;
        });

        return filteredTasks;

    }

    return { filterTitle, setFilterTitle, filterDate, setFilterDate, filterStatus, setFilterStatus, filterSort };
}
