import { blogsInciales } from '../../actions/blogActions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogsLista = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const { valor, tipo } = useSelector(state => state.busqueda)

    // Hook para cargar los blogs desde el backend
    useEffect(() => {
      dispatch(blogsInciales())
    }, [dispatch])

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
           <div className='blog-lista'>
            {blogsOrdenados.map(blog => (  
              <div key={blog.id} className="blog-resumen">
                <h3>
                  <Link to={`/blogs/${blog.id}`}>{blog.titulo}</Link>
                </h3>
                <p>{blog.autor}</p>
              </div>
            ))}
           </div>
        </div>
    )
}

export default BlogsLista

