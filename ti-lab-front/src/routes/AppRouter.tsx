import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/Home'
import RegistrarComponente from '../pages/RegistrarComponente'
import ListaComponentes from '../pages/ListaComponentes'
import CrearKit from '../pages/CrearKit'
import GestionCursos from '../pages/GestionCursos'
import GestionPrestamos from '../pages/GestionPrestamos'
import Profile from '../pages/Profile'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="registrar-componente" element={<RegistrarComponente />} />
          <Route path="lista-componentes" element={<ListaComponentes />} />
          <Route path="crear-kit" element={<CrearKit />} />
          <Route path="gestion-cursos" element={<GestionCursos />} />
          <Route path="gestion-prestamos" element={<GestionPrestamos />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter