import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useImperativeHandle } from 'react';
import { cambiarVisibilidadFormulario } from '../../actions/togglableAction';

const TogglableFormularios = forwardRef(
  ({ blogId, buttonLabel, children }, ref) => {
    const visibilidad =
      useSelector((state) => state.visibilidad.formularios[blogId]) || false;
    const dispatch = useDispatch();

    const togglableVisibilidad = () => {
      dispatch(cambiarVisibilidadFormulario(blogId, !visibilidad));
    };

    useImperativeHandle(ref, () => {
      return {
        togglableVisibilidad,
      };
    });

    return (
      <div>
        {!visibilidad && (
          <button onClick={togglableVisibilidad}>{buttonLabel}</button>
        )}
        {visibilidad && (
          <div className="mostrar-contenido">
            {children}
            <button onClick={togglableVisibilidad}> Cancelar </button>
          </div>
        )}
      </div>
    );
  }
);

export default TogglableFormularios;
