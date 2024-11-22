// Importar las clases
import Usuario from './usuario.js';
import Vehiculo from './vehiculo.js';
import Viaje from './viaje.js';
import Reserva from './reserva.js';

// Crear usuarios
const usuario01 = Usuario.crearUsuario("juanperez", "1234", "Juan", "Pérez", "juanperez@jmail.com", "2997456789");
const usuario02 = Usuario.crearUsuario("mariagomez", "1234", "María", "Gómez", "mariagomez@jmail.com", "2997987654");
const usuario03 = Usuario.crearUsuario("carloslopez", "1234", "Carlos", "López", "carloslopez@jmail.com", "2997123456");

// Crear vehículo para el usuario 1
const vehiculo01 = Vehiculo.crearVehiculo(usuario01.id, "Toyota", "Corolla", "AG900AA", 4);

// Crear viajes
const viaje01 = Viaje.crearViaje(usuario01.id, vehiculo01.id, "Cipolletti", "Buenos Aires", "2024-12-01T08:00:00", 3);
const viaje02 = Viaje.crearViaje(usuario01.id, vehiculo01.id, "Buenos Aires", "Cipolletti", "2024-12-15T10:00:00", 5);
const viaje03 = Viaje.crearViaje(usuario01.id, vehiculo01.id, "Cipolletti", "Neuquén", "2024-12-17T14:00:00", 8);


// Crear reservas
const reserva01 = Reserva.crearReserva(usuario02.id, viaje01.id, 2, "2024-11-20T10:00:00"); // María reserva 2 asientos en el primer viaje
const reserva02 = Reserva.crearReserva(usuario03.id, viaje02.id, 1, "2024-11-21T15:00:00"); // Carlos reserva 1 asiento en el segundo viaje

// Exportar los datos si otros módulos los necesitan
export { Usuario, Vehiculo, Viaje, Reserva };
