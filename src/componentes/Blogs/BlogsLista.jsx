import Blog from './Blog';
import { blogsInciales } from '../../actions/blogActions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const BlogsLista = ({ usuario, handlelikeBlog, handleEliminarBlog }) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const { valor, tipo } = useSelector(state => state.busqueda)

    // Hook para cargar los blogs desde el backend
    useEffect(() => {
      dispatch(blogsInciales())
    }, [])

    // Filtrar y ordenar por cantidad de likes
    const blogsOrdenados = valor
    ? blogs
      .filter(blog => {
        if (tipo === 'TITULO') {
          return blog.titulo.toLowerCase().includes(valor.toLowerCase())
        }
        if (tipo === 'AUTOR') {
          return blog.autor.toLowerCase().includes(valor.toLowerCase())
        }
        return true
      })
      .sort((a, b) => b.likes - a.likes)
    : [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {blogsOrdenados.map((blog) => (
                <Blog
                key={blog.id}
                blog={blog}
                handlelikeBlog={handlelikeBlog}
                handleEliminarBlog={handleEliminarBlog}
                usuario={usuario}
                />
            ))}
        </div>
    )
}

export default BlogsLista

