import busquedaReducer, { buscarBlog, buscarPor } from './buscarReducer'
import deepFreeze from 'deep-freeze'

describe('busquedaReducer', () => {
    // Prueba que verifica que devuelve un nuevo estado con la acción buscarBlog
    test('un nuevo estado es devuelto con la acción buscarBlog', () => {
        const state = { valor: '', tipo: 'TITULO' } 
        const action = {
            type: 'busqueda/buscarBlog',
            payload: 'Buscando blog...'
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = busquedaReducer(state, action)

        // Comprueba que el estado sea igual al payload
        expect(nuevoEstado).toEqual({
           valor: 'Buscando blog...',
           tipo: 'TITULO'
        })
    })

    // Prueba que verifica que devuelve un nuevo estado con la acción buscarPor
    test('un nuevo estado es devuelto con la acción buscarPor', () => {
        const state = { valor: 'Roberto Cardenas', tipo: 'TITULO' }
        const action = {
            type: 'busqueda/buscarPor',
            payload: 'AUTOR'
        }

        deepFreeze(state) // Asegura que el estados sea inmutable
        const nuevoEstado = busquedaReducer(state, action)

        // Comprueba que el estado de busqueda cambió
        expect(nuevoEstado).toEqual({
            valor: 'Roberto Cardenas',
            tipo: 'AUTOR'
        })
    })
})