import UserStudent from "../models/userStudent.models.js";

//Funcion para obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {

        const usersStudent = await UserStudent.find(); //Busca todos los usuarios en la base de datos y los guarda en la variable users
        if (!usersStudent.length === 0) {
            return res.status(404).json({ message: ["No hay usuarios"] }); //Si no hay usuarios retorna un mensaje de error
        }
        res.status(200).json(usersStudent); //Retorna los usuarios en formato json

    } catch (error) {
        res.status(400).json({ message: ["Error al obtener los usuarios"] }); //Si hay un error retorna un mensaje de error
    }


};

// Funcion para crear un usuario
export const createUser = async (req, res) => {

    try {
        const { name, carrera, numeroControl, telefono } = req.body;//Obtiene los datos del usuario a crear
        const newUser = new UserStudent({
            name,
            carrera,
            numeroControl,
            telefono,
            user: req.user.id
        }); //Crea un nuevo usuario con los datos obtenidos
        const savedUser = await newUser.save(); //Guarda el usuario en la base de datos
        res.json(savedUser); //Retorna el usuario guardado en formato json

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ["Error al crear un usuario"] }); //Si hay un error retorna un mensaje de error
    }
}


// Funcion para obtener un usuario
export const getUser = async (req, res) => {
    const { id } = req.params; //Obtiene el id del usuario a buscar

    try {
        const user = await UserStudent.findById(id); //Busca el usuario por id
        if (!user) {
            //Si no encuentra el usuario retorna un mensaje de error
            return res.status(400).json({ message: ["Usuario no encontrado"] });
        }
        res.status(200).json(user); //Retorna el usuario en formato json
    } catch (error) {
        res.status(400).json({ message: ["Error al obtener el usuario"] }); //Si hay un error retorna un mensaje de error
    }
}

// Funcion para editar un usuario
export const updateUser = async (req, res) => {
    try {
        const userStudent = await UserStudent.findByIdAndUpdate(req.params.id, req.body);
        if (!userStudent)
            return res.status(404).json({ message: ['Usuario no encontrado'] });
        res.json(userStudent);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: ['Error al actualizar el producto'] });
    }
};

// Funcion para eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const user = await UserStudent.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: ['Producto no encontrado'] });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ['Error al eliminar el producto'] });
    }
};
