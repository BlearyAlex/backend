import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js';
//Importamos rutas para usuarios
import productRoutes from './routes/products.routes.js';
//Importamos rutas para usuarios
import userRoutes from './routes/usersStudent.routes.js';
//Importamos rutas para libros
import librosRoutes from './routes/libros.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173',
        'http://127.0.0.2:5173',
        'http://localhost',
        'http://localhost/productos',
        'http://localhost/users',
        'http://localhost/libros',
        'http://apiproductos-fs39.onrender.com',
        'http://frontend-h07.onrender.com',
    ],

    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Indicamos que el servisor utilice objetos authRoutes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', librosRoutes);
export default app;