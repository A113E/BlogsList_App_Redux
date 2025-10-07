const comentariosRouter = require('express').Router();
// Modelos
const Comentario = require('../models/comentario');
const { tokenExtractor, usuarioExtractor } = require('../utils/middleware');

// Ruta para obtener todos los comentarios de un blog
comentariosRouter.get('/:blogId', async (request, response) => {
  // Obtiene el parametro blogId
  const { blogId } = request.params;

  // Obtiene todos los comentarios desde MongoDB que pertenezcan a ese blog
  const comentarios = await Comentario.find({})
    .find({ blog: blogId })
    .populate('usuario', { nombre_usuario: 1, nombre: 1 });

  response.json(comentarios);
});

// Ruta para crear un comentario
comentariosRouter.post(
  '/:blogId',
  tokenExtractor,
  usuarioExtractor,
  async (request, response) => {
    // Obtiene el parámetro blogId y comentario del cuerpo
    const { blogId } = request.params;
    const body = request.body;
    const usuario = request.usuario;

    if (!body.comentario || body.comentario.trim() === '') {
      return response
        .status(400)
        .json({ error: 'El comentario no puede estar vacio' });
    }

    if (!usuario) {
      return response.status(401).json({ error: 'Usuario no autenticado' });
    }

    const nuevoComentario = new Comentario({
      comentario: body.comentario,
      likes: body.likes || 0,
      blog: blogId,
      usuario: usuario._id,
    });

    const comentarioGuardado = await nuevoComentario.save();

    // Popular el usuario antes de devolver
    await comentarioGuardado.populate('usuario', {
      nombre_usuario: 1,
      nombre: 1,
    });

    response.status(201).json(comentarioGuardado);
  }
);

// Ruta para dar like a un comentario
comentariosRouter.post('/:id/likes', async (request, response) => {
  const id = request.params.id;

  const comentarioLike = await Comentario.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true, runValidators: true, context: 'query' }
  );

  // Si el comentario no existe
  if (!comentarioLike) {
    return response.status(404).json({ error: 'Comentario no encontrado' });
  }

  response.status(200).json(comentarioLike);
});

// Ruta para eliminar un comentario
comentariosRouter.delete(
  '/:id',
  tokenExtractor,
  usuarioExtractor,
  async (request, response) => {
    const usuario = request.usuario;
    const id = request.params.id;

    // Buscar el comentario por ID
    const comentario = await Comentario.findById(id);

    if (!comentario) {
      return response.status(404).json({ error: 'Comentario no encontrado' });
    }

    // Verifica que el usuario que creó el comentario es el mismo
    if (comentario.usuario.toString() !== usuario._id.toString()) {
      return response.status(403).json({ error: 'Usuario no autorizado' });
    }

    // Elimina el comentario
    await Comentario.findByIdAndDelete(id);

    // Actualiza el array de comentarios del usuario
    if (usuario.comentarios) {
      usuario.comentarios = usuario.comentarios.filter(
        (c) => c.toString() !== id
      );
      await usuario.save();
    }

    response.status(204).end();
  }
);

module.exports = comentariosRouter;
