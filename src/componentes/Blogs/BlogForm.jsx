import { useDispatch, useSelector } from 'react-redux';
import { crearBlog, actualizarBlog } from '../../actions/blogActions';

const BlogForm = () => {
    const dispatch = useDispatch() // Cambiar el estado con las acciones
    const blogs = useSelector(state => state.blogs) // Llama a la lista de blogs

    // Función para añadir un nuevo blog
    const añadirBlog = (e) => {
    e.preventDefault()
    const blogObjeto = {
      titulo: e.target.titulo.value,
      autor: e.target.autor.value,
      url: e.target.url.value
    }

    // Verificar si existe un blog con ese titulo
    const blogExistente = blogs.find(blog => blog.titulo === blogObjeto.titulo)

    if (blogExistente) {
      const confirmar = window.confirm(`Ya existe un blog con ese título: "${blogObjeto.titulo}" ¿Desea reemplazarlo?`)
      if (confirmar) {
        dispatch(actualizarBlog(blogObjeto))
      }
    } else { 
        dispatch(crearBlog(blogObjeto))
    }

    e.target.reset() // Reset formulario
    }

    return (
        <div className='formDiv'>
            <h2>Añadir Blog</h2>
            <form onSubmit={añadirBlog}>
        <div>
          Titulo:
          <input name='titulo' id='titulo-input'/>
        </div>
        <div>
          Autor:
          <input name='autor' id='autor-input'/>
        </div>
        <div>
          URL:
          <input name='url' id='url-input'/>
        </div>
        <button type='submit'> Añadir </button>
      </form>
        </div>
    )
}

export default BlogForm