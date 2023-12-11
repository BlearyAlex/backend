import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser, createUser } from '../controllers/usersStudent.controllers.js';
import { authRequired } from '../middlewares/validate.Token.js';
import { userSchema } from '../schemas/userStudent.schemas.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

//Agrear un usuario
router.post('/users', validateSchema(userSchema), authRequired, createUser);

//Obtener todos los usuarios
router.get('/users', authRequired, getUsers);

//Obtener un usuario por id
router.get('/users/:id', authRequired, getUser);

//Actualizar un usuario
router.patch('/users/:id', authRequired, updateUser);

//Eliminar un usuario
router.delete('/users/:id', authRequired, deleteUser);

export default router;