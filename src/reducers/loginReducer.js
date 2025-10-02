// Reducer para manejar usuarios
import { createSlice } from '@reduxjs/toolkit';

// Slice para manejar las acciones de los usuarios
const loginSlice = createSlice({
    name: 'usuario',
    initialState: null,
    reducers: {
        // Acción para reemplazar el array de usuarios
        logUsuario(state, action) {
            return action.payload
        },
        // Accion para limpiar el usuario
        limpiarUsuario(state, action) {
            return null
        }
    }
})

export const { logUsuario, limpiarUsuario } = loginSlice.actions
export default loginSlice.reducer