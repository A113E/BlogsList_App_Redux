const KEY = 'blogUsuarioKey'

// Servicio para guardar usuario en el storage
export const usuarioGuardado = (usuario) =>  {
    localStorage.setItem(KEY, JSON.stringify(usuario))
}

// Servicio para obtener el usuario del storage
export const cargarUsuario = () => {
    const usuario = localStorage.getItem(KEY)
    return usuario ? JSON.parse(usuario) : null
}

// Servicio para mostrar el nombre de usuario cargado
export const yo = () => {
  const usuario = cargarUsuario()
  return usuario ? usuario.nombre_usuario : null
}

// Servicio para eliminar usuario del storage
export const eliminarUsuario = () => {
  localStorage.removeItem(KEY)
}