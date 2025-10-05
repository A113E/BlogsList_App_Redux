import { setVisibilidadComentarios, setVisibilidadFormulario } from '../reducers/togglableReducer'

// Toggle lista de comentarios
export const cambiarVisibilidadComentarios = (blogId, visible) => {
  return dispatch => {
    dispatch(setVisibilidadComentarios({ blogId, visible }))
  }
}

// Toggle formulario de comentarios
export const cambiarVisibilidadFormulario = (blogId, visible) => {
  return dispatch => {
    dispatch(setVisibilidadFormulario({ blogId, visible }))
  }
}
