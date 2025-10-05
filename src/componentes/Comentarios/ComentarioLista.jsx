import Comentario from './Comentario';
import { comentariosIniciales } from '../../actions/comentarioAction';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ComentarioLista = ({ blogId, usuario, handleComentarioLike, handleEliminarComentario }) => {
    const dispatch = useDispatch()
    const comentarios = useSelector(state => state.comentarios[blogId]) || []

    useEffect(() => {
    if (blogId) {
      dispatch(comentariosIniciales(blogId))
    }
    }, [blogId, dispatch])

    // Ordenar los comentarios por likes
    const comentariosOrdenados = [...comentarios].sort((a,b) => b.likes - a.likes)

    return (
        <div>
           <ul>
            {comentariosOrdenados.map((comentario) => (
                <li key={comentario.id}>
                    <Comentario
                    comentario={comentario}
                    blogId={blogId}
                    handleComentarioLike={handleComentarioLike}
                    handleEliminarComentario={handleEliminarComentario}
                    usuario={usuario}
                    />
                </li>
            ))}
           </ul>
        </div>
    )
}

export default ComentarioLista