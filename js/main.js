// Lista de productos
const productos = [
    {id: 1, nombre: "Air Jordan 5 'Fire Red'", precio: 300, img: "../assets/img/air-jordan-5-fire-red.webp", cantidad: 0},
    {id: 2, nombre: "Air Jordan 3 'Black Cement'", precio: 200, img: "../assets/img/air-jordan-3-black-cement.webp", cantidad: 0},
    {id: 3, nombre: "Air Jordan 1 'Chicago'", precio: 350, img: "../assets/img/air-jordan-1-chicago.webp", cantidad: 0},
    {id: 4, nombre: "Air Jordan 12 'Flu Game'", precio: 400, img: "../assets/img/air-jordan-12-flu-game.webp", cantidad: 0},
    {id: 5, nombre: "Air Jordan 4 'White Oreo'", precio: 100, img: "../assets/img/air-jordan-4-white-oreo.webp", cantidad: 0},
    {id: 6, nombre: "Air Jordan 1 'Travis Scott'", precio: 600, img: "../assets/img/air-jordan-1-travis-scott.webp", cantidad: 0},
    {id: 7, nombre: "Air Jordan 6 'Infrared'", precio: 200, img: "../assets/img/air-jordan-6-infrared.webp", cantidad: 0},
    {id: 8, nombre: "Air Jordan 11 'Space Jam'", precio: 300, img: "../assets/img/air-jordan-11-space-jam.webp", cantidad: 0},
    {id: 9, nombre: "Air Jordan 3 'White Cement'", precio: 250, img: "../assets/img/air-jordan-3-white-cement.webp", cantidad: 0},
    {id: 10, nombre: "Air Jordan 1 'Bred'", precio: 450, img: "../assets/img/air-jordan-1-bred.webp", cantidad: 0},
    {id: 11, nombre: "Air Jordan 11 'Concord'", precio: 700, img: "../assets/img/air-jordan-11-concord.webp", cantidad: 0},
    {id: 12, nombre: "Air Jordan 4 'Black Cat'", precio: 500, img: "../assets/img/air-jordan-4-black-cat.webp", cantidad: 0},
];

const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

function sumaGuardada() {
    const sumaBolsa = productosCarrito.reduce((suma, producto) => suma + producto.cantidad, 0);
    contadorCarrito.innerHTML = sumaBolsa;
}

const contenedorProductos = document.getElementById("container");

function listaProductos(arrayProductos) {
    arrayProductos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `<div>
                                <img src="${producto.img}">
                             </div>

                             <h4 class="producto">${producto.nombre}</h4>
                             <p class="precio">$${producto.precio}</p>
                             <button data-id=${producto.id} class="btn-carrito">Agregar al carrito</button>`
        contenedorProductos.appendChild(tarjeta);
    })
}

listaProductos(productos);

const botonesAgregar = document.querySelectorAll(".btn-carrito");
let contadorCarrito = document.getElementById("contador-carrito");

function agregarCarrito () {
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);
            const buscarProducto = productos.find(producto => producto.id === idProducto);

            if (productosCarrito.find(productoCarrrito => productoCarrrito.id === idProducto)) {
                buscarProducto.cantidad += 1;
            } else {
                buscarProducto.cantidad = 1;
                productosCarrito.push(buscarProducto);
            }

            const sumaCarrito = productosCarrito.reduce((suma, producto) => suma + producto.cantidad, 0)
            contadorCarrito.innerHTML = sumaCarrito;

            localStorage.setItem("carrito", JSON.stringify(productosCarrito));
        })
    })
}

agregarCarrito();
sumaGuardada();