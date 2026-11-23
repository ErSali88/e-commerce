import { Link, NavLink, Outlet } from 'react-router-dom';
import './App.css';                                     // CAMBIO

function App() {
    return (
        <div className="app-layout">

            {/* HEADER */}

            <header className="site-header">
                <div className="site-header-container">

                    <Link className="site-brand" to="/">
                        <span className="site-brand-icon">MS</span>
                        <span className="site-brand-text">MobileStore</span>
                    </Link>

                    <nav className="site-nav">
                        <NavLink
                            to="/"
                            end
                            className="site-nav-link"
                        >
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/login"
                            className="site-nav-link"
                        >
                            Iniciar sesión
                        </NavLink>

                        <NavLink
                            to="/register"
                            className="site-nav-button"
                        >
                            Registrarse
                        </NavLink>
                    </nav>

                </div>
            </header>


            {/* CONTENIDO DE CADA PÁGINA */}

            <div className="app-content">
                <Outlet />
            </div>


            {/* FOOTER */}

            <footer className="site-footer">

                <div className="site-footer-container">

                    <div className="site-footer-brand">
                        <Link className="site-brand" to="/">
                            <span className="site-brand-icon">MS</span>
                            <span>MobileStore</span>
                        </Link>

                        <p>
                            Tu tienda de confianza para encontrar
                            los mejores móviles.
                        </p>
                    </div>

                    <div className="site-footer-column">
                        <h4>Navegación</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                        </ul>
                    </div>

                    <div className="site-footer-column">
                        <h4>Tu cuenta</h4>
                        <ul>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="site-footer-bottom">
                    © {new Date().getFullYear()} MobileStore. Todos los derechos reservados.
                </div>

            </footer>

        </div>
    );
}

export default App;