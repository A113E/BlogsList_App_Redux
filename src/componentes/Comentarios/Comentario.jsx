import { useDispatch, useSelector } from 'react-redux';
import { mostrarMensaje } from '../../actions/notificacionAction';
import {
  likeComentario,
  comentarioEliminar,
} from '../../actions/comentarioAction';

const Comentario = ({ comentario, blogId }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);

  // Función para determinar quien creó el comentario
  const comentarioCreador = comentario.usuario
    ? comentario.usuario.nombre_usuario
    : 'Anónimo';

  // Función para mostrar el botón de eliminar solo al creador del comentario
  const puedeEliminarComentario =
    comentario.usuario && usuario && comentario.usuario._id === usuario.id;

  // Funcion para manejar el like de un comentario
  const handleComentarioLike = async (id) => {
    try {
      await dispatch(likeComentario(blogId, comentario.id));
      dispatch(
        mostrarMensaje({
          mensaje: 'Like agregado correctamente al comentario ✅',
          tipo: 'exito',
        })
      );
    } catch (error) {
      console.error('Error al dar like al comentario', error);
      dispatch(
        mostrarMensaje({
          mensaje: '❌ Error al dar like',
          tipo: 'error',
        })
      );
      throw error; // Relanza para que el componente capture el error
    }
  };

  // Función para manejar la eliminación de un comentario
  const handleEliminarComentario = async (id) => {
    try {
      await dispatch(comentarioEliminar(blogId, comentario.id));
      dispatch(
        mostrarMensaje({
          mensaje: 'Comentario eliminado ✅',
          tipo: 'exito',
        })
      );
    } catch (error) {
      console.error('Error al eliminar comentario', error);
      dispatch(
        mostrarMensaje({
          mensaje: '❌ Error al eliminar comentario',
          tipo: 'error',
        })
      );
      throw error;
    }
  };

  return (
    <div className="comentario">
      <div>
        <h3> {comentarioCreador} </h3>
        <p> {comentario.comentario} </p>
        <p> {comentario.likes} likes </p>
      </div>
      <div>
        <button onClick={() => handleComentarioLike(comentario.id)}>
          {' '}
          Like{' '}
        </button>
        <div>
          {puedeEliminarComentario && (
            <button onClick={() => handleEliminarComentario(comentario.id)}>
              {' '}
              Eliminar{' '}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comentario;
