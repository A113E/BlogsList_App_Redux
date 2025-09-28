import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import configureMockStore from 'redux-mock-store'

// Crea el mockStore a partir de configureMockStore
const mockStore = configureMockStore()

// Bloque de pruebas para Blog.jsx
describe('Blog.jsx', () => {
    const blog = {
    id: 1,
    titulo: 'Blog de prueba',
    autor: 'Admin',
    url: 'https://www.test.com',
    likes: 5
  }

  // Prueba que verifica que se renderiza los datos del blogs
  test('los datos del blog son renderizados', () => {
    // Crea el store falso
    const store = mockStore({})

    const { container } = render(
        <Provider store={store}>
            <Blog blog={blog} />
        </Provider>
    )
    
    screen.debug()

    const datos = container.querySelector('.blog')
    expect(datos).toBeDefined()
  })

  // Prueba que verifica que se dispacha la acción 'LIKE_BLOG' dos veces
  test('la acción "LIKE_BLOG" se despacha al hacer doble click', async () => {
    // Crea el store falso
    const store = mockStore({})

    render(
        <Provider store={store}>
            <Blog blog={blog} />
        </Provider>
    )

    // Crear un usuario
    const usuario = userEvent.setup()
    
    screen.debug()

    // Simula dos click en el boton
    const likeBtn = screen.getByText('Like')
    await usuario.dblClick(likeBtn)

    // Verificar que se despachó la acción
    const accion = store.getActions()
    expect(accion).toHaveLength(2)
    expect(accion[0].type).toBe('LIKE_BLOG')
    expect(accion[0].payload.id).toBe(blog.id)
  })

  // Prueba que verifica que se despacha la acción 'ELIMINAR_BLOG' al hacer click en el boton
  test('la acción "ELIMINAR_BLOG" se despacha al hacer click en el boton', async () => {
    // Crea el store falso
    const store = mockStore({})
    // Forzar confirm a devolver true
    window.confirm = jest.fn(() => true)

    render(
        <Provider store={store}>
            <Blog blog={blog} />
        </Provider>
    )

    // Crea un usuario
    const usuario = userEvent.setup()

    screen.debug()

    // Simula el click en el boton
    const eliminarBtn = screen.getByText('Eliminar')
    await usuario.click(eliminarBtn)

    // Verificar que se despachó la acción
    const accion = store.getActions()
    expect(accion).toHaveLength(1)
    expect(accion[0].type).toBe('ELIMINAR_BLOG')
    expect(accion[0].payload.id).toBe(blog.id)

    // Verificar que se mostró el confirm
    expect(window.confirm).toHaveBeenCalledWith(
    '¿Está seguro que desea eliminar el blog: "Blog de prueba"?'
    )
  })
})
