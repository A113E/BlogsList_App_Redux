// Reducer para manejar el array de usuarios
import { createSlice } from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: [],
    reducers: {
        // Acción para reemplazar el array de usuarios
        setUsuarios(state, action) {
            return action.payload
        }
    }
})

export const { setUsuarios } = usuariosSlice.actions
export default usuariosSlice.reducer