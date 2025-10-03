const mongoose = require('mongoose')

// Esquema para la lista de comentarios
const comentarioSchema = new mongoose.Schema({
    comentario: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

// Configuración de los comentarios en formato en JSON
comentarioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        // Elimina los campos _id y __v originales
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Comentario', comentarioSchema)