// Hooks
import { useEffect } from 'react';
// Thunk Action
import { cargarUsuarios, cerrarSesion, usuariosIniciales } from './actions/usuarioActions';
import { useDispatch, useSelector } from 'react-redux';
// Componentes
import Footer from './componentes/Rutas/Footer';
import BlogsLista from './componentes/Blogs/BlogsLista';
import BlogForm from './componentes/Blogs/BlogForm';
import BuscarBlog from './componentes/Blogs/BuscarBlog';
import Notificacion from './componentes/Otros/Notificacion';
import LoginForm from './componentes/Usuarios/LoginForm';
import UsuarioLista from './componentes/Usuarios/UsuarioLista';
import TogglableFormularios from './componentes/Otros/TogglableFormularios';
import SiginForm from './componentes/Usuarios/SiginForm';

const App = () => {
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuario)

  // Hook para cargar los usuarios desde el backend
  useEffect(() => {
    dispatch(usuariosIniciales())
  }, [dispatch])

  // Hook para cargar el usuario en el localStorage
  useEffect(() => {
    dispatch(cargarUsuarios())
  }, [dispatch])


  return (
    <div>
      <h1>BlogsList_App</h1>
      <Notificacion />
      <BuscarBlog />
      {!usuario &&
      <>
      <TogglableFormularios buttonLabel="Iniciar Sesión">
        <LoginForm />
      </TogglableFormularios>
      <TogglableFormularios buttonLabel="Registrarse">
        <SiginForm />
      </TogglableFormularios>
      </>
      }
      {usuario &&
      <div>
        <p> {usuario.nombre_usuario || usuario.username || usuario.name} conectado </p> <button onClick={() => dispatch(cerrarSesion())}> Cerrar Sesión </button>
        <BlogForm />
      </div>
      }
      <BlogsLista />
      <br />
      <UsuarioLista />
      <br />
      <Footer />
    </div>
  )
}

export default App