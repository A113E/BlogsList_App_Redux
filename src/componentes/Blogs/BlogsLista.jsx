import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogsLista = ({ handlelikeBlog, handleEliminarBlog }) => {
    const blogs = useSelector(state => state.blogs)
    const { valor, tipo } = useSelector(state => state.busqueda)

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
                />
            ))}
        </div>
    )
}

export default BlogsLista

