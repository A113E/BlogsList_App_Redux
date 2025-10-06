import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cargarUsuarios } from '../../actions/usuarioActions';
import { iniciarUsuario } from '../../actions/usuarioActions';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { useCampo } from '../../hooks/useCampo';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch() // Disparar acciones
    const navigate = useNavigate() // Para redireccionar

    // Hook para cargar el usuario en el localStorage
    useEffect(() => {
      dispatch(cargarUsuarios())
    }, [dispatch])
    
    // Campos del formulario
    const nombre_usuario = useCampo('text')
    const password = useCampo('password')

    // Limpiar campos del formulario
    const limpiarFormulario = () => {
        nombre_usuario.limpiar()
        password.limpiar()
    }

    // Manejador de eventos para logear usuario
    const handleLogin = async (e) => {
        e.preventDefault()
        try { 
        const usuarioLogeado = {
            nombre_usuario: nombre_usuario.value,
            password: password.value
        }
        console.log('🔍 LoginForm credenciales:', usuarioLogeado)
        await dispatch(iniciarUsuario(usuarioLogeado))
        dispatch(mostrarMensaje({
            mensaje: `Bienvenido ${usuarioLogeado.nombre_usuario} de vuelta ✅`,
            tipo: 'exito'
        }))
        limpiarFormulario()
        navigate('/')
      } catch (error) {
        console.error('Error al inciar sesión', error)
        dispatch(mostrarMensaje({
            mensaje: '❌ No se pudo inciar sesión',
            tipo: 'error'
        }))
        throw error // Relanza para que el componente capture el error
      } 
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <div>
                    Nombre de usuario:
                    <input {...nombre_usuario.inputProps} id='nombre-input' />
                </div>
                <div>
                    Contraseña:
                    <input {...password.inputProps} id='password-input' />
                </div>
                <button type='submit'> Iniciar </button>
            </form>
        </div>
    )
}

export default LoginForm