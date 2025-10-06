import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { blogsInciales, likeBlog, blogEliminado } from '../../actions/blogActions';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { comentariosIniciales } from '../../actions/comentarioAction';

import TogglableComentarios from '../Otros/TogglableComentarios';
import ComentarioLista from '../Comentarios/ComentarioLista';
import ComentarioForm from '../Comentarios/ComentarioForm';
import TogglableFormularios from '../Otros/TogglableFormularios';
import { useParams, useNavigate } from 'react-router-dom';

const Blog = ({ handleComentarioLike, handleEliminarComentario }) => {
    const dispatch = useDispatch() // Para cambiar el estado con las acciones
    const navigate = useNavigate() // Para redireccionar
    const usuario = useSelector(state => state.usuario)
    const blogs = useSelector(state => state.blogs)
    const { id } = useParams()

    // Cargar blogs si no están cargados
    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(blogsInciales())
        }
    }, [dispatch, blogs.length])

    // Hook para obtener el blog
    const blog = blogs.find(b => b.id === id)

    const comentariosCantidad = useSelector(state => {
        if (!blog) return 0
        const lista = state.comentarios[blog.id]
        return lista ? lista.length : 0
    })

    // Si el blog no se encuentra, mostrar mensaje o redireccionar
    useEffect(() => {
        if (blogs.length > 0 && !blog) {
            // Blog no encontrado después de cargar los blogs
            dispatch(mostrarMensaje({
                mensaje: '❌ Blog no encontrado',
                tipo: 'error'
            }))
            navigate('/blogs') // Redireccionar a la lista de blogs
        }
    }, [blog, blogs.length, dispatch, navigate])

    // Cargar comentarios solo cuando el blog esté disponible
    useEffect(() => {
        if (blog && blog.id) {
            dispatch(comentariosIniciales(blog.id))
        }
    }, [dispatch, blog?.id]) // Usar optional chaining 

    // Si el blog no está cargado, mostrar loading o null
    if (!blog) {
        return (
            <div className='blog'>
                <p>Cargando blog...</p>
            </div>
        )
    }
 
    // Función para dar like a un blog
    const handleLikeBlog = async (id) => {
    try { 
       await dispatch(likeBlog(id))
       dispatch(mostrarMensaje({
        mensaje: 'Like agregado correctamente ✅',
        tipo: 'exito'
       }))
     } catch (error) {
        console.error('Error al dar like al blog', error)
        dispatch(mostrarMensaje({
            mensaje: '❌ Error al dar like',
            tipo: 'error'
        }))
        throw error // Relanza para que el componente capture el error
     }
    }

    // Función para eliminar un blog 
    const handleEliminarBlog = async (id) => {
        try {  
        if(window.confirm(`¿Está seguro que desea eliminar el blog: "${blog.titulo}"?`)) {
            await dispatch(blogEliminado(id))
            dispatch(mostrarMensaje({
             mensaje: 'Blog Eliminado correctamente ✅',
             tipo: 'exito'
            }))
        }
      } catch (error) {
        console.error('Error al eliminar blog', error)
        dispatch(mostrarMensaje({
            mensaje: '❌ Error al eliminar blog',
            tipo: 'error'
        }))
      }
    }

    // Función para determinar quien creo el blog
    const creadorBlog = blog.usuario ? blog.usuario.nombre_usuario : 'Anónimo'
    
    // Función para mostrar el boton eliminar solo al usuario que lo creó
    const puedeEliminarBlog = blog.usuario && usuario && blog.usuario._id === usuario.id

    return (
        <div className='blog'>
            <div className='blog-encabezado'>
            <h3> {blog.titulo} </h3>
            <h4> { blog.autor } </h4>
            </div>
            <div className='blog-detalles'>
            <strong> <a href={blog.url}> Visitar Blog </a> </strong>  
            <p> { blog.likes } likes </p>
            </div>
            <div> { creadorBlog } </div>
            <div className='blog-btns'>
            <button onClick={() => handleLikeBlog(blog.id)}>Like</button>
            <div>
            {puedeEliminarBlog && (
                 <button onClick={() => handleEliminarBlog(blog.id)}>Eliminar</button>
            )}
            </div>
            </div>
            <p> { comentariosCantidad } comentarios </p>
            <div className='comentarios-lista'>
                <TogglableFormularios blogId={blog.id} buttonLabel="Comentar">
                  <ComentarioForm blogId={blog.id} />
                </TogglableFormularios>

                <TogglableComentarios blogId={blog.id} buttonLabel="Ver comentarios">
                  <ComentarioLista
                    blogId={blog.id}
                    usuario={blog.usuario}
                    handleComentarioLike={handleComentarioLike}
                    handleEliminarComentario={handleEliminarComentario}
                  />
                </TogglableComentarios>
            </div>
        </div>
    )
}

export default Blog