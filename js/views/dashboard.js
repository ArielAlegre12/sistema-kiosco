//inicializar gráfico de ventas
function initSalesChart() {
    //obtener el elemento canvas
    const canvas = document.getElementById("salesChart");

    //comprobar que exista el elemento
    if (!canvas) return;

    //obtener el tema actual
    const currentTheme = document.documentElement.getAttribute("data-theme");

    //definir colores según el tema
    const textColor = currentTheme === "dark" ? "#9CA3AF" : "#687280";
    const gridColor = currentTheme === "dark" ? "#303541" : "#E5E7EB";

    //datos del gráfico
    const salesData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        datasets: [{
            label: "Ventas",
            data: [85000, 120000, 95000, 150000, 110000, 180000, 123400],
            borderColor: "#818CF8",
            backgroundColor: "rgba(129,140,248,0.15)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    //configuración del gráfico
    const config = {
        type: "line",
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.parsed.y;

                            return "$ " + value.toLocaleString("es-AR");
                        }
                    }
                }
            },
            scales:{
                x:{
                    ticks:{
                        color: textColor
                    },
                    grid:{
                        color: gridColor
                    }
                },
                y:{
                    beginAtZero: true,
                    ticks:{
                        color:textColor,
                        callback:function(value){
                            return "$ " + value.toLocaleString("es-AR");
                        }
                    },
                    grid:{
                        color:gridColor
                    }
                }
            }
        }
    };

    //crear gráfico
    new Chart(canvas, config);
}