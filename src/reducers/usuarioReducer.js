// Reducer para manejar el array de usuarios
import { createSlice } from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: [],
    reducers: {
        // Acción para reemplazar el array de usuarios
        setUsuarios(state, action) {
            return action.payload
        }, 
        // Acción para añadir un objeto de un usuario
        appendUsuario(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setUsuarios, appendUsuario } = usuariosSlice.actions
export default usuariosSlice.reducer