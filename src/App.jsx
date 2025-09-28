// Componentes
import Footer from './componentes/Rutas/Footer';
import BlogsLista from './componentes/Blogs/BlogsLista';
import BlogForm from './componentes/Blogs/BlogForm';
import BuscarBlog from './componentes/Blogs/BuscarBlog';

const App = () => {
  // Hooks

  return (
    <div>
      <h1>BlogsList_App</h1>
      <BuscarBlog />
      <BlogsLista />
      <BlogForm />
      <br />
      <Footer />
    </div>
  )
}

export default App