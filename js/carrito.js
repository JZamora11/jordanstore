const carritoProductos = document.getElementById("carrito-total");
let productosElegidos = JSON.parse(localStorage.getItem("carrito")) || [];

function listaCarrito (productosCarrito) {
    productosCarrito.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `<div>
                                <img src="${producto.img}">
                             </div>

                             <h4 class="producto">${producto.nombre}</h4>
                             <p class="precio">Cantidad: ${producto.cantidad}</p>
                             <button data-id=${producto.id} class="btn-carrito btn-quitar">Quitar producto</button>`
        carritoProductos.appendChild(tarjeta);
    })
}

listaCarrito(productosElegidos);
quitarProducto();

let sumaTotal = document.getElementById("total-carrito");

function totalCarrito () {
    const precioFinal = productosElegidos.reduce((sumaFinal, producto) => {
        const subtotalProducto = producto.precio * producto.cantidad;

        return sumaFinal + subtotalProducto;
    }, 0);

    sumaTotal.innerHTML = `Total a pagar: <span>$${precioFinal}</span>`;
}

totalCarrito();

function quitarProducto() {
    const botonesQuitar = document.querySelectorAll(".btn-quitar");
    botonesQuitar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = Number(boton.dataset.id);
            const producto = productosElegidos.find(producto => producto.id === idProducto);
            producto.cantidad--;

            if(producto.cantidad === 0){
                productosElegidos = productosElegidos.filter(producto => producto.id !== idProducto);
            }

            localStorage.setItem("carrito", JSON.stringify(productosElegidos));
            carritoProductos.innerHTML = "";
            listaCarrito(productosElegidos);
            totalCarrito();
            quitarProducto();
        })
    })
}

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