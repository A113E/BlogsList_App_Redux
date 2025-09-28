import { useDispatch } from 'react-redux'
import { buscarBlog, buscarPor } from '../../actions/buscarAction'

const BuscarBlog = ({ valor }) => {
    const dispatch = useDispatch()

    // Función para manejar la búsqueda de blogs    
    const handleBusqueda = (e) => {
        dispatch(buscarBlog(e.target.value))
    }

    // Función para buscar por titulo
    const buscarPorTitulo = () => {
        dispatch(buscarPor('TITULO'))
    }

    // Función para buscar por autor
    const buscarPorAutor = () => {
        dispatch(buscarPor('AUTOR'))
    }

    return (
        <div className='buscarDiv'>
            <input type='text' value={valor} onChange={handleBusqueda} placeholder='Buscar Blog...'/>
            <div className='tipoDiv'>
                <strong> Buscar por: </strong>
                <div>
                <label>
                   <input
                   type='radio'
                   name='filtro'
                   onChange={buscarPorTitulo}
                   />
                Titulo
                </label>
                <label>
                   <input
                   type='radio'
                   name='filtro'
                   onChange={buscarPorAutor}
                   />
                Autor
                </label>
                </div>
            </div>
        </div>
    )
}

export default BuscarBlog
