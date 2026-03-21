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

        Toastify({
            text: "Producto agregado al carrito",
            gravity: "bottom",
            duration: 3000,
            style: {
                background: "#9C192B",
                borderRadius: "8px",
                fontSize: "14px",
            },
        }).showToast();

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

// Filtros
const filtroModelo = document.getElementById("modelos");
const filtroPrecio = document.getElementById("ordenPrecio");
const buscador = document.getElementById("buscar");

function aplicarFiltros() {
    const modelo = filtroModelo.value;
    const precio = filtroPrecio.value;
    const texto = buscador.value.toLowerCase();
    
    let listaFiltrada = productos.slice();
    
    listaFiltrada = listaFiltrada.filter(producto => producto.nombre.toLowerCase().includes(texto));

    if (modelo !== "all") {
        listaFiltrada = listaFiltrada.filter(producto => producto.modelo === modelo)
    }
    
    if (precio === "menor-precio") {
        listaFiltrada = listaFiltrada.sort((a, b) => a.precio - b.precio);
    } else if (precio === "mayor-precio") {
        listaFiltrada = listaFiltrada.sort((a, b) => b.precio - a.precio);
    }

    contenedorProductos.innerHTML = "";
    listaProductos(listaFiltrada);
}

filtroModelo.addEventListener('change', aplicarFiltros);
filtroPrecio.addEventListener('change', aplicarFiltros);
buscador.addEventListener('input', aplicarFiltros);