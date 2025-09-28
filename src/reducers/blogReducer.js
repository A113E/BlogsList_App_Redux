// Reducer para manejar blogs
const estadoInicial = [
  {
    titulo: 'La forma de cuidar a tu perro',
    autor: 'Roberto Cardenas',
    url: 'www.blogdog',
    likes: 0,
    id: 1
  },
  {
    titulo: 'Pastel de Guayaba. Aprenda a cocinarlo',
    autor: 'Ana Laura F.',
    url: 'www.cook',
    likes: 0,
    id: 2
  }
]

const blogReducer = (state = estadoInicial, action) => {
  switch (action.type) {
    // Acción para crear un nuevo blog
    case 'NUEVO_BLOG':
      // Retorna un nuevo array sin mutar el estado original
      return [...state, action.payload] // Inmutable usando spread syntax

    // Acción para dar like a un blog
    case 'LIKE_BLOG': {
      const id = action.payload.id
      const blogLikear = state.find(b => b.id === id)

      // Creamos un nuevo objeto con los likes incrementados
      const blogLike = {
        ...blogLikear,
        likes: blogLikear.likes + 1,
      }

      // Devolvemos un nuevo array reemplazando solo el blog que recibió el like
      return state.map(blog =>
        blog.id !== id ? blog : blogLike
      )
    }

    // Acción para eliminar un blog
    case 'ELIMINAR_BLOG': {
      const id = action.payload.id
      // Devuelve esl estado excluyendo el blog eliminado
      return state.filter(blog => blog.id !==id)
    }

    // Acción para actualizar el blog si existe el titulo
    case 'ACTUALIZAR_BLOG': {
      const { titulo } = action.payload
      // Busca si el titulo del blog existe
      const existeTitulo = state.find(blog => blog.titulo === titulo)

      if (existeTitulo) {
        // Reemplaza
        return state.map(blog =>
          blog.titulo === titulo ? action.payload : blog
        )
      } else {
        // Si no existe, lo agrega
        return [...state, action.payload]
      }
    }

    // Estado por defecto (ninguna acción reconocida)
    default:
      return state
  }
}

export default blogReducer


