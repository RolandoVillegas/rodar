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

  /* Componentes de oferta */
  const btnOffer = document.getElementById("btn-oferta");
  const formOffer = document.getElementById("form-offer");
  const errorUserNotLoggedIn = document.getElementById(
    "error-user-not-logged-in"
  );

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

    console.log(Viaje.viajes);

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

    // Obtener datos del viaje
    const viaje = Viaje.obtenerViaje(id);
    // Obtener datos del conductor
    const conductor = Usuario.obtenerUsuario(viaje.idUsuario);
    // Obtener datos del vehículo
    const vehiculo = Vehiculo.obtenerVehiculo(viaje.idVehiculo);
    if (!viaje) return;

    // Formatear la fecha y hora del viaje
    const salidaFechaHora = viaje.salidaFechaHora; // Ejemplo: "2024-12-01T08:00:00"
    const fecha = new Date(salidaFechaHora);

    // Configurar el formateo
    const opciones = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Formato 24 horas
    };
    const salidaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );

    // Construir el html para mostrar
    detalleViaje.innerHTML = `
        <style>
            .detalle-viaje {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        </style>
        <div class="detalle-viaje">
      <p><strong>Origen:</strong> ${viaje.origen}</p>
      <p><strong>Destino:</strong> ${viaje.destino}</p>
      <p><strong>Salida:</strong> ${salidaFormateada}</p>
      <p><strong>Duración:</strong> ${viaje.duracionEstimada} horas</p>
      <br>
      <h2>Conductor</h2>
      <p>${conductor.nombre} ${conductor.apellido}</p>
      <br>
      <h2>Vehículo</h2>
      <p>${vehiculo.marca} ${vehiculo.modelo}</p>

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
  /*******************************************************************************************************************************************/
  /* Sección login / logout */

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

/*******************************************************************************************************************************************/
/* Sección para ofrecer transporte */

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en offer.html
  if (window.location.pathname.includes("offer.html")) {
    const mensajeOferta = document.getElementById("mensaje-oferta");
    const formOffer = document.getElementById("form-offer");
    const usuarioId = localStorage.getItem("usuarioId");

    // Validar si el usuario está logueado
    if (!usuarioId) {
        // Si el usuario no está logueado, mostrar un mensaje de error, le pide que se loguee y oculta el formulario.
      mensajeOferta.innerHTML = `
          <p>No estás conectado al sitio. Por favor, <a href="login.html">iniciá sesión</a> para publicar una oferta de transporte.</p>
        `;
      mensajeOferta.style.display = "block";
      if (formOffer) formOffer.style.display = "none"; // Ocultar formulario de publicación de oferta
      return;
    }

    // Validar si el usuario tiene un vehículo registrado, después de tener el registro de que se logueó
    // Recuperar si el usuario tiene un vehículo registrado
    const tieneVehiculo = Vehiculo.vehiculos.some(
      (vehiculo) => vehiculo.idUsuario === parseInt(usuarioId)
    );

    // Evaluar si no tiene vehículo
    if (!tieneVehiculo) {
      mensajeOferta.innerHTML = `
          <p>No tenés un vehículo registrado en tu cuenta. Por favor, agregá un vehículo para poder ofrecer transporte.</p>
        `;
      mensajeOferta.style.display = "block";
      if (formOffer) formOffer.style.display = "none"; // Ocultar formulario
      return;
    }
    
    // Si pasa las dos validaciones, mostrar el formulario de oferta
    mensajeOferta.style.display = "none";
    if (formOffer) formOffer.style.display = "block";
    const btnPublicar = document.getElementById("btn-publicar");
    
   if (btnPublicar) {
    btnPublicar.addEventListener("click", () => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    // Obtener los datos del formulario de oferta
        const origen = document.getElementById("origen").value.trim();
        const destino = document.getElementById("destino").value.trim();
        const salida = document.getElementById("salida").value.trim();
        const duracion = document.getElementById("duracion").value.trim();
        const idUsuario = parseInt(usuarioId);
        const idVehiculo = Vehiculo.obtenerVehiculo(parseInt(usuarioId)).id;

        // Verificar que los campos estén completos
        if (!origen || !destino || !salida || !duracion) {
            document.getElementById("error-publicar").textContent = `Los campos no están completos.`;
            document.getElementById("error-publicar").style.display = "flex";
            return;
        }


        // Verificar que salida sea una fecha y hora válida
        if (!salida.includes("T")) {
            document.getElementById("error-publicar").textContent = `La fecha y hora de salida no es válida.`;
            document.getElementById("error-publicar").style.display = "flex";
            return;
        }

        console.log(origen);
        console.log(destino);
        console.log(salida);
        console.log(duracion);
        console.log(usuarioId);
        console.log(idVehiculo);

        // Deshabilita todos los campos del formulario
        formOffer.querySelectorAll("input").forEach((input) => {
          input.disabled = true;
        });

        // Oculta el mensaje de error
        document.getElementById("error-publicar").style.display = "none";

        // Muestra el mensaje de éxito
        document.getElementById("mensaje-publicar-ok").textContent = `¡Oferta publicada con éxito!`;


        document.getElementById("mensaje-publicar-ok").innerHTML = `
  <img src="images/success.gif" alt="Éxito" style="width: 80px; height: 63px; vertical-align: middle; margin-right: 10px;">
  ¡Oferta publicada con éxito!
`;
document.getElementById("mensaje-publicar-ok").style.display = "block";
document.getElementById("mensaje-publicar-ok").hidden = false;

        // Ocultar el botón Publicar oferta
        const btnPublicar = document.getElementById("btn-publicar");
        btnPublicar.style.display = "none";

        // Mostrar el botón de Volver al inicio
        const btnInicio = document.getElementById("btn-inicio");
        btnInicio.style.display = "block";

        // Agregar la oferta de viaje en la clase Viaje
        Viaje.crearViaje(idUsuario, idVehiculo, origen, destino, salida, duracion, "no");
       console.log(Viaje.viajes);


    });
   }




  } // Fin de la comprobación de si estamos en offer.html (no borrar!)

});
