import notificacionReducer, { setNotificacion } from './notificacionReducer'
import deepFreeze from 'deep-freeze'

describe('notificacionReducer', () => {
  const estadoInicial = { mensaje: null, tipo: '' }

  test('un nuevo estado es devuelto con la acción setNotificacion', () => {
    const state = estadoInicial
    const action = setNotificacion({ mensaje: 'Hola mundo', tipo: 'exito' })

    deepFreeze(state)
    const nuevoEstado = notificacionReducer(state, action)

    expect(nuevoEstado).toEqual({
      mensaje: 'Hola mundo',
      tipo: 'exito'
    })
  })

  test('el estado se limpia con la acción setNotificacion a null', () => {
    const state = { mensaje: 'Hola mundo', tipo: 'exito' }
    const action = setNotificacion({ mensaje: null, tipo: '' })

    deepFreeze(state)
    const nuevoEstado = notificacionReducer(state, action)

    expect(nuevoEstado).toEqual({
      mensaje: null,
      tipo: ''
    })
  })
})
