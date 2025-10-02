import { createSlice } from "@reduxjs/toolkit"

const estadoInicial = {
    valor: '',
    tipo: 'TITULO' // Por defecto busca titulos
}

// Slice para manejar la busqueda de blogs
const busquedaSlice = createSlice({
    name: 'busqueda',
    initialState: estadoInicial,
    reducers: {
        // Acción para buscar un blog
        buscarBlog(state, action) {
            state.valor = action.payload
        },
        // Acción para buscar un blog por categoria
        buscarPor(state, action) {
            state.tipo = action.payload
        }
    }
})


export const { buscarBlog, buscarPor } = busquedaSlice.actions
export default busquedaSlice.reducer