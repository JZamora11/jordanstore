const URL = "./db/data.json";
let productos = [];

// Fetch del JSON
function obtenerProductos() {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        productos = data;
        listaProductos(data);
    })
}

// 
const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 
function sumaGuardada() {
    const sumaBolsa = productosCarrito.reduce((suma, producto) => suma + producto.cantidad, 0);
    contadorCarrito.innerHTML = sumaBolsa;
}

const contenedorProductos = document.getElementById("container");

// 
function listaProductos(arrayProductos) {
    arrayProductos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `<div class="div-img">
                                <img src="${producto.img}">
                             </div>

                             <h4 class="producto">${producto.nombre}</h4>
                             <p class="precio">$${producto.precio}</p>
                             <button data-id=${producto.id} class="btn-carrito">Agregar al carrito</button>`
        contenedorProductos.appendChild(tarjeta);
    })
}

let contadorCarrito = document.getElementById("contador-carrito");

// 
contenedorProductos.addEventListener('click', (event) => {
    if (event.target.classList.contains("btn-carrito")) {
        const idProducto = parseInt(event.target.getAttribute("data-id"));
        const productoBase = productos.find(producto => producto.id === idProducto);
        gestionarCarrito(productoBase);
    }
})

// 
function gestionarCarrito(producto) {
    const enCarrito = productosCarrito.find(item => item.id === producto.id);
    
    if (enCarrito) {
        enCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        productosCarrito.push(producto);
    }
    
    sumaGuardada();
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}

obtenerProductos();
sumaGuardada();

const buscador = document.getElementById("buscar");

// Filtro por modelo


// Buscador de productos
buscador.addEventListener('input', (event) => {
    const digitado = event.target.value.toLowerCase();
    const productosBuscados = productos.filter(producto => producto.nombre.toLowerCase().includes(digitado));

    contenedorProductos.innerHTML = "";
    listaProductos(productosBuscados);
})