
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
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

            <footer className="bg-dark text-white text-center p-3 mt-5">
                <p className="mb-0">
                    © 2026 MobileStore - Tienda de móviles
                </p>
            </footer>
        </>
    );
}

export default App;