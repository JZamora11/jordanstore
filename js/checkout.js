// LocalStorage del checkout
let productosCheckout = JSON.parse(localStorage.getItem("carrito")) || [];

if (!productosCheckout[0]) {
    window.location.href = "../index.html"
}

// Captura de los IDs
const subtotal = document.getElementById("subtotal-resumen");
const envio = document.getElementById("envio-resumen");
const total = document.getElementById("total-pago");
const contenedorResumen = document.getElementById("lista-productos-checkout");

// Función del resumen
function resumenCompra(sumaResumen) {
    contenedorResumen.innerHTML = "";
    
    let sumaSubtotal = 0;
    let totalEnvio = 0;
    
    sumaResumen.forEach(producto => {
        const imgPath = `../${producto.img}`;
        
        contenedorResumen.innerHTML += `<div class="item-resumen">
                                            <img src="${imgPath}" alt="${producto.nombre}">
                                            <div>
                                                <p>${producto.nombre}</p>
                                                <span>Cantidad: ${producto.cantidad}</span>
                                            </div>
                                        </div>`;

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

// Formulario
const formulario = document.getElementById("formulario");

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nombreCliente = document.getElementById("nombre").value;
    const telefonoCliente = document.getElementById("tel").value;
    const correoCliente = document.getElementById("email").value;
    const direccionCliente = document.getElementById("direccion").value;
    const ciudadCliente = document.getElementById("ciudad").value;
    const numTarjetaCliente = document.getElementById("tarjeta").value;
    const fechaExpiracion = document.getElementById("expiracion").value;
    const cvvCliente = document.getElementById("cvv").value;

    const botonPagar = document.getElementById("btn-pagar");

    botonPagar.innerText = "Procesando...";

    setTimeout(() => {
        const datosPago = {
            nombre: nombreCliente,
            telefono: telefonoCliente,
            correo: correoCliente,
            direccion: direccionCliente,
            ciudad: ciudadCliente,
            tarjeta: numTarjetaCliente,
            expiracion: fechaExpiracion,
            cvv: cvvCliente,
            subtotal: subtotal.innerText,
            envio: envio.innerText,
            totalProducto: total.innerText,
            productos: productosCheckout
        }

        localStorage.setItem("orden", JSON.stringify(datosPago));
        localStorage.removeItem("carrito");

        window.location.href = "./compra-realizada.html";
    }, 3000)
});

// Restricciones del formulario
const inputNombre = document.getElementById("nombre");
const inputTel = document.getElementById("tel");
const inputTarjeta = document.getElementById("tarjeta");
const inputExpiracion = document.getElementById("expiracion");
const inputCvv = document.getElementById("cvv");

inputNombre.addEventListener('input', () => {
    inputNombre.value = inputNombre.value.replace(/[^a-zA-Z ]/g, "");
});

inputTel.addEventListener('input', () => {
    let valor = inputTel.value.replace(/\D/g, "");

    if (valor.length > 6) {
        inputTel.value = `${valor.slice(0, 3)} ${valor.slice(3, 6)} ${valor.slice(6, 10)}`;
    } else if (valor.length > 3) {
        inputTel.value = `${valor.slice(0, 3)} ${valor.slice(3, 6)}`;
    } else {
        inputTel.value = valor;
    }
});

inputTarjeta.addEventListener('input', () => {
    let valor = inputTarjeta.value.replace(/\D/g, "");

    inputTarjeta.value = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
});

inputExpiracion.addEventListener('input', () => {
    let valor = inputExpiracion.value.replace(/\D/g, "");

    if (valor.length > 2) {
        inputExpiracion.value = valor.slice(0, 2) + "/" + valor.slice(2, 4);
    } else {
        inputExpiracion.value = valor;
    }
});

inputCvv.addEventListener('input', () => {
    inputCvv.value = inputCvv.value.replace(/\D/g, "");
});

// Llamada a la función
resumenCompra(productosCheckout);