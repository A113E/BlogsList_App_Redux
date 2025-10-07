import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { blogsInciales } from '../../actions/blogActions';
import { Link } from 'react-router-dom';

const BlogsUsuario = ({ usuario }) => {
  const dispatch = useDispatch();

  // Cargar los blogs solo cuando el usuario esté disponible
  useEffect(() => {
    if (usuario && usuario.id) {
      dispatch(blogsInciales(usuario.id));
    }
  }, [dispatch, usuario?.id]);

  return (
    <div>
      {usuario.blogs && usuario.blogs.length > 0 ? (
        <ul>
          {usuario.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}> {blog.titulo} </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p> Este usuario no ha creado blogs todavía </p>
      )}
    </div>
  );
};

export default BlogsUsuario;
