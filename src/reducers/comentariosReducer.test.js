import comentarioReducer, {
  appendComentario,
  comentarioLike,
} from './comentariosReducer';
import deepFreeze from 'deep-freeze';

describe('comentarioReducer', () => {
  test('devuelve un nuevo estado con la acción appendComentario', () => {
    const state = {};
    const action = appendComentario({
      blogId: 'blog123',
      comentario: { comentario: 'Nuevo comentario', likes: 0, id: 123 },
    });

    deepFreeze(state);
    const nuevoEstado = comentarioReducer(state, action);

    expect(nuevoEstado.blog123).toHaveLength(1);
    expect(nuevoEstado.blog123[0]).toMatchObject({
      comentario: 'Nuevo comentario',
      likes: 0,
      id: 123,
    });
  });

  test('devuelve un nuevo estado con la acción comentarioLike', () => {
    const state = {
      blog123: [
        { comentario: 'Primer comentario', likes: 0, id: 1 },
        { comentario: 'Segundo comentario', likes: 1, id: 2 },
      ],
    };

    // Payload correcto según el reducer actual
    const action = comentarioLike({
      blogId: 'blog123',
      id: 1, // id del comentario a actualizar
      comentarioActualizado: {
        comentario: 'Primer comentario',
        likes: 1,
        id: 1,
      },
    });

    deepFreeze(state); // asegura que el reducer sea inmutable
    const nuevoEstado = comentarioReducer(state, action);

    // sigue habiendo 2 comentarios
    expect(nuevoEstado.blog123).toHaveLength(2);

    // el segundo sigue igual
    expect(nuevoEstado.blog123).toContainEqual({
      comentario: 'Segundo comentario',
      likes: 1,
      id: 2,
    });

    // el primero se actualizó
    expect(nuevoEstado.blog123).toContainEqual({
      comentario: 'Primer comentario',
      likes: 1,
      id: 1,
    });
  });
});
