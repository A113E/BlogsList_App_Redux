const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const Usuario = require('../models/usuario')
const Comentario = require('../models/comentario')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const ayuda = require('../utils/ayuda_prueba')

const api = supertest(app) // Instancia para hacer solicitudes HTTP

describe('Comentarios API', () => {
    let token
    let blogId

    const bcrypt = require('bcrypt')

    beforeEach(async () => {
        await Comentario.deleteMany({})
        await Blog.deleteMany({})
        await Usuario.deleteMany({})

        // Crear un usuario
        const passwordHash = await bcrypt.hash('testing', 10)
        const usuario = new Usuario({ nombre_usuario: 'tester', nombre: 'Usuario', passwordHash })
        const usuarioGuardado = await usuario.save()

        // Login para obtener el token
        const loginRespuesta = await api
        .post('/api/login')
        .send({
            nombre_usuario: 'tester',
            password: 'testing'
        })
        token = loginRespuesta.body.token

        // Crea un blog
        const blog = new Blog({ titulo: 'Blog de prueba', autor: 'Root User', url: 'www.test.com' })
        const blogGuardado = await blog.save()
        blogId = blogGuardado._id

        // Insertar comentarios iniciales con referencia al blog y usuario
        const comentariosConRefs = ayuda.comentariosIniciales.map(c => ({
          ...c,
          blog: blogId,
          usuario: usuarioGuardado._id
        }))
        await Comentario.insertMany(comentariosConRefs)
    })

    // Prueba que verifica que se muestran los comentarios de un blog (array vacio)
    test('se pueden obtener los comentarios de un blog (aun con array vacio)', async () => {
        const respuesta = await api
        .get(`/api/comentarios/${blogId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        // Comprueba que el array este vacio
        assert.strictEqual(respuesta.body.length, ayuda.comentariosIniciales.length)
    })

    // Prueba que verifica que se puede comentar si el usuario está autentificado
    test('un usuario autentificado puede comentar un blog', async () => {
        const comentario = {
            comentario: 'Excelente Post'
        }

        await api
        .post(`/api/comentarios/${blogId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(comentario)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        // Comprueba que se sumó el comentario al array
        const comentariosAlFinal = await ayuda.comentariosEnBd()
        assert.strictEqual(comentariosAlFinal.length, ayuda.comentariosIniciales.length + 1)

        // Comprueba que el contenido del comentario existe
        const comentarioContenido = comentariosAlFinal.map(comentario => comentario.comentario)
        assert(comentarioContenido.includes('Excelente Post'))
    })

    // Prueba que verifica que no se puede crear un comentario sin token
    test('no se puede crear comentario sin token', async () => {
        const comentario = { comentario: 'Sin token' }

        const respuesta = await api
        .post(`/api/comentarios/${blogId}`)
        .send(comentario)
        .expect(401)

        assert.match(respuesta.body.error, /Token requerido/)
    })

    // Prueba que verifica que se puede dar like a un comentario
    test('se puede dar like a un comentario', async () => {
        const comentariosEnBD = await ayuda.comentariosEnBd()
        const comentarioLike = comentariosEnBD[0]

        const respuesta = await api
        .post(`/api/comentarios/${comentarioLike.id}/likes`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        // Comprueba que el like se añadió
        assert.strictEqual(respuesta.body.likes, comentarioLike.likes + 1)
    })
})

// Cierra la conexión luego de las pruebas
after(async () => {
    await mongoose.connection.close()
})