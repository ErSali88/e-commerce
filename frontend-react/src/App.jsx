
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        MobileStore
                    </Link>

                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>

                        <Link className="nav-link" to="/login">
                            Iniciar sesión
                        </Link>

                        <Link className="nav-link" to="/register">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </nav>

            <Outlet />

            <footer className="bg-dark text-white text-center py-4">
                <div className="container">
                    <h5 className="fw-bold">MobileStore</h5>

                    <p className="mb-0 text-secondary">
                        Tu tienda de confianza para encontrar los mejores móviles.
                    </p>

                    <small className="text-secondary">
                        © 2026 MobileStore. Todos los derechos reservados.
                    </small>
                </div>
            </footer>
        </>
    );
}

export default App;
