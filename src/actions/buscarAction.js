// Acción para cambiar el texto del campo de busqueda
export const buscarBlog = (valor) => {
    return {
        type: 'BUSCAR_BLOG',
        payload: { valor }
    }
}

// Acción para cambiar el tipo de busqueda
export const buscarPor = (tipo) => {
    return {
        type: 'BUSCAR_POR',
        payload: { tipo }
    }
}