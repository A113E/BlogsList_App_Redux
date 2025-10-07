import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Notificacion from './Notificacion';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

// Store falso
const mockStore = configureMockStore();

describe('Notificacion.jsx', () => {
  // Prueba que verifica que se muestra un mensaje
  test('un mensaje es renderizado', () => {
    const store = mockStore({
      notificacion: { mensaje: 'Hola Mundo', tipo: 'exito' },
    });

    render(
      <Provider store={store}>
        <Notificacion />
      </Provider>
    );

    expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
  });

  // Prueba que verifica que no se muestra nada si el mensaje es null
  test('no se renderiza el mensaje si es null', () => {
    const store = mockStore({ notificacion: { mensaje: null, tipo: '' } });

    render(
      <Provider store={store}>
        <Notificacion />
      </Provider>
    );

    // No debería existir ningún mensaje en pantalla
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  // Prueba que verifica que el color del mensaje es verde si es exito
  test('el mensaje es verde si es exitoso', () => {
    const store = mockStore({
      notificacion: { mensaje: 'Hola mundo', tipo: 'exito' },
    });

    render(
      <Provider store={store}>
        <Notificacion />
      </Provider>
    );

    const mensaje = screen.getByText('Hola mundo');
    expect(mensaje).toHaveClass('exito');
  });

  // Prueba que verifica que el color del mensaje es rojo si es error
  test('el mensaje es rojo si es error', () => {
    const store = mockStore({
      notificacion: { mensaje: 'Falso', tipo: 'error' },
    });

    render(
      <Provider store={store}>
        <Notificacion />
      </Provider>
    );

    const mensaje = screen.getByText('Falso');
    expect(mensaje).toHaveClass('error');
  });
});
