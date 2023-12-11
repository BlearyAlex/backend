import { z } from 'zod';

export const userSchema = z.object({
    name: z.string({
        required_error: 'Nombre del alumno requerido'
    }),
    carrera: z.string({
        required_error: 'Carrera del alumno requerido'
    }),
    numeroControl: z.number({
        required_error: 'Numero de control debe ser un numero'
    }).optional(),
    telefono: z.number({
        required_error: 'Numero de telefono debe ser un numero'
    }).optional()
}); //Fin del userSchema