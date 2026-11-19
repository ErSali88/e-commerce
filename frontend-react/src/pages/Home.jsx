
import { Link } from 'react-router-dom';

function Home() {
    const productos = [
        {
            nombre: 'iPhone 16',
            descripcion: 'Apple · 128 GB',
            precio: '899 €',
            imagen: 'https://placehold.co/600x400?text=iPhone+16'
        },
        {
            nombre: 'Samsung Galaxy S25',
            descripcion: 'Samsung · 256 GB',
            precio: '849 €',
            imagen: 'https://placehold.co/600x400?text=Galaxy+S25'
        },
        {
            nombre: 'Xiaomi 15',
            descripcion: 'Xiaomi · 256 GB',
            precio: '699 €',
            imagen: 'https://placehold.co/600x400?text=Xiaomi+15'
        }
    ];

    return (
        <>
            <section className="bg-dark text-white py-5">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <span className="badge bg-primary mb-3">
                                Tecnología a tu alcance
                            </span>

                            <h1 className="display-4 fw-bold">
                                Encuentra tu próximo móvil
                            </h1>

                            <p className="lead text-light">
                                Descubre las últimas novedades en
                                smartphones al mejor precio.
                            </p>

                            <a href="#productos" className="btn btn-primary btn-lg mt-2">
                                Ver productos
                            </a>
                        </div>

                        <div className="col-md-5 text-center mt-4 mt-md-0">
                            <img
                                src="https://placehold.co/500x350?text=MobileStore"
                                alt="Móviles destacados"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="container py-5" id="productos">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            Productos destacados
                        </h2>

                        <p className="text-secondary mb-0">
                            Una selección de nuestros móviles
                        </p>
                    </div>
                </div>

                <div className="row">
                    {productos.map((producto, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card h-100 border-0 shadow-sm">
                                <img
                                    src={producto.imagen}
                                    className="card-img-top p-3"
                                    alt={producto.nombre}
                                />

                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {producto.nombre}
                                    </h5>

                                    <p className="text-secondary">
                                        {producto.descripcion}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-primary fw-bold mb-0">
                                            {producto.precio}
                                        </h5>

                                        <button className="btn btn-outline-primary">
                                            Ver producto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="bg-light rounded p-4 text-center mt-4">
                    <h3 className="fw-bold">
                        ¿Todavía no tienes una cuenta?
                    </h3>

                    <p className="text-secondary">
                        Regístrate para empezar a disfrutar de nuestra tienda.
                    </p>

                    <Link to="/register" className="btn btn-primary">
                        Crear cuenta
                    </Link>
                </section>
            </main>
        </>
    );
}

export default Home;
