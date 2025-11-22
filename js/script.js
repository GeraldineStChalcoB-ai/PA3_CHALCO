class Producto {
    constructor(nombre, precio, imagen, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.tipo = tipo;
    }

    descripcion() {
        return `${this.nombre} - S/. ${this.precio}`;
    }
}

class ProductoEspecial extends Producto {
    descripcion() {
        return `Producto Premium: ${this.nombre} - S/. ${this.precio}`;
    }
}

// MAP DE PRODUCTOS
const productos = new Map();
productos.set(1, new Producto("Palo Santo Natural", 12, "img/PaloSanto.JPEG", "aroma"));
productos.set(2, new Producto("Incienso Palo Santo", 18, "img/incienso.JPEG", "relax"));
productos.set(3, new ProductoEspecial("Combo Palo Santo + Velas", 25, "img/combo.JPEG", "premium"));

// RENDERIZA PRODUCTOS
const contenedor = document.getElementById("contenedorProductos");

if (contenedor) {
    for (const [id, prod] of productos) {
        const div = document.createElement("div");
        div.className = "producto";

        let tipoTexto;
        switch (prod.tipo) {
            case "aroma": tipoTexto = "Aromático"; break;
            case "relax": tipoTexto = "Relajante"; break;
            case "premium": tipoTexto = "Premium"; break;
        }

        div.innerHTML = `
            <img src="${prod.imagen}">
            <h4>${prod.nombre}</h4>
            <p>${tipoTexto}</p>
            <p>S/. ${prod.precio}</p>
            <button data-id="${id}">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    }
}

// CARRITO
let carrito = [];

const actualizarContador = () => {
    const contador = document.getElementById("contadorCarrito");
    if (contador) contador.textContent = carrito.length;
};

// Calcula el total 
const calcularTotal = (i = 0) =>
    i >= carrito.length ? 0 : carrito[i].precio + calcularTotal(i + 1);

// Agrega producto al carrito
if (contenedor) {
    contenedor.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = e.target.dataset.id;
            carrito.push(productos.get(Number(id)));
            actualizarContador();
        }
    });
}

const btnCarrito = document.getElementById("btnCarrito");
const modalCarrito = document.getElementById("modalCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

// Muestra carrito 
if (btnCarrito && modalCarrito && cerrarCarrito) {

    btnCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "block";
        mostrarCarrito();
    });

    cerrarCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "none";
    });
// Elimina carrito
    function mostrarCarrito() {
        const lista = document.getElementById("listaCarrito");
        lista.innerHTML = "";

        carrito.forEach((prod, index) => {
            const li = document.createElement("li");
            li.textContent = prod.descripcion();

            // Botón de eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "X";
            btnEliminar.className = "btn-eliminar";

            btnEliminar.addEventListener("click", () => {
                carrito.splice(index, 1); 
                actualizarContador();
                mostrarCarrito(); 
            });

            li.appendChild(btnEliminar);
            lista.appendChild(li);
        });

        document.getElementById("total").textContent = `Total: S/. ${calcularTotal()}`;
    }
}

// Menu deslizante
const menuBtn = document.getElementById("menu-btn"); 
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

if (menuBtn && sideMenu && overlay) {
    menuBtn.addEventListener("click", () => {
        sideMenu.classList.add("abierto");
        overlay.classList.add("visible");
    });

    overlay.addEventListener("click", () => {
        sideMenu.classList.remove("abierto");
        overlay.classList.remove("visible");
    });
}