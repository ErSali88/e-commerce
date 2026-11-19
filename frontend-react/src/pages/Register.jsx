
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

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
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">
                            Crear una cuenta
                        </h2>

                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Introduce tu nombre"
                                    required
                                />
                            </div>

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
                                    placeholder="Mínimo 12 caracteres"
                                    minLength={12}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {mensaje && (
                                <div className="alert alert-success">
                                    {mensaje}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={cargando}
                            >
                                {cargando ? 'Registrando...' : 'Registrarse'}
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
