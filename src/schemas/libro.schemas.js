import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string({
        required_error: 'Titulo del libro requerido'
    }),
    autor: z.string({
        required_error: 'Autor del libro requerido'
    }),
    editorial: z.string({
        required_error: 'Editorial del libro requerido'
    }),
    edicion: z.string({
        required_error: 'Edicion del libro requerido'
    }),
    categoria: z.string({
        required_error: 'Categoria del libro requerido'
    }),
}); //Fin del libroSchema