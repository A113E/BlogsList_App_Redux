import axios from 'axios';
import { store } from '../store';
import { cerrarSesion } from '../actions/usuarioActions';
import { BACKEND_URL } from '../config';

// Instancia para baseUrl
const api = axios.create({
    baseURL: `${BACKEND_URL}`
})

// Interceptor de respuestas
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('⚠️ Token expirado, cerrando sesión...')
            store.dispatch(cerrarSesion())
        }
        return Promise.reject(error)
    }
)

export default api