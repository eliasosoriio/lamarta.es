import "./styles/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/general/Header";
import Footer from "./components/general/Footer";
import Menu from "./components/general/Menu";
import PageTransition from "./components/general/PageTransition";
const Inicio = lazy(() => import("./components/inicio/Inicio"));
const Conocenos = lazy(() => import("./components/conocenos/Conocenos"));
const Carta = lazy(() => import("./components/carta/Carta"));
const Historia = lazy(() => import("./components/historia/Historia"));
const Contacto = lazy(() => import("./components/contacto/Contacto"));
const NotFound = lazy(() => import("./components/general/NotFound"));
const Login = lazy(() => import("./components/club/Login"));
import PrivateRoute from "./components/general/PrivateRoute";
const PanelAdmin = lazy(() => import("./components/club/PanelAdmin"));
const AvisoLegal = lazy(() => import("./components/politicas/AvisoLegal"));
const Cookies = lazy(() => import("./components/politicas/Cookies"));
const Privacidad = lazy(() => import("./components/politicas/Privacidad"));
const Accesibilidad = lazy(() => import("./components/politicas/Accesibilidad"));

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
      <Suspense fallback={<h1 className="cargando d-flex-col">Cargando...</h1>}>
      <AnimatePresence mode="wait">
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={renderPage(<Inicio />)}></Route>
            <Route path="/historia" element={renderPage(<Historia />)}></Route>
            <Route path="/blog" element={<Navigate to="/historia" replace />}></Route>
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
      </Suspense>
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
