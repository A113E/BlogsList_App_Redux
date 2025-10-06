import { useDispatch, useSelector } from 'react-redux';
import { crearBlog, blogActualizado } from '../../actions/blogActions';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { useCampo } from '../../hooks/useCampo';

const BlogForm = () => {
    const dispatch = useDispatch() // Cambiar el estado con las acciones
    const blogs = useSelector(state => state.blogs) // Llama a la lista de blogs

    // Campos del formulario
    const titulo = useCampo('text')
    const autor = useCampo('text')
    const url = useCampo('text')

    // Instancia para limpiar el formulario
    const limpiarFormulario = () => {
      titulo.limpiar()
      autor.limpiar()
      url.limpiar()
    }

    // Función para añadir un nuevo blog
    const añadirBlog = async (e) => {
    e.preventDefault()
    const blogObjeto = {
      titulo: titulo.value,
      autor: autor.value,
      url: url.value
    }

    try {  
    // Verificar si existe un blog con ese titulo
    const blogExistente = blogs.find(blog => blog.titulo === blogObjeto.titulo)

    if (blogExistente) {
      const confirmar = window.confirm(`Ya existe un blog con ese título: "${blogObjeto.titulo}" ¿Desea reemplazarlo?`)
      if (confirmar) {
        await dispatch(blogActualizado({ ...blogObjeto, id: blogExistente.id }))
        dispatch(mostrarMensaje({
          mensaje: 'Blog actualizado correctamente ✅',
          tipo: 'exito'
        }))
      }
    } else { 
        dispatch(crearBlog(blogObjeto))
        dispatch(mostrarMensaje({
          mensaje: 'Blog agregado correctamente ✅',
          tipo: 'exito'
        }))
    }

    limpiarFormulario() // Reset formulario

      } catch (error) {
        console.error('Error al añadir el blog', error)
        dispatch(mostrarMensaje({
          mensaje: '❌ Error al añadir el blog',
          tipo: 'error'
        }))
        throw error // Relanza para que el componente capture el error
      }
    }

    return (
        <div className='formDiv'>
            <h2>Añadir Blog</h2>
            <form onSubmit={añadirBlog}>
        <div>
          Titulo:
          <input {...titulo.inputProps} id='titulo-input'/>
        </div>
        <div>
          Autor:
          <input {...autor.inputProps} id='autor-input'/>
        </div>
        <div>
          URL:
          <input {...url.inputProps} id='url-input'/>
        </div>
        <button type='submit'> Añadir </button>
      </form>
        </div>
    )
}

export default BlogForm