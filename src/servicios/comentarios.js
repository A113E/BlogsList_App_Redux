import api from './axiosConfig';
import { cargarUsuario } from './storage';

// Autentificación
const obtenerConfit = () => {
  const usuario = cargarUsuario();
  if (!usuario?.token) {
    throw new Error('Usuario no encontrado');
  }
  return {
    headers: { Authorization: `Bearer ${usuario.token}` },
  };
};

// Servicio para obtener los comentarios
export const obtenerComentarios = (blogId) => {
  return api.get(`/comentarios/${blogId}`).then((res) => res.data);
};

// Servicio para crear un comentario
export const crear = (blogId, comentarioObjeto) => {
  return api
    .post(`/comentarios/${blogId}`, comentarioObjeto, obtenerConfit())
    .then((res) => res.data);
};

// Servicio para dar like a un comentario
export const like = (id) => {
  return api.post(`/comentarios/${id}/likes`, {}).then((res) => res.data);
};

// Servicio para eliminar un comentario
export const eliminar = (id) => {
  return api
    .delete(`/comentarios/${id}`, obtenerConfit())
    .then((res) => res.data);
};
