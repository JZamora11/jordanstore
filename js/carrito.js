const carritoProductos = document.getElementById("carrito-total");
let productosElegidos = JSON.parse(localStorage.getItem("carrito")) || [];

function listaCarrito (productosCarrito) {
    productosCarrito.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `<div class="div-img">
                                <img src="${producto.img}">
                             </div>

                             <h4 class="producto">${producto.nombre}</h4>
                             <p class="precio">Cantidad: ${producto.cantidad}</p>

                             <div class="contenedor-buttons">
                                <button data-id=${producto.id} class="btn-small btn-restar">-</button>
                                <button data-id=${producto.id} class="btn-big btn-quitar">Quitar producto</button>
                                <button data-id=${producto.id} class="btn-small btn-sumar">+</button>
                             </div>`
        carritoProductos.appendChild(tarjeta);
    })
}

listaCarrito(productosElegidos);

let sumaTotal = document.getElementById("total-carrito");

function totalCarrito () {
    const precioFinal = productosElegidos.reduce((sumaFinal, producto) => {
        const subtotalProducto = producto.precio * producto.cantidad;

        return sumaFinal + subtotalProducto;
    }, 0);

    sumaTotal.innerHTML = `Total a pagar: <span>$${precioFinal}</span>`;
}

totalCarrito();

carritoProductos.addEventListener('click', (event) => {
    const id = parseInt(event.target.getAttribute("data-id"));
    if (!id) return;

    const producto = productosElegidos.find(producto => producto.id === id);

    if (event.target.classList.contains("btn-restar")) {
        producto.cantidad--;
    } else if (event.target.classList.contains("btn-quitar")) {
        producto.cantidad = 0;
    } else if (event.target.classList.contains("btn-sumar")) {
        producto.cantidad++;
    }

    if (producto.cantidad <= 0) {
        productosElegidos = productosElegidos.filter(producto => producto.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(productosElegidos));
    carritoProductos.innerHTML = "";
    listaCarrito(productosElegidos);
    totalCarrito();
});

let vaciarCarrito = document.getElementById("vaciarCarrito");

function vaciar() {
    vaciarCarrito.addEventListener("click", () => {
        productosElegidos = [];
        localStorage.removeItem("carrito");
        sumaTotal.innerHTML = `Total a pagar: <span>$0</span>`;
        carritoProductos.innerHTML = `<div class="carrito-limpio">No hay productos en el carrito</div>`;
    })
}

vaciar();