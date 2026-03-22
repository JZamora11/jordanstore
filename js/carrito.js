let productosElegidos = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoProductos = document.getElementById("carrito-total");

function listaCarrito (productosCarrito) {
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

                                    <button class="btn-eliminar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                        Eliminar
                                    </button>
                                </div>
                             </div>`
        carritoProductos.appendChild(tarjeta);
    })
}

listaCarrito(productosElegidos);

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