import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import busquedaReducer from './reducers/buscarReducer'
import notificacionReducer from './reducers/notificacionReducer'
import loginReducer from './reducers/loginReducer'
import usuarioReducer from './reducers/usuarioReducer'

export const store = configureStore({
    reducer: {
       blogs: blogReducer,
       busqueda: busquedaReducer,
       notificacion: notificacionReducer,
       usuario: loginReducer,
       usuarios: usuarioReducer
    }
})

console.log(store.getState())

