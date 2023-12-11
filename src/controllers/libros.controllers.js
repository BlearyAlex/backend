import Libro from '../models/libros.models.js'

// Funcion para obtener todos los libros
export const getLibros = async (req, res) => {
    try {
        const libros = await Libro.find(); //Busca todos los libros en la base de datos y los guarda en la variable libros
        if (!libros.length === 0) {
            return res.status(404).json({ message: ["No hay libros"] }); //Si no hay libros retorna un mensaje de error
        }
        res.status(200).json(libros); //Retorna los libros en formato json

    } catch (error) {
        res.status(400).json({ message: ["Error al obtener los libros"] }); //Si hay un error retorna un mensaje de error
    }
};

// Funcion para crear un libro
export const createLibro = async (req, res) => {

    try {
        const { titulo, autor, editorial, edicion, categoria } = req.body;//Obtiene los datos del libro a crear
        const newLibro = new Libro({
            titulo,
            autor,
            editorial,
            edicion,
            categoria,
            user: req.user.id
        }); //Crea un nuevo libro con los datos obtenidos
        const savedLibro = await newLibro.save(); //Guarda el libro en la base de datos
        res.json(savedLibro); //Retorna el libro guardado en formato json
        console.log(savedLibro)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ["Error al crear un libro"] }); //Si hay un error retorna un mensaje de error
    }
}

// Funcion para obtener un libro
export const getLibro = async (req, res) => {
    const { id } = req.params; //Obtiene el id del libro a buscar

    try {
        const libro = await Libro.findById(id); //Busca el libro por id
        if (!libro) {
            //Si no encuentra el libro retorna un mensaje de error
            return res.status(400).json({ message: ["Libro no encontrado"] });
        }
        res.status(200).json(libro); //Retorna el libro en formato json
    } catch (error) {
        res.status(400).json({ message: ["Error al obtener el libro"] }); //Si hay un error retorna un mensaje de error
    }
}

// Funcion para editar un libro
export const updateLibro = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id, req.body); //Busca el libro por id
        if (!libro) {
            return res.status(404).json({ message: ["Libro no encontrado"] }); //Si no encuentra el libro retorna un mensaje de error
        }
        res.json(libro); //Retorna el libro en formato json
    } catch (error) {
        res.status(400).json({ message: ["Error al actualizar el libro"] }); //Si hay un error retorna un mensaje de error
    }
}

// Funcion para eliminar un libro
export const deleteLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id); //Busca el libro por id y lo elimina
        if (!libro) {
            return res.status(404).json({ message: ["Libro no encontrado"] }); //Si no encuentra el libro retorna un mensaje de error
        }
        res.status(200).json({ message: ["Libro eliminado"] }); //Retorna el libro en formato json
    } catch (error) {
        res.status(400).json({ message: ["Error al eliminar el libro"] }); //Si hay un error retorna un mensaje de error
    }
}

