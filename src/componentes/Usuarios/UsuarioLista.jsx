import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usuariosIniciales } from '../../actions/usuarioActions';
import { Link } from 'react-router-dom';

const UsuarioLista = () => {
    const dispatch = useDispatch()
    const usuarios = useSelector(state => state.usuarios)

    // Hook para cargar los usuarios desde el backend
      useEffect(() => {
        dispatch(usuariosIniciales())
      }, [dispatch])

    return (
        <div>
            <table className='tabla-usuarios'>
                <thead>
                    <tr>
                        <th> Usuarios </th>
                        <th> Cantidad de Blogs </th>
                    </tr>
                </thead>
                <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td> <Link to={`/usuarios/${usuario.id}`}> {usuario.nombre} </Link> </td>
                                <td> { usuario.blogs ? usuario.blogs.length : 0 } </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsuarioLista