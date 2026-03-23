// LocalStorage del checkout
let productosCheckout = JSON.parse(localStorage.getItem("carrito")) || [];

if (!productosCheckout[0]) {
    window.location.href = "../index.html"
}

// Captura de los IDs
const subtotal = document.getElementById("subtotal-resumen");
const envio = document.getElementById("envio-resumen");
const total = document.getElementById("total-pago");

// Función del resumen
function resumenCompra(sumaResumen) {
    let sumaSubtotal = 0;
    let totalEnvio = 0;

    sumaResumen.forEach(producto => {
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

// Llamada a las funciones
resumenCompra(productosCheckout);