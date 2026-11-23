//elementos del menú 
const navLinks = document.querySelectorAll(".nav-link[data-view]");

//navegación entre  vistas
navLinks.forEach(link=>{
    link.addEventListener("click", (event)=>{
        event.preventDefault();

        //obtener información de la vista
        const view  = link.dataset.view;
        const title = link.querySelector("span").textContent;

        //cargar la vista
        loadView(view, title);

        //actualizar enlace activo
        navLinks.forEach(nav=>nav.classList.remove("active"));
        link.classList.add("active");
    });
});

//cargar dashboard al iniciar
loadView("dashboard", "Dashboard");