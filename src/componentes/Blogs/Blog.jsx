import { useDispatch } from 'react-redux';
import { blogLike, eliminarBlog } from '../../actions/blogActions';

const Blog = ({ blog }) => {
    const dispatch = useDispatch() // Para cambiar el estado con las acciones

    // Función para dar like a un blog
    const handleLikeBlog = (id) => {
       dispatch(blogLike(id))
    }

    // Función para eliminar un blog 
    const handleEliminarBlog = (id) => {
        if(window.confirm(`¿Está seguro que desea eliminar el blog: "${blog.titulo}"?`)) {
            dispatch(eliminarBlog(id))
        }
    }

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
            <button onClick={() => handleLikeBlog(blog.id)}>Like</button>
            <button onClick={() => handleEliminarBlog(blog.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default Blog