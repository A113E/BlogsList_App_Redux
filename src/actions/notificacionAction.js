import { setNotificacion } from '../reducers/notificacionReducer';

// Thunk action para mostrar mensaje y tipo
export const mostrarMensaje = ({ mensaje, tipo }) => {
    return async dispatch => {
        // Mostrar mensaje
        dispatch(setNotificacion({ mensaje, tipo }))

        setTimeout(() => {
            setNotificacion({ mensaje: null, tipo: '' })
        }, 5000)
      }
}