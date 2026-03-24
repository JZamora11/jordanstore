// LocalStorage del carrito
let productosElegidos = JSON.parse(localStorage.getItem("carrito")) || [];

// Capturar los IDs importantes
const carritoProductos = document.getElementById("carrito-total");

const subtotal = document.getElementById("subtotal-resumen");
const envio = document.getElementById("envio-resumen");
const total = document.getElementById("total-pago");

// Renderizar los productos del carrito
function listaCarrito (productosCarrito) {
    const cajaResumen = document.getElementById("resumen-compra");
    const contenedorProductos = document.getElementById("carrito-total");
    const mensajeVacio = document.getElementById("contenedor-vacio");
    const btnVolver = document.getElementById("btn-volver");
    
    if (!productosCarrito[0]) {
        contenedorProductos.style.display = "none";
        cajaResumen.style.display = "none";
        btnVolver.style.display = "none";
        mensajeVacio.style.display = "block";
        
        mensajeVacio.innerHTML = `<div class="carrito-vacio">
                                        <img src="../assets/img/empty-cart.svg">
                                        <p>Parece que no has añadido nada a tu carrito.<br>Explora y elige tus Jordan favoritas.</p>
                                        <a href="../index.html">Volver a la página principal</a>
                                  </div>`;

        return;
    }
    
    contenedorProductos.style.display = "block";
    cajaResumen.style.display = "block";
    mensajeVacio.style.display = "none";

    contenedorProductos.innerHTML = "";

    productosCarrito.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `<img src="${producto.img}">

                             <div class="info-producto">
                                <div class="fila-superior">
                                    <h3 class="producto">${producto.nombre}</h3>
                                    <h4 class="precio">$${producto.precio}</h4>
                                </div>    
                                
                                <div class="fila-inferior">
                                    <div class="gestionar-cantidad">
                                        <button data-id=${producto.id} class="btn-cantidad btn-restar">-</button>
                                        <div class="info-cantidad">${producto.cantidad}</div>
                                        <button data-id=${producto.id} class="btn-cantidad btn-sumar">+</button>
                                    </div>

                                    <button data-id=${producto.id} class="btn-cantidad btn-eliminar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                        Eliminar
                                    </button>
                                </div>
                             </div>`
        carritoProductos.appendChild(tarjeta);
    });
}

// Calcular total en el resumen
function totalCarrito() {
    let sumaSubtotal = 0;
    let totalEnvio = 0;

    productosElegidos.forEach(producto => {
        sumaSubtotal += producto.precio * producto.cantidad;
    });

    if (sumaSubtotal === 0) {
        totalEnvio = 0;
    } else if (sumaSubtotal < 1500) {
        totalEnvio = 15;
    } else {
        totalEnvio = 0;
    }

    let textoEnvio;

    if (totalEnvio === 0) {
        textoEnvio = `<span class="texto-gratis">Gratis</span>`;
    } else {
        textoEnvio = `$${totalEnvio}`;
    }

    subtotal.innerHTML = `$${sumaSubtotal}`;
    envio.innerHTML = `${textoEnvio}`;
    total.innerHTML = `$${sumaSubtotal + totalEnvio}`;
}

// Gestionador de cantidad
carritoProductos.addEventListener('click', (event) => {
    const botonElegido = event.target.closest("button");
    if (!botonElegido) return;

    const idProducto = parseInt(botonElegido.getAttribute("data-id"));
    const productoElegido = productosElegidos.find(producto => producto.id === idProducto);

    if (botonElegido.classList.contains("btn-sumar")) {
        productoElegido.cantidad++;
    } else if (botonElegido.classList.contains("btn-restar")) {
        if (productoElegido.cantidad > 1) {
            productoElegido.cantidad--;
        }
    } else if (botonElegido.classList.contains("btn-eliminar")) {
        productosElegidos = productosElegidos.filter(producto => producto.id !== idProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(productosElegidos));
    listaCarrito(productosElegidos);
    totalCarrito();
})

// Llamada a las funciones
listaCarrito(productosElegidos);
totalCarrito();