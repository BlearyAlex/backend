import { Router } from "express";
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controllers.js';
import { authRequired } from "../middlewares/validate.Token.js";

//Importamos el validatorSchema
import { validateSchema } from "../middlewares/validator.middleware.js";
//Importamos los esquemas de validacion
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.get('/verify', verifyToken);

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);


export default router;