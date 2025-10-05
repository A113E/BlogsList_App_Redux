import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle } from 'react';
import { cambiarVisibilidadComentarios } from '../../actions/togglableAction';

const TogglableComentarios = forwardRef(({ blogId, buttonLabel, children }, ref) => {
    const visibilidad = useSelector(state => state.visibilidad.comentarios[blogId]) || false
    const dispatch = useDispatch()

    // Función para manejar el cambio
    const togglableVisibilidad = () => {
        dispatch(cambiarVisibilidadComentarios(blogId, !visibilidad))
    }

    useImperativeHandle(ref, () => {
        return {
            togglableVisibilidad
        }
    })

    return (
        <div>
            {!visibilidad && (
                <button onClick={togglableVisibilidad}>
                    {buttonLabel}
                </button>
            )}
            {visibilidad && (
                <div className='mostrar-contenido'>
                    { children }
                    <button onClick={togglableVisibilidad}> Ocultar </button>
                    </div>
            )}
        </div>
    )
})

export default TogglableComentarios