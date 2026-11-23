import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';
import './Auth.css';                                    // CAMBIO

function Register() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        setMensaje('');
        setCargando(true);

        try {
            await apiRequest('/users', {
                method: 'POST',
                body: JSON.stringify({
                    nombre,
                    email,
                    password
                })
            });

            setMensaje('Usuario registrado correctamente');

            setTimeout(() => {
                navigate('/login');
            }, 1200);

        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">

                <span className="auth-tag">ÚNETE A MOBILESTORE</span>

                <h1 className="auth-title">Crear una cuenta</h1>

                <p className="auth-subtitle">
                    Regístrate para descubrir nuestra tienda.
                </p>

                <form onSubmit={handleRegister}>

                    <div className="auth-field">
                        <label className="auth-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="auth-input"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Introduce tu nombre"
                            required
                        />
                    </div>

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
                            minLength={12}
                            required
                        />

                        <span className="auth-hint">
                            Mínimo 12 caracteres
                        </span>
                    </div>

                    {error && (
                        <div className="auth-alert auth-alert-error">
                            {error}
                        </div>
                    )}

                    {mensaje && (
                        <div className="auth-alert auth-alert-success">
                            {mensaje}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={cargando}
                    >
                        {cargando ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>

            </div>
        </main>
    );
}

export default Register;