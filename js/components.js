//cargar vistas
async function loadView(view, title){
    try{
        //obtener el contenido de la vista
        const response = await fetch(`views/${view}.html`);

        //comprobar si la respuesta fue correcta
        if(!response.ok){
            throw new Error("No se pudo cargar la vista");
        }

        //obtener el html
        const content = await response.text();

        //insertar contenido en el contenedor principal
        document.getElementById("mainContent").innerHTML = content;

        //actualizar el titulo de la página
        document.getElementById("pageTitle").textContent  = title;

        //inicializar iconos de lucide
        lucide.createIcons();

        //incializar funcionalidades de cada vista
        if(view == "dashboard"){
            initSalesChart();
        }
    }catch(error){
        console.error("Error al cargar la vista:", error);

        document.getElementById("mainContent").innerHTML = `
            <p>No se pudo cargar el contenido solicitado.</p>
        `;
    }
}