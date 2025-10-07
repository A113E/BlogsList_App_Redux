import { useDispatch } from 'react-redux';
import { crearComentario } from '../../actions/comentarioAction';
import { mostrarMensaje } from '../../actions/notificacionAction';
import { useCampo } from '../../hooks/useCampo';
import { cambiarVisibilidadFormulario } from '../../actions/togglableAction';
import { Form, Button } from 'react-bootstrap';

const ComentarioForm = ({ blogId }) => {
  const dispatch = useDispatch();

  // Campos del formulario
  const comentario = useCampo('text');

  // Instancia para limpiar el formulario
  const limpiarFormulario = () => {
    comentario.limpiar();
  };

  // Función para añadir un nuevo comentario
  const añadirComentario = async (e) => {
    e.preventDefault();

    try {
      const comentarioObjeto = {
        comentario: comentario.value,
      };
      dispatch(crearComentario(blogId, comentarioObjeto));
      dispatch(
        mostrarMensaje({
          mensaje: 'Comentario agregado correctamente ✅',
          tipo: 'exito',
        })
      );
      limpiarFormulario();
      // una vez creado el comentario, cerramos el formulario
      dispatch(cambiarVisibilidadFormulario(blogId, false));
    } catch (error) {
      console.error('Error al añadir el comentario');
      dispatch(
        mostrarMensaje({
          mensaje: '❌ Error al añadir comentario',
          tipo: 'error',
        })
      );
      throw error; // Relanza para que el componente capture el error
    }
  };

  return (
    <div className="form-com">
      <Form onSubmit={añadirComentario}>
        <Form.Group>
          <Form.Control
            as="textarea"
            {...comentario.inputProps}
            id="comentario-bar"
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {' '}
          Comentar{' '}
        </Button>
      </Form>
    </div>
  );
};

export default ComentarioForm;
