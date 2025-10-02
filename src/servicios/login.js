import axios from 'axios';
import { BACKEND_URL } from '../config'

const baseUrl = `${BACKEND_URL}/login`

// Servicio para iniciar sesión con las credenciales correctas
export const login = (credenciales) => {
  return axios.post(baseUrl, credenciales).then(res => res.data)
}