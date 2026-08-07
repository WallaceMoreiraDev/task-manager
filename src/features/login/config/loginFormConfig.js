import { z } from "zod";

export const registerSchema = z.object({
    email: z.email('Digite os campos corretamente'),
    password: z.string().min(10, 'Senha menor do que a necessária para continuar!'),
});

export const loginSchema = z.object({
    email: z.email('Digite os campos corretamente'),
    password: z.string().min(10, 'Campos inválidos!'),
});

