/*!
* Start Bootstrap - One Page Wonder v6.0.6 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// CARRO DE COMPRAS

let productosEnCarrito = JSON.parse(localStorage.getItem("carritoAromaStudio")) || [];

const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const buscadorProductos = document.getElementById("buscar-producto");
function guardarCarrito() {
    localStorage.setItem("carritoAromaStudio", JSON.stringify(productosEnCarrito));
}
// Agregar productos al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {

        const nombre = this.dataset.nombre;
        const precio = Number(this.dataset.precio);

        productosEnCarrito.push({
            nombre: nombre,
            precio: precio
        });
        guardarCarrito();
        mostrarCarrito();
        
    });
});



// Mostrar los productos y calcular el total
    
    
function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;

    productosEnCarrito.forEach((producto, indice) => {

        const elemento = document.createElement("li");

        elemento.textContent =
            producto.nombre + " - $" +
            producto.precio.toLocaleString("es-AR") + " ";

        // Botón para eliminar
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-eliminar");

        botonEliminar.addEventListener("click", function() {
            productosEnCarrito.splice(indice, 1);
            guardarCarrito();
            mostrarCarrito();
        });

        elemento.appendChild(botonEliminar);
        listaCarrito.appendChild(elemento);

        total += producto.precio;
    });

    // Mostrar el total
    totalCarrito.textContent = total.toLocaleString("es-AR");

    // Actualizar contador del menú
    contadorCarrito.textContent = productosEnCarrito.length;
}

// BUSCADOR DE PRODUCTOS

buscadorProductos.addEventListener("input", function() {

    const busqueda = buscadorProductos.value.toLowerCase();

    const productos = document.querySelectorAll("#productos .col-lg-4");

    productos.forEach(producto => {

        const nombre = producto.querySelector(".card-title").textContent.toLowerCase();

        if (nombre.includes(busqueda)) {
            producto.style.display = "";
        } else {
            producto.style.display = "none";
        }

    });

});

mostrarCarrito();