// Componentes
import Menu from './componentes/Rutas/Menu';
import Notificacion from './componentes/Otros/Notificacion';
import RutasApp from './componentes/Rutas/Rutas';
import Footer from './componentes/Rutas/Footer';

const App = () => {
  return (
    <div className="container">
      <Menu />
      <Notificacion />
      <RutasApp />
      <Footer />
    </div>
  );
};

export default App;
