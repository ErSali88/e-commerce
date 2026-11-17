
function Home() {
    const productos = [
        {
            nombre: 'iPhone 16',
            precio: '899 €',
            imagen: 'https://placehold.co/300x200?text=iPhone+16'
        },
        {
            nombre: 'Samsung Galaxy S25',
            precio: '849 €',
            imagen: 'https://placehold.co/300x200?text=Samsung+S25'
        },
        {
            nombre: 'Xiaomi 15',
            precio: '699 €',
            imagen: 'https://placehold.co/300x200?text=Xiaomi+15'
        }
    ];

    return (
        <main className="container mt-4">
            <section className="text-center p-5 bg-light rounded mb-4">
                <h1>Bienvenido a nuestra tienda</h1>
                <p>Descubre los mejores móviles al mejor precio.</p>
            </section>

            <h2 className="mb-4">Productos destacados</h2>

            <div className="row">
                {productos.map((producto, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <img
                                src={producto.imagen}
                                className="card-img-top"
                                alt={producto.nombre}
                            />

                            <div className="card-body">
                                <h5 className="card-title">
                                    {producto.nombre}
                                </h5>

                                <p className="card-text">
                                    {producto.precio}
                                </p>

                                <button className="btn btn-primary">
                                    Ver producto
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Home;
