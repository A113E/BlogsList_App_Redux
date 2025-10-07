import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../actions/usuarioActions';
import { Navbar, Nav } from 'react-bootstrap';

const Menu = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/">
                {' '}
                Inicio{' '}
              </Link>{' '}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/blogs">
                {' '}
                Blogs{' '}
              </Link>{' '}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {' '}
              <Link style={padding} to="/usuarios">
                {' '}
                Usuarios{' '}
              </Link>{' '}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {usuario ? (
                <>
                  <span style={padding}>
                    {usuario.nombre_usuario || usuario.username || usuario.name}{' '}
                    conectado
                  </span>
                  <button onClick={() => dispatch(cerrarSesion())}>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link style={padding} to="/registro">
                  {' '}
                  Registro/Iniciar{' '}
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
