import api from './axiosConfig';
import { cargarUsuario } from './storage';

// Autentificación
const obtenerConfit = () => {
  const usuario = cargarUsuario();
  if (!usuario?.token) {
    throw new Error('Usuario no encontrado'); // Evita hacer las solicitudes sin token
  }
  return {
    headers: { Authorization: `Bearer ${usuario.token}` },
  };
};

// Servicio para obtener los blogs
export const obtener = () => {
  return api.get(`/blogs`).then((res) => res.data);
};

// Servicio para crear blogs
export const crear = (blogObjeto) => {
  return api
    .post(`/blogs`, blogObjeto, obtenerConfit())
    .then((res) => res.data);
};

// Servicio para actualizar un blog
export const actualizar = (id, blogObjeto) => {
  return api
    .put(`/blogs/${id}`, blogObjeto, obtenerConfit())
    .then((res) => res.data);
};

// Servicio para dar like a un blog
export const like = (id) => {
  return api.post(`/blogs/${id}/likes`).then((res) => res.data);
};

// Servicio para eliminar un blog
export const eliminar = (id) => {
  return api.delete(`/blogs/${id}`, obtenerConfit()).then((res) => res.data);
};
