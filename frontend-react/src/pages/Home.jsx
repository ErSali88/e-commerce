import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    // Productos destacados de nuestra tienda
    const productos = [
        {
            id: 1,
            nombre: 'iPhone 16',
            marca: 'Apple',
            descripcion: '128 GB · Negro',
            precio: '899 €',
            imagen: '/images/iphone-16.png',
            etiqueta: 'Destacado'
        },
        {
            id: 2,
            nombre: 'Samsung Galaxy S25',
            marca: 'Samsung',
            descripcion: '256 GB · Gris oscuro',
            precio: '849 €',
            imagen: '/images/samsung-s25.png',
            etiqueta: 'Novedad'
        },
        {
            id: 3,
            nombre: 'Xiaomi 15',
            marca: 'Xiaomi',
            descripcion: '256 GB · Gris oscuro',
            precio: '800 €',
            imagen: '/images/xiaomi-15.png',
            etiqueta: 'Novedad'
        }
    ];

    return (
        <div className="home-page">

            {/* BANNER PRINCIPAL */}

            <section className="hero-section">
                <div className="hero-container">

                    <div className="hero-content">

                        <span className="hero-tag">
                            MOBILESTORE · TECNOLOGÍA
                        </span>

                        <h1>
                            La tecnología que
                            <span> te mueve.</span>
                        </h1>

                        <p>
                            Descubre los últimos smartphones de las
                            mejores marcas. Encuentra el dispositivo
                            perfecto para ti.
                        </p>

                        <a href="#productos" className="hero-button">
                            Descubrir productos
                            <span>→</span>
                        </a>

                        <div className="hero-features">
                            <div>
                                <strong>Últimos</strong>
                                <span>lanzamientos</span>
                            </div>

                            <div>
                                <strong>Grandes</strong>
                                <span>marcas</span>
                            </div>

                            <div>
                                <strong>Calidad</strong>
                                <span>garantizada</span>
                            </div>
                        </div>

                    </div>

                    <div className="hero-image-container">
                        <img
                            src="/images/iphone-16.png"
                            alt="iPhone 16 visto desde delante y detrás"
                            className="hero-image"
                        />

                        <div className="hero-image-label">
                            <span>APPLE</span>
                            <strong>iPhone 16</strong>
                        </div>
                    </div>

                </div>
            </section>


            {/* PRODUCTOS DESTACADOS */}

            <main className="products-section" id="productos">

                <div className="products-heading">

                    <div>
                        <span className="section-label">
                            NUESTRA SELECCIÓN
                        </span>

                        <h2>Productos destacados</h2>

                        <p>
                            Descubre algunos de nuestros smartphones.
                        </p>
                    </div>

                    <span className="products-count">
                        {productos.length} productos
                    </span>

                </div>


                <div className="products-grid">

                    {productos.map((producto) => (

                        <article
                            className="product-card"
                            key={producto.id}
                        >

                            <div className="product-image-container">

                                <span className="product-tag">
                                    {producto.etiqueta}
                                </span>

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="product-image"
                                />

                            </div>


                            <div className="product-information">

                                <span className="product-brand">
                                    {producto.marca}
                                </span>

                                <h3>{producto.nombre}</h3>

                                <p className="product-description">
                                    {producto.descripcion}
                                </p>

                                <div className="product-bottom">

                                    <div>
                                        <span className="price-label">
                                            Precio
                                        </span>

                                        <strong className="product-price">
                                            {producto.precio}
                                        </strong>
                                    </div>

                                    <Link
                                        to="/login"
                                        className="product-button"
                                    >
                                        Ver más →
                                    </Link>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </main>


            {/* BANNER DE REGISTRO */}

            <section className="register-banner">

                <div className="register-banner-content">

                    <span>ÚNETE A MOBILESTORE</span>

                    <h2>
                        Tu próxima experiencia
                        <br />
                        tecnológica empieza aquí.
                    </h2>

                    <p>
                        Crea tu cuenta y descubre nuestra tienda.
                    </p>

                    <Link
                        to="/register"
                        className="register-banner-button"
                    >
                        Crear una cuenta →
                    </Link>

                </div>

                <div className="register-banner-decoration">
                    MS
                </div>

            </section>

        </div>
    );
}

export default Home;