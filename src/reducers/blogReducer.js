// Reducer para manejar blogs
import { createSlice } from '@reduxjs/toolkit';

// Slice para manejar las acciones en los blogs
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // Acción para dar like a un blog
    blogLike(state, action) {
      const blogActualizado = action.payload;
      return state.map((blog) =>
        blog.id !== blogActualizado.id ? blog : blogActualizado
      );
    },
    // Acción para eliminar un blog
    eliminarBlog(state, action) {
      const id = action.payload;
      // Devuelve el estado excluyendo el blog eliminado
      return state.filter((blog) => blog.id !== id);
    },
    // Acción para actualizar un blog
    // Reemplaza un blog existente por id
    actualizarBlog(state, action) {
      const blogActualizado = action.payload;
      return state.map((blog) =>
        blog.id !== blogActualizado.id ? blog : blogActualizado
      );
    },
    // Acción para añadir un objeto de un blog
    appendBlog(state, action) {
      state.push(action.payload);
    },
    // Acción para reemplazar el array de blogs
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { blogLike, eliminarBlog, actualizarBlog, appendBlog, setBlogs } =
  blogsSlice.actions;

export default blogsSlice.reducer;
