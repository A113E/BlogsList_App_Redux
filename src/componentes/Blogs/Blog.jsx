import { useDispatch } from 'react-redux';
import { likeBlog, blogEliminado } from '../../actions/blogActions';
import { mostrarMensaje } from '../../actions/notificacionAction';

const Blog = ({ blog }) => {
    const dispatch = useDispatch() // Para cambiar el estado con las acciones
 
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
    const creadorBlog = blog.usuario ? blog.usuario.nombre : 'Anónimo'

    return (
        <div className='blog'>
            <div className='blog-encabezado'>
            <h3> {blog.titulo} </h3>
            <h4> { blog.autor } </h4>
            </div>
            <div className='blog-detalles'>
            <strong> <a href={blog.url}> Visitar Blog </a> </strong>  
            <div>
            <p> { blog.likes } likes </p>
            </div>
            <div> { creadorBlog } </div>
            <button onClick={() => handleLikeBlog(blog.id)}>Like</button>
            <button onClick={() => handleEliminarBlog(blog.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default Blog