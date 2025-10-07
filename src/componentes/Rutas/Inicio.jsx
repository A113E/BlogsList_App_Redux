import { useDispatch, useSelector } from 'react-redux';
import { blogsInciales } from '../../actions/blogActions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Inicio = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(blogsInciales());
  }, [dispatch]);

  // Función para mostrar solo los últimos 5 blogs
  const mostrarUltimos = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // ordena por fecha desc
    .slice(0, 5); // Mostrar solo los 5 primeros

  return (
    <div className="inicio-div">
      <h2> Últimas Entradas </h2>
      <div>
        <Table striped>
          <tbody>
            {mostrarUltimos.map((blog) => (
              <tr key={blog.id}>
                <td>
                  {' '}
                  <Link to={`/blogs/${blog.id}`}>{blog.titulo}</Link>{' '}
                </td>
                <td> {blog.autor} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Inicio;
