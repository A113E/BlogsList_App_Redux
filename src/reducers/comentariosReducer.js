import { createSlice } from '@reduxjs/toolkit';

// Slice para manejar las acciones de los comentarios
const comentarioSlice = createSlice({
    name: 'comentarios',
    initialState: {},
    reducers: {
        // Acción para reemplazar el array de comentarios
        setComentarios(state, action) {
            const { blogId, comentarios } = action.payload
            state[blogId] = comentarios
        },
        // Acción para añadir un objeto de un comentario
        appendComentario(state, action) {
            const { blogId, comentario } = action.payload
            if (!state[blogId]) state[blogId] = []
            state[blogId].push(comentario)
        },
        // Accion para dar like a un objeto de un comentario
        comentarioLike(state, action) {
            const { blogId, id, comentarioActualizado } = action.payload
            if (state[blogId]) {
                state[blogId] = state[blogId].map(c =>
                    c.id === id ? comentarioActualizado : c
                )
            }
        },
        // Acción para eliminar un objeto de un comentario
        eliminarComentario(state, action) {
            const { blogId, id } = action.payload
            if (state[blogId]) {
                state[blogId] = state[blogId].filter(c => c.id !== id)
            }
        }
    }
})

export const { setComentarios, appendComentario, comentarioLike, eliminarComentario } = comentarioSlice.actions
export default comentarioSlice.reducer