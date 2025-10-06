import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Componentes
import Inicio from './Inicio'
import Blog from '../Blogs/Blog'
import BlogsLista from '../Blogs/BlogsLista'
import SiginForm from '../Usuarios/SiginForm'
import UsuarioLista from '../Usuarios/UsuarioLista'
import LoginForm from '../Usuarios/LoginForm'
import Usuario from '../Usuarios/Usuario'

const RutasApp = () => {
  const usuario = useSelector(state => state.usuario)

  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/blogs/:id' element={<Blog />} />
      <Route path='/blogs' element={<BlogsLista />} />
      <Route path='/registro' element={<SiginForm />} />
      <Route
        path='/usuarios'
        element={usuario ? <UsuarioLista /> : <Navigate replace to='/registro' />}
      />
      <Route path='/usuarios/:id' element={<Usuario />} />
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  )
}

export default RutasApp