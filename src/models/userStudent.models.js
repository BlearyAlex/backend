import mongoose from "mongoose";

const userStudentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    carrera: {
        type: String,
        require: true,
        trim: true
    },
    numeroControl: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
});

export default mongoose.model('UserStudent', userStudentSchema);