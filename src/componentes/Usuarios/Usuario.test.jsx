import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Usuario from './Usuario'

// Store falso
const mockStore = configureMockStore()

describe('Usuario.jsx', () => {
    // Prueba que verifica que se muestre el titulo "Usuarios"
    test('Se muestra el titulo "Usuarios"', () => {
        const store = mockStore({})

        render(
            <Provider store={store}>
                <Usuario usuario={'Tester'}/>
            </Provider>
        )

        // Comprueba que el texto se muestre
        expect(screen.getByText('Usuarios')).toBeInTheDocument()

        screen.debug()
    })

    // Prueba que verifica que un usuario con 2 blogs es renderizado
    test('Un usuario con 2 blogs es renderizado', () => {
        const store = mockStore({})

        const usuarioRender = {
            id: 1,
            nombre: 'Alberto', 
            blogs: [
                { id: 1, titulo: 'Blog1', autor: 'Tester1', url: 'www.test', likes: 1 },
                { id: 2, titulo: 'Blog2', autor: 'Tester2', url: 'www.test', likes: 0 }
            ]
        }

        render(
            <Provider store={store}>
                <Usuario usuario={usuarioRender} />
            </Provider>
        )

        // Comprueba que se muestra el nombre de usuario con la cantidad de blogs
        expect(screen.getByText(/Alberto/)).toBeInTheDocument()
        expect(screen.getByText(/2 blogs/)).toBeInTheDocument()

        screen.debug()
    })
})