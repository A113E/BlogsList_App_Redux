const estadoInicial = {
    valor: '',
    tipo: 'TITULO' // Por defecto busca titulos
}

const busquedaReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        // Acción para buscar un blog
        case 'BUSCAR_BLOG': 
        return {
            ...state,
            valor: action.payload.valor
        }

        // Acción para buscar un blog por autor o titulo
        case 'BUSCAR_POR':
            return {
                ...state,
                tipo: action.payload.tipo
            }

        default:
        return state 
  }
}

export default busquedaReducer