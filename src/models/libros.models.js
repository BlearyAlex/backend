import mongoose from "mongoose";

const LibroSchema = mongoose.Schema({
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    autor: {
        type: String,
        require: true,
        trim: true
    },
    editorial: {
        type: String,
        require: true,
        trim: true
    },
    edicion: {
        type: String,
        require: true,
        trim: true
    },
    categoria: {
        type: String,
        require: true,
        trim: true
    },
}, {
    timestamps: true
});

export default mongoose.model('Libro', LibroSchema);