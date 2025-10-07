import { createSlice } from '@reduxjs/toolkit';

const togglableSlice = createSlice({
  name: 'visibilidad',
  initialState: {
    comentarios: {}, // visibilidad lista de comentarios
    formularios: {}, // visibilidad formularios de comentarios
  },
  reducers: {
    // Accion para mostrar los comentarios
    setVisibilidadComentarios(state, action) {
      const { blogId, visible } = action.payload;
      state.comentarios[blogId] = visible;
    },
    // Accion para mostrar el formulario
    setVisibilidadFormulario(state, action) {
      const { blogId, visible } = action.payload;
      state.formularios[blogId] = visible;
    },
  },
});

export const { setVisibilidadComentarios, setVisibilidadFormulario } =
  togglableSlice.actions;
export default togglableSlice.reducer;
