import axios from 'axios';
import { cargarUsuario } from './storage';
import { BACKEND_URL } from '../config';

// Definir la baseUrl
const baseUrl = `${BACKEND_URL}/blogs`

// Autentificación
const obtenerConfit = () => {
    const usuario = cargarUsuario()
    if (!usuario?.token) {
        throw new Error('Usuario no encontrado') // Evita hacer las solicitudes sin token
    }
    return {
        headers: { Authorization: `Bearer ${usuario.token}` }
    }
}

// Servicio para obtener los blogs
export const obtener = () => {
    return axios.get(baseUrl).then(res => res.data)
}

// Servicio para crear blogs
export const crear = (blogObjeto) => {
    return axios.post(baseUrl, blogObjeto, obtenerConfit()).then(res => res.data)
}

// Servicio para actualizar un blog
export const actualizar = (id, blogObjeto) => {
    return axios.put(`${baseUrl}/${id}`, blogObjeto, obtenerConfit()).then(res => res.data)
}

// Servicio para dar like a un blog
export const like = (id) => {
    return axios.post(`${baseUrl}/${id}/likes`).then(res => res.data)
}

// Servicio para eliminar un blog
export const eliminar = (id) => {
    return axios.delete(`${baseUrl}/${id}`, obtenerConfit()).then(res => res.data)
}