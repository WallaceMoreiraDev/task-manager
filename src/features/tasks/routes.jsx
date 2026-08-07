import { CriarTarefa } from "./pages/CriarTarefa";
import { Tarefas } from "./pages/Tarefas";

export const taskRoutes = [
    {
        index: true,
        element: <Tarefas />,
    },
    {
        path: 'criar-tarefa',
        element: <CriarTarefa />
    }
];
;