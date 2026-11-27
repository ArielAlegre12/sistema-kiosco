//obtener elementos del sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

//detectar si estamos en el celular
function isMobile(){
    return window.innerWidth <= 767;
}

//abrir sidebar en celular
function openSidebar(){
    sidebar.classList.add("sidebar-open");
    sidebarOverlay.classList.add("active");

    //bloquear scroll de la página
    document.body.classList.add("sidebar-open");

    //actualizar estado del botón
    sidebarToggle.setAttribute("aria-expanded", "true");
}

//cerrar el sidebar en celular
function closeSidebar(){
    sidebar.classList.remove("sidebar-open");
    sidebarOverlay.classList.remove("active");

    //habilitar nuevamente el scroll
    document.body.classList.remove("sidebar-open")

    //actualizar estado del botón
    sidebarToggle.setAttribute("aria-expanded", "true");
}

//controlar botón hamburguesa
sidebarToggle.addEventListener("click", ()=>{
    if(isMobile()){
        //abrir o cerrar el men móvil
        if(sidebar.classList.contains("sidebar-open")){
            closeSidebar();
        }else{
            openSidebar();
        }
    }else{
        //contraer o expandir sidebar en escritorio
        sidebar.classList.toggle("sidebar-collapsed");
    }
});

//cerrar al tocar fuera del sidebar
sidebarOverlay.addEventListener("click", closeSidebar);

//obtener enlaces del sidebar
const sidebarLinks = document.querySelectorAll(".nav-link[data-view]")

//cerrar el sidebar al seleccionar una opción en móvil
sidebarLinks.forEach(link=>{
    link.addEventListener("click", ()=>{
        if(isMobile()){
            closeSidebar();
        }
    });
});