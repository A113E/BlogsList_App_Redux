import { setNotificacion } from '../reducers/notificacionReducer';

// Thunk action para mostrar mensaje y tipo
export const mostrarMensaje = ({ mensaje, tipo }) => {
    return dispatch => {
        // Mostrar mensaje
        dispatch(setNotificacion({ mensaje, tipo }))

        setTimeout(() => {
            dispatch(setNotificacion({ mensaje: null, tipo: '' }))
        }, 5000)
      }
}