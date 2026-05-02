import "./styles/App.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/general/Header";
import Footer from "./components/general/Footer";
import Menu from "./components/general/Menu";
import PageTransition from "./components/general/PageTransition";
import Inicio from "./components/inicio/Inicio";
import Conocenos from "./components/conocenos/Conocenos";
import Carta from "./components/carta/Carta";
import Blog from "./components/blog/Blog";
import Contacto from "./components/contacto/Contacto";
import NotFound from "./components/general/NotFound";
import Login from "./components/club/Login";
import PrivateRoute from "./components/general/PrivateRoute";
import PanelAdmin from "./components/club/PanelAdmin";
import AvisoLegal from "./components/politicas/AvisoLegal";
import Cookies from "./components/politicas/Cookies";
import Privacidad from "./components/politicas/Privacidad";
import Accesibilidad from "./components/politicas/Accesibilidad";

function renderAdminPage(contenido) {
   return (
      <PageTransition>
         <PrivateRoute rolPermitido="admin">
            {contenido}
         </PrivateRoute>
      </PageTransition>
   );
}

function AnimatedRoutes() {
   const location = useLocation();

   const renderPage = (contenido) => <PageTransition>{contenido}</PageTransition>;

   return (
      <AnimatePresence mode="wait">
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={renderPage(<Inicio />)}></Route>
            <Route path="/blog" element={renderPage(<Blog />)}></Route>
            <Route path="/conocenos" element={renderPage(<Conocenos />)}></Route>
            <Route path="/carta" element={renderPage(<Carta />)}></Route>
            <Route path="/contacto" element={renderPage(<Contacto />)}></Route>
            <Route path="/club/login" element={renderPage(<Login />)}></Route>
            <Route path="/club/admin" element={<Navigate to="/dashboard" replace />}></Route>
            <Route path="/dashboard" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/secciones" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/secciones/new" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/secciones/:sectionId/edit" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/productos" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/productos/new" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/productos/:productId/edit" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/articulos" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/articulos/new" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/articulos/:articleId/edit" element={renderAdminPage(<PanelAdmin />)}></Route>
            <Route path="/avisolegal" element={renderPage(<AvisoLegal />)}></Route>
            <Route path="/cookies" element={renderPage(<Cookies />)}></Route>
            <Route path="/privacidad" element={renderPage(<Privacidad />)}></Route>
            <Route path="/accesibilidad" element={renderPage(<Accesibilidad />)}></Route>
            <Route path="/*" element={renderPage(<NotFound />)}></Route>
         </Routes>
      </AnimatePresence>
   );
}

function AppLayout() {
   return (
      <>
         <Header />
         <Menu />
         <main id="contenido-principal" className="contenedor d-flex-col" role="main">
            <AnimatedRoutes />
         </main>
         <Footer />
      </>
   );
}

function App() {
   return (
      <BrowserRouter>
         <AppLayout />
      </BrowserRouter>
   );
}

export default App;
