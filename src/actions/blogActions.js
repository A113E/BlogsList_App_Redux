// Función para generar un id aleatorio
const generarId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

// Acción para crear un blog
export const crearBlog = (blogObjeto) => {
    return {
        type: 'NUEVO_BLOG',
        payload: {
        titulo: blogObjeto.titulo,
        autor: blogObjeto.autor,
        url: blogObjeto.url,
        likes: 0,
        id: generarId()
      }
    }
}

// Acción para dar like a un blog
export const blogLike = (id) => {
    return {
        type: 'LIKE_BLOG',
        payload: { id }
    }
}

// Acción para eliminar un blog
export const eliminarBlog = (id) => {
  return {
    type: 'ELIMINAR_BLOG',
    payload: { id }
  }
}

// Acción par actualizar un blog
export const actualizarBlog = (blogObjeto) => {
  return {
    type: 'ACTUALIZAR_BLOG',
    payload: {
      titulo: blogObjeto.titulo,
      autor: blogObjeto.autor,
      url: blogObjeto.url,
      likes: blogObjeto.likes ?? 0,
      id: blogObjeto.id ?? generarId() // si no tiene id, generamos uno
    }
  }
}