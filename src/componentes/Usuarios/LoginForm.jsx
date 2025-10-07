import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cargarUsuarios } from '../../actions/usuarioActions';
import { iniciarUsuario } from '../../actions/usuarioActions';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { useCampo } from '../../hooks/useCampo';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useDispatch(); // Disparar acciones
  const navigate = useNavigate(); // Para redireccionar

  // Hook para cargar el usuario en el localStorage
  useEffect(() => {
    dispatch(cargarUsuarios());
  }, [dispatch]);

  // Campos del formulario
  const nombre_usuario = useCampo('text');
  const password = useCampo('password');

  // Limpiar campos del formulario
  const limpiarFormulario = () => {
    nombre_usuario.limpiar();
    password.limpiar();
  };

  // Manejador de eventos para logear usuario
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usuarioLogeado = {
        nombre_usuario: nombre_usuario.value,
        password: password.value,
      };
      console.log('🔍 LoginForm credenciales:', usuarioLogeado);
      await dispatch(iniciarUsuario(usuarioLogeado));
      dispatch(
        mostrarMensaje({
          mensaje: `Bienvenido ${usuarioLogeado.nombre_usuario} de vuelta ✅`,
          tipo: 'exito',
        })
      );
      limpiarFormulario();
      navigate('/');
    } catch (error) {
      console.error('Error al inciar sesión', error);
      dispatch(
        mostrarMensaje({
          mensaje: '❌ No se pudo inciar sesión',
          tipo: 'error',
        })
      );
      throw error; // Relanza para que el componente capture el error
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label> Nombre de usuario: </Form.Label>
          <Form.Control {...nombre_usuario.inputProps} id="nombre-input" />
        </Form.Group>
        <Form.Group>
          <Form.Label> Contraseña: </Form.Label>
          <Form.Control {...password.inputProps} id="password-input" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {' '}
          Iniciar{' '}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
