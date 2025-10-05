import api from './axiosConfig';

// Servicio para obtener todos los usuarios
export const obtenerUsuarios = () => {
    return api.get(`/usuarios`).then(res => res.data)
}

// Servicio para crear un usuario nuevo
export const crear = (usuarioObjeto) => {
    return api.post(`/usuarios`, usuarioObjeto).then(res => res.data)
}