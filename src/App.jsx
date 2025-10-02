// Hooks
import { useEffect } from 'react';
// Thunk Action
import { blogsInciales } from './actions/blogActions';
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

const App = () => {
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuario)

  // Hook para cargar los blogs desde el backend
  useEffect(() => {
    dispatch(blogsInciales())
  }, [])

  // Hook para cargar los usuarios desde el backend
  useEffect(() => {
    dispatch(usuariosIniciales())
  })

  // Hook para cargar el usuario en el localStorage
  useEffect(() => {
    if (usuario) {
      dispatch(cargarUsuarios())
    }
  }, [])

  return (
    <div>
      <h1>BlogsList_App</h1>
      <Notificacion />
      <BuscarBlog />
      {!usuario &&
      <LoginForm />
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