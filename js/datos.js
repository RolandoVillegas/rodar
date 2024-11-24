// Importar las clases
import Usuario from './usuario.js';
import Vehiculo from './vehiculo.js';
import Viaje from './viaje.js';
import Reserva from './reserva.js';

// Función para inicializar datos
function inicializarDatos() {
    // Verificar si los datos ya están en localStorage
    if (!localStorage.getItem('usuarios')) {
        // Crear usuarios
        const usuario01 = Usuario.crearUsuario("juanperez", "1234", "Juan", "Pérez", "juanperez@jmail.com", "2997456789");
        const usuario02 = Usuario.crearUsuario("mariagomez", "1234", "María", "Gómez", "mariagomez@jmail.com", "2997987654");
        const usuario03 = Usuario.crearUsuario("carloslopez", "1234", "Carlos", "López", "carloslopez@jmail.com", "2997123456");

        // Crear vehículo para el usuario 1
        const vehiculo01 = Vehiculo.crearVehiculo(usuario01.id, "Toyota", "Corolla", "AG900AA", 4);

        // Crear viajes
        Viaje.crearViaje(usuario01.id, vehiculo01.id, "Cipolletti", "Buenos Aires", "2024-12-01T08:00:00", 20, "no");
        Viaje.crearViaje(usuario01.id, vehiculo01.id, "Buenos Aires", "Cipolletti", "2024-12-15T10:00:00", 20, "no");
        Viaje.crearViaje(usuario01.id, vehiculo01.id, "Cipolletti", "Neuquén", "2024-12-17T14:00:00", 1, "no");

        // Crear reservas
        Reserva.crearReserva(usuario02.id, 1, 2, "2024-11-20T10:00:00"); // María reserva 2 asientos en el primer viaje
        Reserva.crearReserva(usuario03.id, 2, 1, "2024-11-21T15:00:00"); // Carlos reserva 1 asiento en el segundo viaje

        // Guardar datos en localStorage
        localStorage.setItem('usuarios', JSON.stringify(Usuario.usuarios));
        localStorage.setItem('vehiculos', JSON.stringify(Vehiculo.vehiculos));
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
        localStorage.setItem('reservas', JSON.stringify(Reserva.reservas));
    } else {
        // Cargar datos desde localStorage
        Usuario.usuarios = JSON.parse(localStorage.getItem('usuarios'));
        Vehiculo.vehiculos = JSON.parse(localStorage.getItem('vehiculos'));
        Viaje.viajes = JSON.parse(localStorage.getItem('viajes'));
        Reserva.reservas = JSON.parse(localStorage.getItem('reservas'));
    }
}

// Inicializar los datos
inicializarDatos();

// Exportar los datos si otros módulos los necesitan
export { Usuario, Vehiculo, Viaje, Reserva };
