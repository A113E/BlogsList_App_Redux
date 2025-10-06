import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../actions/usuarioActions';

const Menu = () => {
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuario)

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link style={padding} to='/'> Inicio </Link>
      <Link style={padding} to='/blogs'> Blogs </Link>
      <Link style={padding} to='/usuarios'> Usuarios </Link>

      {usuario ? (
        <>
          <span style={padding}>
            {usuario.nombre_usuario || usuario.username || usuario.name} conectado
          </span>
          <button onClick={() => dispatch(cerrarSesion())}>Cerrar Sesión</button>
        </>
      ) : (
        <Link style={padding} to='/registro'> Registro/Iniciar </Link>
      )}
    </div>
  )
}

export default Menu
