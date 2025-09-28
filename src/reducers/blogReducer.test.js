import blogReducer from './blogReducer';
import deepFreeze from 'deep-freeze';

describe('blogReducer', () => {
    // Prueba que verifica que devuelve un nuevo estado con la acción NUEVO_BLOG
    test('un nuevo estado es devuelto con la acción NUEVO_BLOG', () => {
        const state = []
        const action = {
            type: 'NUEVO_BLOG',
            payload: {
                titulo: 'Titulo de prueba',
                autor: 'Tester',
                url: 'miprueba.com',
                likes: 0,
                id: 1
            }
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = blogReducer(state, action)

        // Verificar el nuevo estado
        expect(nuevoEstado).toHaveLength(1) // El estado tiene un blog
        expect(nuevoEstado).toContainEqual(action.payload) // El contenido del blog sea igual al del payload
    })

    // Prueba que verifica que devuelve un nuevo estado con la acción LIKE_BLOG
    test('un nuevo estado es devuelto con la acción LIKE_BLOG', () => {
        const state = [
            {
                titulo: 'Blog de prueba 1',
                autor: 'Tester 1',
                url: 'www.test',
                likes: 0,
                id: 1
            },
            {
                titulo: 'Blog de prueba 2',
                autor: 'Tester 2',
                url: 'www.test',
                likes: 0,
                id: 2
            }
        ]

        const action = {
            type: 'LIKE_BLOG',
            payload: { id: 2 }
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = blogReducer(state, action)

        expect(nuevoEstado).toHaveLength(2) // Comprueba que el estado tenga dos blogs
        expect(nuevoEstado).toContainEqual(state[0]) // Comprueba que el primer blog se mantenga igual
        expect(nuevoEstado).toContainEqual({
            titulo: 'Blog de prueba 2',
            autor: 'Tester 2',
            url: 'www.test',
            likes: 1, // Comprueba que se añadió el like
            id: 2
        })
    })

    // Prueba que verifica que devuelva un nuevo estado con la acción ELIMINAR_BLOG
    test('un nuevo estado es devuelto con la acción ELIMINAR_BLOG', () => {
        const state = [
            {
                titulo: 'Blog de prueba 1',
                autor: 'Tester 1',
                url: 'www.test',
                likes: 0,
                id: 1
            },
            {
                titulo: 'Blog de prueba 2',
                autor: 'Tester 2',
                url: 'www.test',
                likes: 0,
                id: 2
            }
        ]

        const action = {
            type: 'ELIMINAR_BLOG',
            payload: { id: 1 }
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = blogReducer(state, action)

        expect(nuevoEstado).toHaveLength(1) // Comprueba que el estado contenga un solo blog
    })

    // Prueba que verifica que devuelve un nuevo estado con la acción ACTUALIZAR_BLOG
    test('un nuevo estado devuelto con la acción ACTUALIZAR_BLOG', () => {
        const state = [
            {
                titulo: 'Blog a actualizar',
                autor: 'Tester 3',
                url: 'www.test',
                likes: 0,
                id: 1
            }
        ]

        const action = {
            type: 'ACTUALIZAR_BLOG',
            payload: {
                titulo: 'Blog a actualizar',
                autor: 'Tester 2',
                url: 'www.tester',
                likes: 0,
                id: 1
            }
        }

        deepFreeze(state) // Asegura que el estado sea inmutable
        const nuevoEstado = blogReducer(state, action)

        expect(nuevoEstado).toHaveLength(1) // No agrega, solo actualiza
        expect(nuevoEstado).toContainEqual(action.payload) // Comprueba que el nuevo estado contenga el blog actualizado
    })
})