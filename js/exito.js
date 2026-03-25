// LocalStorage de la compra
const ordenFinal = JSON.parse(localStorage.getItem("orden"));

if (!ordenFinal) {
    window.location.href = "../index.html"
}

// Captura de IDs
const nombreCliente = document.getElementById("nombreCliente");
const telefonoCliente = document.getElementById("telefonoCliente");
const correoCliente = document.getElementById("correoCliente");
const direccionCliente = document.getElementById("direccionCliente");
const ciudadCliente = document.getElementById("ciudadCliente");
const tarjetaCliente = document.getElementById("tarjetaCliente");
const expiracionCliente = document.getElementById("expiracionCliente");
const cvvCliente = document.getElementById("cvvCliente");
const subtotal = document.getElementById("subtotal-resumen");
const envio = document.getElementById("envio-resumen");
const totalProducto = document.getElementById("total-pago");
const resumenProductos = document.getElementById("lista-productos-checkout");
const imgPath = `../${producto.img}`;

// Renderizado de datos del cliente
function datosOrden() {
    nombreCliente.innerText = ordenFinal.nombre;
    telefonoCliente.innerText = ordenFinal.telefono;
    correoCliente.innerText = ordenFinal.correo;
    direccionCliente.innerText = ordenFinal.direccion;
    ciudadCliente.innerText = ordenFinal.ciudad;
    tarjetaCliente.innerText = ordenFinal.tarjeta;
    expiracionCliente.innerText = ordenFinal.expiracion;
    cvvCliente.innerText = ordenFinal.cvv;
    subtotal.innerText = ordenFinal.subtotal;
    envio.innerText = ordenFinal.envio;
    totalProducto.innerText = ordenFinal.totalProducto;

    resumenProductos.innerHTML = "";

    ordenFinal.productos.forEach((producto) => {
        resumenProductos.innerHTML += `<div class="item-resumen">
                                            <img src="${imgPath}" alt="${producto.nombre}">
                                            <div>
                                                <p>${producto.nombre}</p>
                                                <span>Cantidad: ${producto.cantidad}</span>
                                            </div>
                                        </div>`;
    })
}

// Llamada a la función
datosOrden()