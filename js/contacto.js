const form = document.getElementById("formContacto");
const confirmacion = document.getElementById("confirmacion");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !mensaje) {
            confirmacion.textContent = "Por favor complete todos los campos.";
            confirmacion.style.color = "red";
            return;
        }

        confirmacion.textContent = `Gracias, ${nombre}. Tu mensaje ha sido enviado.`;
        confirmacion.style.color = "green";

        form.reset();
    });
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

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            sideMenu.classList.remove("abierto");
            overlay.classList.remove("visible");
        }
    });
}