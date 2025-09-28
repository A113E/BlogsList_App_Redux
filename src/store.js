import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import busquedaReducer from './reducers/buscarReducer'

const reducers = combineReducers({
    blogs: blogReducer,
    busqueda: busquedaReducer 
})

export const store = createStore(reducers)

console.log(store.getState())

