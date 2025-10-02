// Reducers
import { logUsuario, limpiarUsuario } from '../reducers/loginReducer';
// Servicios
import { cargarUsuario, usuarioGuardado, eliminarUsuario } from '../servicios/storage';
import { setUsuarios } from '../reducers/usuarioReducer';
import { login } from '../servicios/login';
import { obtenerUsuarios } from '../servicios/usuarios';

// Thunk action para cargar los usuarios
export const usuariosIniciales = () => {
    return async dispatch => {
        const usuarios = await obtenerUsuarios()
        dispatch(setUsuarios(usuarios))
    }
}

// Thunk action para cargar en el storage
export const cargarUsuarios = () => {
    return async dispatch => {
        const usuario = await cargarUsuario()
        if (usuario) {
            dispatch(logUsuario(usuario))
        }
    }
}

// Thunk action para logear usuario
export const iniciarUsuario = ({ nombre_usuario, password }) => {
    return async dispatch => {
        const usuario = await login({ nombre_usuario, password })
        console.log('Usuario logeado:', usuario)
        if (usuario) {
            usuarioGuardado(usuario) // lo guarda en el storage 
            dispatch(logUsuario(usuario)) // lo guarda en redux
        }
    }
}

// Thunk para cerrar sesion
export const cerrarSesion = () => {
    return async dispatch => {
        eliminarUsuario() // limpia del storage
        dispatch(limpiarUsuario()) // limpia de redux
    }
}