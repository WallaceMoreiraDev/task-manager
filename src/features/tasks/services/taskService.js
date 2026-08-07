

//Aqui nesse service estou utilizando o método exception propagation no tratamento de erros, para que eu possa lidar com textos apenas no hook, ao invés de deixar eles no service!

//TODO alterar toda função que possui o método antigo de erro (agora estamos usando exception propagation).

export async function getAllTasks() {


    try {


        const res = await fetch('http://localhost:3001/tasks');

        if (!res.ok) throw new Error();

        setTimeout(() => {
        }, 2000)

        const tasks = await res.json();

        return { success: true, message: 'Tarefas carregadas com sucesso!', tasks: tasks };


    } catch (error) {
        return { success: false, message: 'Algo deu errado no carregamento do servidor! Tente novamente mais tarde!' };
    }



}

export async function createTask(newTask) {

    // Contrato: {success, message, ?task}

    try {
        const res = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask),
        });

        if (!res.ok) throw new Error();

        const task = await res.json();

        return { success: true, message: "Tarefa criada com sucesso!", task: task };
    } catch (error) {
        return { success: false, message: 'Algo deu errado no servidor! Tente novamente mais tarde.' };
    }

}

export async function deleteTask(taskId) {

    try {
        const res = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error();

        return { success: true, message: 'Tarefa deletada com sucesso!' };

    } catch (error) {
        return { success: false, message: 'Erro ao deletar tarefa!' };
    }

}

export async function changeStatus({ newStatus, taskId }) {


    try {

        const res = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: newStatus,
            })
        });

        if (!res.ok) throw new Error('Erro na API');

        return await res.json();

    } catch (error) {
        console.error('Log da infraestrutura: ', error);
        throw error;
    }


}

export async function editTask(dataTask) {

    try {
        const res = await fetch(`http://localhost:3001/tasks/${dataTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataTask),
        });

        if (!res.ok) {
            throw new Error('Erro com a API');
        }

        return await res.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }


}