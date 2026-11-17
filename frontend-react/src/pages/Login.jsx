
function Login() {
    return (
        <main className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="mb-4">Iniciar sesión</h2>

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Introduce tu email"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Introduce tu contraseña"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
