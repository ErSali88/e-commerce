
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');
        setCargando(true);

        try {
            const respuesta = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const tokens = respuesta.data;

            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            navigate('/');

        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">
                            Iniciar sesión
                        </h2>

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Correo electrónico
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Introduce tu email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Introduce tu contraseña"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={cargando}
                            >
                                {cargando ? 'Entrando...' : 'Iniciar sesión'}
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0">
                            ¿Todavía no tienes cuenta?{' '}
                            <Link to="/register">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
