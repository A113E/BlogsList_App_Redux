import { useDispatch, useSelector } from 'react-redux';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { useCampo } from '../../hooks/useCampo';
import { crearUsuario } from '../../actions/usuarioActions';

const SiginForm = () => {
    const dispatch = useDispatch()
    const usuarios = useSelector(state => state.usuarios)

    // Campos del formulario
    const nombre_usuario = useCampo('text')
    const nombre = useCampo('text')
    const password = useCampo('password')

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        nombre_usuario.limpiar()
        nombre.limpiar()
        password.limpiar()
    }

    // Función para añadir nuevo usuario
    const añadirUsuario = async (e) => {
        e.preventDefault()
        // Crear el objeto usuario
        const usuarioObjeto = {
           nombre_usuario: nombre_usuario.value,
           nombre: nombre.value,
           password: password.value 
        }
        
        // Validación de los campos
        if (!usuarioObjeto.nombre) {
            dispatch(mostrarMensaje({
                mensaje: '⚠️ Nombre es requerido',
                tipo: 'error'
            }))
            return
        }
        if (!usuarioObjeto.nombre_usuario) {
            dispatch(mostrarMensaje({
                mensaje: '⚠️ Nombre de usuario es requerido',
                tipo: 'error'
            }))
            return
        }
        if (!usuarioObjeto.password) {
            dispatch(mostrarMensaje({
                mensaje: '⚠️ Contraseña es requerida',
                tipo: 'error'
            }))
        }

        try {
            // Verificar si el nombre de usuario ya existe
            const usuarioExistenete = usuarios.find(usuario => usuario.nombre_usuario === usuarioObjeto.nombre_usuario)

            if (usuarioExistenete) {
                dispatch(mostrarMensaje({
                    mensaje: `El nombre de usuario ${usuarioObjeto.nombre_usuario} ya existe`,
                    tipo: 'error'
                }))
                return
            } 
                await dispatch(crearUsuario(usuarioObjeto))
                dispatch(mostrarMensaje({
                    mensaje: `Usuario: ${usuarioObjeto.nombre_usuario} registrado satisfactoriamente ✅`,
                    tipo: 'exito'
                }))
            limpiarFormulario()
        } catch (error) {
            console.error('Error al crear usuario', error)
            dispatch(mostrarMensaje({
                mensaje: '❌ Error al registrar usuario', 
                tipo: 'error'
            }))
        }
    }

    return (
        <div className='form-sigin'>
           <h2>Registrar Usuario</h2>
           <form onSubmit={añadirUsuario}>
            <div>
                Nombre de usuario:
                <input { ...nombre_usuario.inputProps } id='usuarioSig-input' />
            </div>
            <div>
                Nombre Completo:
                <input { ...nombre.inputProps } id='nombreSig-input' />
            </div>
            <div>
                Contraseña:
                <input { ...password.inputProps } id='passwordSig-input' />
            </div>
            <button type='submit'> Registrar </button>
           </form>
        </div>
    )
}

export default SiginForm