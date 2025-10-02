import blogReducer, { appendBlog, blogLike, eliminarBlog, actualizarBlog } from './blogReducer'
import deepFreeze from 'deep-freeze';

describe('blogReducer', () => {
  // Prueba que verifica que devuelve un nuevo estado con la acción appendBlog
  test('un nuevo estado es devuelto con la acción appendBlog', () => {
    const state = []
    const action = {
      type: 'blogs/appendBlog',
      payload: {
        titulo: 'Titulo de prueba',
        autor: 'Tester',
        url: 'miprueba.com',
        likes: 0,
        id: 123 // en este caso definimos un id explícito
      }
    }

    deepFreeze(state) // Asegura que el estado sea inmutable
    const nuevoEstado = blogReducer(state, action)

    // Verificar el nuevo estado
    expect(nuevoEstado).toHaveLength(1) // El estado tiene un blog
    expect(nuevoEstado[0]).toMatchObject({
      titulo: 'Titulo de prueba',
      autor: 'Tester',
      url: 'miprueba.com',
      likes: 0,
      id: 123
    })
  })

  // Prueba que verifica que devuelve un nuevo estado con la acción blogLike
  test('un nuevo estado es devuelto con la acción blogLike', () => {
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
      type: 'blogs/blogLike',
      payload: {
        titulo: 'Blog de prueba 2',
        autor: 'Tester 2',
        url: 'www.test',
        likes: 1, // se incrementa en 1
        id: 2
      }
    }

    deepFreeze(state) // Asegura que el estado sea inmutable
    const nuevoEstado = blogReducer(state, action)

    expect(nuevoEstado).toHaveLength(2) // Comprueba que el estado tenga dos blogs
    expect(nuevoEstado).toContainEqual(state[0]) // El primer blog se mantiene igual
    expect(nuevoEstado).toContainEqual({
      titulo: 'Blog de prueba 2',
      autor: 'Tester 2',
      url: 'www.test',
      likes: 1,
      id: 2
    })
  })

  // Prueba que verifica que devuelva un nuevo estado con la acción eliminarBlog
  test('un nuevo estado es devuelto con la acción eliminarBlog', () => {
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
      type: 'blogs/eliminarBlog',
      payload: 1 
    }

    deepFreeze(state) // Asegura que el estado sea inmutable
    const nuevoEstado = blogReducer(state, action)

    expect(nuevoEstado).toHaveLength(1) // Comprueba que el estado contenga un solo blog
    expect(nuevoEstado[0].id).toBe(2)   // El único blog que queda es el de id 2
  })

  // Prueba que verifica que devuelve un nuevo estado con la acción actualizarBlog
  test('un nuevo estado devuelto con la acción actualizarBlog', () => {
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
      type: 'blogs/actualizarBlog',
      payload: {
        titulo: 'Blog a actualizar',
        autor: 'Tester 2',
        url: 'www.tester',
        likes: 0,
        id: 1 // mantenemos el mismo id
      }
    }

    deepFreeze(state) // Asegura que el estado sea inmutable
    const nuevoEstado = blogReducer(state, action)

    expect(nuevoEstado).toHaveLength(1) // No agrega, solo actualiza
    expect(nuevoEstado[0]).toMatchObject({
      titulo: 'Blog a actualizar',
      autor: 'Tester 2',
      url: 'www.tester',
      likes: 0,
      id: 1
    })
  })
})
