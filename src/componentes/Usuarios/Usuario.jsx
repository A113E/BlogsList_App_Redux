import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { usuariosIniciales } from '../../actions/usuarioActions'
import { mostrarMensaje } from '../../actions/notificacionAction'
import BlogsUsuario from '../Blogs/BlogsUsuario'

const Usuario = () => {
    const usuarios = useSelector(state => state.usuarios)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    // Cargar los usuarios si no están cargados
    useEffect(() => {
       if (usuarios.length === 0) {
        dispatch(usuariosIniciales())
       } 
    }, [dispatch, usuarios.length])

    // Hook para obtener el usuario
    const usuario = usuarios.find(u => u.id === id)

    // Si el usuario no se encuentra mostrar mensaje o redireccionar
    useEffect(() => {
        if (usuarios.length > 0 && !usuario) {
            dispatch(mostrarMensaje({
                mensaje: '❌ Blog no encontrado',
                tipo: 'error'
            }))
            navigate('/usuarios')
        }
    }, [usuario, usuario.length, dispatch, navigate])


    // Si el usuario no está cargado
    if (!usuario) {
        return (
            <div className='usuario'>
                <p>Cargando usuario...</p>
            </div>
        )
    }

    return (
        <div className='usuario'>
            <div className='usuario-nombre'>
                <h2> Usuario: </h2> {usuario.nombre_usuario}
            </div>
            <div className='nombre'>
                <h3> Nombre:  </h3> {usuario.nombre}
            </div>
            <div className='lista-b'>
                <h2> Blogs Creados: </h2>
                <BlogsUsuario usuario={usuario} />
            </div>
        </div>
    )
}

export default Usuario