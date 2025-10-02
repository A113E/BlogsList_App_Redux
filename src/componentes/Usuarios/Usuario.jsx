const Usuario = ({ usuario }) => {
    if (!usuario) return null
    return (
        <div className='usuario'>
           <h1> Usuarios </h1>
           <p> { usuario.nombre } -  {usuario.blogs?.length || 0} blogs </p> 
        </div>
    )
}

export default Usuario