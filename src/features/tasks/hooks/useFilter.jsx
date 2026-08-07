import { useState } from "react"

export default function useFilter() {
    const [filterTitle, setFilterTitle] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');


    //Ao colocar essa função de filtro e ordenação aqui no hook eu garanto que não o componente Tarefas.jsx não fique poluído com lógica complexa, além de manter o projeto organizado.
    function filterSort(tasks) {

        const filteredTasks = tasks.filter(task => {

            console.log("Veja aqui o objeto com valor do objeto de fato e o valor vindo no filtro", { valorLista: task.title, valorFiltro: filterTitle });

            const resTitle = task.title.toLowerCase().includes(filterTitle.toLowerCase()) || filterTitle.trim() === '';

            const resDate = task.date.toLowerCase().includes(filterDate.toLowerCase()) || filterDate.trim() === '';

            const resStatus = task.status.toLowerCase().includes(filterStatus.toLowerCase()) || filterStatus.trim() === '';

            return (resTitle && resDate && resStatus);
        }).sort((a, b) => a.title.localeCompare(b.title));

        return filteredTasks;

    }

    return { filterTitle, setFilterTitle, filterDate, setFilterDate, filterStatus, setFilterStatus, filterSort };
}
