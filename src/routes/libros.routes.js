import { Router } from 'express';
import { getLibros, getLibro, updateLibro, deleteLibro, createLibro } from '../controllers/libros.controllers.js';
import { authRequired } from '../middlewares/validate.Token.js';
import { libroSchema } from '../schemas/libro.schemas.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

//Crear un libro
router.post('/libros', validateSchema(libroSchema), authRequired, createLibro);

//Obtener todos los libros
router.get('/libros', authRequired, getLibros);

//Obtener un libro por id
router.get('/libros/:id', authRequired, getLibro);

//Actualizar un libro
router.patch('/libros/:id', authRequired, updateLibro);

//Eliminar un libro
router.delete('/libros/:id', authRequired, deleteLibro);

export default router;