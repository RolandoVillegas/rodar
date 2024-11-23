/* Importación de objetos que simulan registros de tablas en una base de datos */
import { Usuario, Vehiculo, Viaje, Reserva } from "./datos.js";

/* Función para eliminar LocalStorage */
/*
document
  .getElementById("btn-eliminar-local-storage")
  .addEventListener("click", () => {
    localStorage.clear();
    console.log("LocalStorage eliminado");
  });
*/

/* Prueba para ver si funcionan los módulos
console.log(Usuario.obtenerUsuarios());
console.log(Vehiculo.obtenerVehiculos());
console.log(Viaje.obtenerViajes());
console.log(Reserva.obtenerReservas());
const usuario04 = Usuario.crearUsuario("elenasantos", "1234", "Elena", "Santos", "elenasantos@jmail.com", "2997456790");
console.log(localStorage.getItem('usuarios'));
*/

document.getElementById("navbarToggle").addEventListener("click", function () {
  const menu = document.getElementById("navbarMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

/* Evento para buscar viaje */
document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn-buscar");
  const btnLimpiar = document.getElementById("btn-limpiar");
  const formSearchTrip = document.getElementById("form-search-trip");
  const pickATrip = document.getElementById("pick-a-trip");
  const tablaContenedor = document.getElementById("tabla-de-ofertas-de-viaje");
  const detalleViaje = document.getElementById("detalle-viaje");
  const btnVolver = document.getElementById("btn-volver");
  const btnTomarViaje = document.getElementById("btn-tomar-viaje");

  const formulario = document.querySelector("form");

  btnBuscar.addEventListener("click", () => {
    event.preventDefault();

    const origen = document.getElementById("origen").value.trim().toLowerCase();
    const destino = document
      .getElementById("destino")
      .value.trim()
      .toLowerCase();

    let resultados = Viaje.obtenerViajes();
    if (origen) {
      resultados = resultados.filter((viaje) =>
        viaje.origen.toLowerCase().includes(origen)
      );
    }
    if (destino) {
      resultados = resultados.filter((viaje) =>
        viaje.destino.toLowerCase().includes(destino)
      );
    }

    mostrarTabla(resultados);
  });

  btnLimpiar.addEventListener("click", () => {
    tablaContenedor.replaceChildren();  // Limpiar los resultados de la tabla
    formulario.reset();                 // Reiniciar los campos del formulario
  });

  function mostrarTabla(viajes) {
    if (viajes.length === 0) {
      tablaContenedor.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    let tablaHTML = `
      <table>
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha y Hora</th>
            <th>Duración</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    viajes.forEach((viaje) => {
      tablaHTML += `
        <tr>
          <td>${viaje.origen}</td>
          <td>${viaje.destino}</td>
          <td>${viaje.salidaFechaHora}</td>
          <td>${viaje.duracionEstimada} horas</td>
          <td class="link-icon">
            <a href="#" class="detalle-viaje" data-id="${viaje.id}">➡️</a>
          </td>
        </tr>
      `;
    });

    tablaHTML += "</tbody></table>";

    tablaContenedor.innerHTML = tablaHTML;

    // Asignar eventos dinámicamente
    document.querySelectorAll(".detalle-viaje").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("data-id");
        verDetalle(id);
      });
    });
  }

  function verDetalle(id) {
    console.log(id);
    console.log(Viaje.obtenerViaje(id));

    const viaje = Viaje.obtenerViaje(id);
    if (!viaje) return;

    detalleViaje.innerHTML = `
      <p><strong>Origen:</strong> ${viaje.origen}</p>
      <p><strong>Destino:</strong> ${viaje.destino}</p>
      <p><strong>Fecha y Hora:</strong> ${viaje.salidaFechaHora}</p>
      <p><strong>Duración:</strong> ${viaje.duracionEstimada} horas</p>
    `;

    formSearchTrip.style.display = "none";
    pickATrip.style.display = "block";
  }

  btnVolver.addEventListener("click", () => {
    formSearchTrip.style.display = "block";
    pickATrip.style.display = "none";
  });

  btnTomarViaje.addEventListener("click", () => {
    alert("¡Has elegido este viaje!");
    // Aquí puedes agregar lógica para guardar la reserva
  });
});
