import { useSelector } from 'react-redux';
import Usuario from './Usuario';

const UsuarioLista = () => {
    const usuarios = useSelector(state => state.usuarios)

    return (
        <div>
           {usuarios.map((usuario) => (
            <Usuario
            key={usuario.id}
            usuario={usuario}
            />
           ))}
        </div>
    )
}

export default UsuarioLista