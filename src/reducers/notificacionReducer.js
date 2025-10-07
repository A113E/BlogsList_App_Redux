import { createSlice } from '@reduxjs/toolkit';

const estadoInicial = {
  mensaje: null,
  tipo: '',
};

const notificacionSlice = createSlice({
  name: 'notificacion',
  initialState: estadoInicial,
  reducers: {
    // Acción para mostrar el mensaje
    setNotificacion(state, action) {
      return action.payload;
    },
  },
});

export const { setNotificacion } = notificacionSlice.actions;

export default notificacionSlice.reducer;
