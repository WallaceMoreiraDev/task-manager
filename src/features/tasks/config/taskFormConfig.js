import { z } from "zod";

//Estou lidando de forma rasa e simples com o schema do formulário da task, apenas para prática do zod, sem grandes validações!
export const taskSchema = z.object({
    title: z.string().max(30, 'O tamanho máximo de título são 30 caracteres!'),
    desc: z.string().max(200, 'Tamanho máximo de descrição é 200 caracteres!'),
    date: z.string(),
    priority: z.enum(['Baixa', 'Média', 'Alta'], 'Selecione uma prioridade válida!'),
    status: z.enum(['Pendente', 'Em andamento', 'Concluida'], 'Selecione um status válido!'),
});