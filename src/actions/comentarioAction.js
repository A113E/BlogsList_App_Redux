import {
  appendComentario,
  setComentarios,
  comentarioLike,
  eliminarComentario,
} from '../reducers/comentariosReducer';
import {
  obtenerComentarios,
  crear,
  like,
  eliminar,
} from '../servicios/comentarios';

// Thunk action para cargar los comentarios
export const comentariosIniciales = (blogId) => {
  return async (dispatch) => {
    const comentarios = await obtenerComentarios(blogId);
    dispatch(setComentarios({ blogId, comentarios }));
  };
};

// Thunk action para crear un comentario
export const crearComentario = (blogId, comentarioObjeto) => {
  return async (dispatch) => {
    const nuevoComentario = await crear(blogId, comentarioObjeto);
    dispatch(appendComentario({ blogId, comentario: nuevoComentario }));
  };
};

// Thunk action para dar like a un comentario
export const likeComentario = (blogId, id) => {
  return async (dispatch) => {
    const comentarioActualizado = await like(id);

    dispatch(comentarioLike({ blogId, id, comentarioActualizado }));
  };
};

// Thunk action para eliminar un comentario
export const comentarioEliminar = (blogId, id) => {
  return async (dispatch) => {
    await eliminar(id);

    dispatch(eliminarComentario({ blogId, id }));
  };
};
