/* Importación de objetos que simulan registros de tablas en una base de datos */
import { Usuario, Vehiculo, Viaje, Reserva } from "./datos.js";

// Función para manejar el menú dinámico
// Si el usuario está logueado, muestra "Mis viajes", si no, muestra "Login"
function actualizarMenu() {
  const menuDynamic = document.getElementById("menu-dynamic");
  const usuarioId = localStorage.getItem("usuarioId");

  if (menuDynamic) {
    if (usuarioId) {
      // Usuario logueado: mostrar "Mis viajes"
      menuDynamic.innerHTML = `<a href="dashboard.html">Mis viajes</a>`;
    } else {
      // Sin usuario logueado: mostrar "Login"
      menuDynamic.innerHTML = `<a href="login.html">Login</a>`;
    }
  }
}

// Actualizar el menú dinámico
document.addEventListener("DOMContentLoaded", actualizarMenu);

const btnLogout = document.getElementById("btn-logout");
const usuarioId = localStorage.getItem("usuarioId");

if (btnLogout && usuarioId) {
  btnLogout.style.display = "block"; // Mostrar el botón Logout si hay un usuario logueado

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");
    window.location.href = "index.html"; // Redirigir al hacer logout
  });
}

/* Función para eliminar LocalStorage */
// El la última opción de la página principal
const btnEliminarLocalStorage = document.getElementById(
  "btn-eliminar-local-storage"
);
if (btnEliminarLocalStorage) {
  btnEliminarLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    console.log("LocalStorage eliminado");
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  /* Componentes de búsqueda */
  const btnBuscar = document.getElementById("btn-buscar");
  const btnLimpiar = document.getElementById("btn-limpiar");
  const formSearchTrip = document.getElementById("form-search-trip");
  const pickATrip = document.getElementById("pick-a-trip-section");
  const tablaContenedor = document.getElementById("tabla-de-ofertas-de-viaje");
  const detalleViaje = document.getElementById("detalle-viaje");
  const btnVolver = document.getElementById("btn-volver");
  const btnTomarViaje = document.getElementById("btn-tomar-viaje");

  const formulario = document.getElementById("form-search-trip");

  /* Componentes de login */
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");
  const formLogin = document.getElementById("form-login");

  /* Comienzo de algoritmos de las páginas y secciones */

  if (btnBuscar) {
    btnBuscar.addEventListener("click", (event) => {
      event.preventDefault();
      const origen = document
        .getElementById("origen")
        .value.trim()
        .toLowerCase();
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
  }

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      tablaContenedor.replaceChildren(); // Limpiar los resultados de la tabla
      formulario.reset(); // Reiniciar los campos del formulario
    });
  }

  function mostrarTabla(viajes) {
    if (viajes.length === 0) {
      tablaContenedor.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    let tablaHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Duración</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
    `;

    viajes.forEach((viaje) => {
      tablaHTML += `
        <tr>
          <td>${viaje.id}</td>
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
    // Guardar el id del viaje en el localStorage
    localStorage.setItem("viajeId", id);

    const viaje = Viaje.obtenerViaje(id);
    if (!viaje) return;

    detalleViaje.innerHTML = `
      <p><strong>ID:</strong> ${viaje.id}</p>
      <p><strong>Origen:</strong> ${viaje.origen}</p>
      <p><strong>Destino:</strong> ${viaje.destino}</p>
      <p><strong>Fecha y Hora:</strong> ${viaje.salidaFechaHora}</p>
      <p><strong>Duración:</strong> ${viaje.duracionEstimada} horas</p>
    `;

    formSearchTrip.style.display = "none";
    pickATrip.style.display = "flex";
    // Mostrar el botón de Tomar viaje
    const btnTomarViaje = document.getElementById("btn-tomar-viaje");
    btnTomarViaje.style.display = "block";
    // Ocultar el mensaje de confirmación
    const errorSeleccionarViaje = document.getElementById(
      "error-seleccionar-viaje"
    );
    errorSeleccionarViaje.hidden = true;    
  }

  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      formSearchTrip.style.display = "flex";
      pickATrip.style.display = "none";
    });
  }

  if (btnTomarViaje) {
    btnTomarViaje.addEventListener("click", () => {

      // Se analizará si hay un usuario logeado, de lo contrario se mostrará un mensaje de error
      // para que primero haga un login
      if (localStorage.getItem("usuario")) {
        // Usuario logueado: guardar la reserva
        const usuarioId = localStorage.getItem("usuarioId");

        // Obtener el id del viaje del localstorage
        const viajeIdLs = localStorage.getItem("viajeId");

        Reserva.crearReserva(usuarioId, viajeIdLs, 1, 0, "2024-11-21T15:00:00");
        Viaje.marcarViajeReservado(viajeIdLs);
        console.log(Reserva.reservas);
        console.log(Viaje.viajes);
        alert("Reserva guardada");
        // Agregar un mensaje de confirmación y una imagen centrada en la pantalla para avisar al usuario
        // que la reserva se ha guardado correctamente, usando el div con id="error-seleccionar-viaje"

        // Mostrar el mensaje de confirmación
        const errorSeleccionarViaje = document.getElementById(
          "error-seleccionar-viaje"
        );
        // Ocultar el botón de Tomar viaje
        const btnTomarViaje = document.getElementById("btn-tomar-viaje");
        btnTomarViaje.style.display = "none";
        // Ocultar el botón de Volver a los resultados
        const btnVolver = document.getElementById("btn-volver");
        btnVolver.style.display = "none";
        // Mostrar el botón de Volver al inicio
        const btnInicio = document.getElementById("btn-inicio");
        btnInicio.style.display = "block";
        errorSeleccionarViaje.innerHTML = `
  <img src="images/success.gif" alt="Éxito" style="width: 80px; height: 63px; vertical-align: middle; margin-right: 10px;">
  ¡Reserva guardada!
`;
        errorSeleccionarViaje.hidden = false;
      } else {
        // Sin usuario logueado: mostrar un mensaje de error
        const errorSeleccionarViaje = document.getElementById(
          "error-seleccionar-viaje"
        );
        errorSeleccionarViaje.innerHTML =
          "¡Atención!: para guardar la reserva, primero debés <a href='login.html'>ingresar al sitio</a>";
        errorSeleccionarViaje.hidden = false;
      }
    });
  }

  /* Inicio de código para login */
  if (btnLogin) {
    btnLogin.addEventListener("click", (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado
      const usuario = document.getElementById("usuario").value.trim();
      const password = document.getElementById("password").value.trim();

      const usuarioEncontrado = Usuario.usuarios.find(
        (u) => u.usuario === usuario && u.password === password
      );

      if (usuarioEncontrado) {
        alert("Inicio de sesión exitoso");

        // Almacenar en localStorage
        localStorage.setItem("usuario", usuarioEncontrado.usuario);
        localStorage.setItem("usuarioId", usuarioEncontrado.id);
        // Llamar a la función para actualizar el menú dinámico
        actualizarMenu();
        console.log(localStorage.getItem("usuario"));
        console.log(localStorage.getItem("usuarioId"));
        // Redirigir a la página principal
        //window.location.href = "index.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

  if (btnLogout) {
    function manejarLogout() {
      const btnLogout = document.getElementById("btn-logout");
      const usuarioId = localStorage.getItem("usuarioId");

      if (btnLogout && usuarioId) {
        btnLogout.style.display = "block"; // Mostrar el botón si hay un usuario logueado

        btnLogout.addEventListener("click", () => {
          localStorage.removeItem("usuario");
          localStorage.removeItem("usuarioId");
          window.location.href = "index.html"; // Redirigir al logout
        });
      }
    }
  }
});
