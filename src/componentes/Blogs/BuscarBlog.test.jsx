import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BuscarBlog from './BuscarBlog'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import configureMockStore from 'redux-mock-store'

// Crea el mockStore a partir de configureMockStore
const mockStore = configureMockStore()

describe('BuscarBlog.jsx', () => {
    // Prueba que verifica que el placeholder se renderiza
    test('el placeholder se muestra en la barra de busqueda', () => {
        const store = mockStore({})

        render(
            <Provider store={store}>
                <BuscarBlog />
            </Provider>
        )

        // Comprobar que el placeholder esté en el documento
        expect(screen.getByPlaceholderText('Buscar Blog...')).toBeInTheDocument()

        screen.debug()
    })

    // Prueba que verifica que se renderiza el input con el valor inicial
    test('se renderiza el input con el valor incial', () => {
        const store = mockStore({})

        render(
            <Provider store={store}>
                <BuscarBlog valor={'Render input'} />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Buscar Blog...') // Obtiene el input
        expect(input.value).toBe('Render input') // Comprueba que el valor incial es renderizado

        screen.debug()
    })

    // Prueba que verfica que se dispara la acción 'BUSCAR_BLOG' al escribir en el input
    test('la acción "BUSCAR_BLOG" al escribir en el input', async () => {
        const store = mockStore({ busqueda: '' })
        const usuario = userEvent.setup()

        render(
            <Provider store={store}>
                <BuscarBlog />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Buscar Blog...') // Obtiene el input
        await usuario.type(input, 'Render busqueda...')

        screen.debug()

        // Verificar que se despachó la acción
        const accion = store.getActions()
        expect(accion.length).toBeGreaterThan(0) // Confirma que se despachen todas las acciones
        expect(accion.at(-1)).toEqual({ // Se toma la ultima accion que corresponde al input final "Render busqueda..."
           type: 'busqueda/buscarBlog',
           payload: 'Render busqueda...'
        })
    })

    // Prueba que verifica que se dispara la acción 'BUSCAR_POR' cuando se marca el input Titulo
    test('se dispara la acción "BUSCAR_POR" en el input Titulo', async () => {
        const store = mockStore({ busqueda: { valor: '', tipo: 'AUTOR' } })
        const usuario = userEvent.setup()

        render(
            <Provider store={store}>
                <BuscarBlog />
            </Provider>
        )
        
        // Busca el input label
        const tituloRadio = screen.getByRole('radio', { name: /titulo/i })

        // Simula el click
        await usuario.click(tituloRadio)

        // Verifica que se dispara las acciones
        const accion = store.getActions()
        expect(accion).toHaveLength(1)
        expect(accion[0]).toEqual({
            type: 'busqueda/buscarPor',
            payload: 'TITULO'
        })
    })

    // Prueba que verifica que se marca la acción 'BUSCAR_BLOG' cuando se marca el input Autor
    test('se dispara la acción "BUSCAR_BLOG" en el input Autor', async () => {
        const store = mockStore({ busqueda: { valor: '', tipo: 'TITULO' } })
        const usuario = userEvent.setup()

        render(
            <Provider store={store}>
                <BuscarBlog />
            </Provider>
        )

        // Busca el input label
        const autorRadio = screen.getByRole('radio', { name: /autor/i })

        // Simula un click
        await usuario.click(autorRadio)

        // Verifica que se dispara la acción
        const accion = store.getActions()
        expect(accion).toHaveLength(1)
        expect(accion[0]).toEqual({
            type: 'busqueda/buscarPor',
            payload: 'AUTOR'
        })
    })
})