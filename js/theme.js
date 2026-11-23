//obtener el botón de cambio de tema
const themeToggle = document.getElementById("themeToggle");

//obtener el tema guardado
const savedTheme = localStorage.getItem("theme");

//obtener el tema actual
const currentTheme = savedTheme || "dark";

//aplicar el tema guardado
document.documentElement.setAttribute("data-theme", currentTheme);

//controlar el estado de la transición
let isTransitioning = false;

//actualizar icono del botón 
function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === "dark"
        ? '<i data-lucide="moon"></i>'
        : '<i data-lucide="sun"></i>'

    //actualizar iconos de lucide
    lucide.createIcons();
}

//inicializar icono
updateThemeIcon(currentTheme);

//cambiart tema
themeToggle.addEventListener("click", () => {
    //evitar transiciones simultáneas
    if (isTransitioning) return;

    //indicar que comenzó la transición
    isTransitioning = true;

    //obtener tema actual
    const currentTheme = document.documentElement.getAttribute("data-theme");

    //determinar el nuevo tema
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    //determinar la dirección de la onda
    const transitionDirection = newTheme === "light" ? "to-light" : "to-dark";

    //comprobar si el navegador adminite View Transitions
    if (!document.startViewTransition) {
        //aplicar el tema directamente si no hay soporte
        document.documentElement.setAttribute("data-theme", newTheme);

        //guardar la preferencia
        localStorage.setItem("theme", newTheme);

        //actualizar icono
        updateThemeIcon(newTheme);

        isTransitioning = false;
        return;
    }

    //iniciar transición
    const transition = document.startViewTransition(() => {
        //establecer dirección de la onda
        document.documentElement.setAttribute("data-transition", transitionDirection);

        //actualizar tema
        document.documentElement.setAttribute("data-theme", newTheme);

        //guardar la preferencia
        localStorage.setItem("theme", newTheme);

        //actualizar icono
        updateThemeIcon(newTheme);
    });

    //esperar a que el navegador prepare la transición
    transition.ready.then(() => {
        //obtener la animación correspondiente
        const animationId = newTheme === "light"
            ? "wave-down-animation"
            : "wave-up-animation";

        const waveAnimation = document.getElementById(animationId);

        //iniciar la animación SVG
        if (waveAnimation) {
            console.log("Duración:", waveAnimation.getAttribute("dur"));
            console.log("Animación:", waveAnimation);
            
            waveAnimation.beginElement();
        }
    }).catch((error) => {
        console.error("Error al iniciar la onda:", error);
    });

    //esperar a que termine la transición
    transition.finished.then(() => {
        //eliminar dirección de la transición
        document.documentElement.removeAttribute("data-transition");

        //habilitar nuevamente el botón
        isTransitioning = false;
    }, () => {
        //limpiar si la transición se interrumpe
        document.documentElement.removeAttribute("data-transition");
        isTransitioning = false;
    });
});