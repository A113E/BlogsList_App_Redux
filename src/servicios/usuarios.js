import axios from 'axios';
import { BACKEND_URL } from '../config';

// Definir la baseUrl
const baseUrl = `${BACKEND_URL}/usuarios`

// Servicio para obtener todos los usuarios
export const obtenerUsuarios = () => {
    return axios.get(baseUrl).then(res => res.data)
}