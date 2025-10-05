import api from './axiosConfig'

// Servicio para iniciar sesión con las credenciales correctas
export const login = (credenciales) => {
  return api.post(`/login`, credenciales).then(res => res.data)
}