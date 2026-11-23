import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';
import './Auth.css';                                    // CAMBIO

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
        <main className="auth-page">
            <div className="auth-card">

                <span className="auth-tag">MOBILESTORE · ACCESO</span>

                <h1 className="auth-title">Iniciar sesión</h1>

                <p className="auth-subtitle">
                    Accede a tu cuenta para continuar.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="auth-field">
                        <label className="auth-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Introduce tu email"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Introduce tu contraseña"
                            required
                        />
                    </div>

                    {error && (
                        <div className="auth-alert auth-alert-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={cargando}
                    >
                        {cargando ? 'Entrando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Todavía no tienes cuenta?{' '}
                    <Link to="/register">
                        Regístrate
                    </Link>
                </p>

            </div>
        </main>
    );
}

export default Login;