// Reducers
import {
  actualizarBlog,
  appendBlog,
  blogLike,
  eliminarBlog,
  setBlogs,
} from '../reducers/blogReducer';
// Servicios
import { obtener, crear, like, eliminar, actualizar } from '../servicios/blogs';

// Thunks Actions
// Accion para cargar los blogs
export const blogsInciales = () => {
  return async (dispatch) => {
    const blogs = await obtener();
    dispatch(setBlogs(blogs));
  };
};

// Accion para crear un nuevo blog
export const crearBlog = (blogObjeto) => {
  return async (dispatch) => {
    const nuevoBlog = await crear(blogObjeto);
    dispatch(appendBlog(nuevoBlog));
  };
};

// Accion para dar like a un blog
export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    // Busca el blog a dar like
    const blog = getState().blogs.find((b) => b.id === id);

    // Crea un nuevo objeto con los likes incrementados
    const blogActualizado = { ...blog, likes: blog.likes + 1 };

    // Llama al servicio
    const blogLikeado = await like(id, blogActualizado);

    // Dispara la acción
    dispatch(blogLike(blogLikeado));
  };
};

// Acción para eliminar un blog
export const blogEliminado = (id) => {
  return async (dispatch) => {
    // Llama al servicio
    await eliminar(id);

    // Dispara la acción
    dispatch(eliminarBlog(id));
  };
};

// Acción para actualizar un blog
export const blogActualizado = (blogObjeto) => {
  return async (dispatch, getState) => {
    // Busca si existe el blog por id
    const blogExistente = getState().blogs.find((b) => b.id === blogObjeto.id);

    // Llamada al servicio backend para actualizar
    const blogActualizado = await actualizar(blogExistente);

    // Despacha la actualización al store
    dispatch(actualizarBlog(blogActualizado));
  };
};
