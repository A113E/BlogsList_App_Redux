import usuarioReducer, { appendUsuario } from './usuarioReducer'
import deepFreeze from 'deep-freeze'

describe('usuarioReducer', () => {
    // Prueba que verifica que cambie el estado con la acción appendUsuario
    test('un nuevo estado es devuelto con la acción appendUsuario', () => {
        const state = []
        const action = {
           type: 'usuarios/appendUsuario',
           payload: {
            nombre: 'El desarrollador',
            nombre_usuario: 'tester',
            password: 'testing',
            id: 123
           } 
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = usuarioReducer(state, action)

        // Verifica que el estado cambió
        expect(nuevoEstado).toHaveLength(1)
        expect(nuevoEstado[0]).toMatchObject({
            nombre: 'El desarrollador',
            nombre_usuario: 'tester',
            password: 'testing',
            id: 123
        })
    })
})