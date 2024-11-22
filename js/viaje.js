class Viaje {
    static viajes = []; // Simula la tabla Viaje
    static ultimoId = 0; // Contador para IDs únicos

    constructor(id, idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idVehiculo = idVehiculo;
        this.origen = origen;
        this.destino = destino;
        this.salidaFechaHora = salidaFechaHora; // Cambio de nombre
        this.duracionEstimada = duracionEstimada;
    }

    static crearViaje(idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada) {
        const id = ++Viaje.ultimoId; // Incrementa automáticamente el ID
        const viaje = new Viaje(id, idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada);
        Viaje.viajes.push(viaje);
        return viaje;
    }

    static obtenerViajes() {
        return Viaje.viajes;
    }

    static obtenerViaje(id) {
        return Viaje.viajes.find(viaje => viaje.id === id);
    }

    static eliminarViaje(id) {
        Viaje.viajes = Viaje.viajes.filter(viaje => viaje.id !== id);
    }

    static modificarViaje(id, origen, destino, salidaFechaHora, duracionEstimada) {
        const viajeModificado = Viaje.obtenerViaje(id);
        if (!viajeModificado) {
            throw new Error(`Viaje con id ${id} no encontrado.`);
        }
        viajeModificado.origen = origen;
        viajeModificado.destino = destino;
        viajeModificado.salidaFechaHora = salidaFechaHora; // Cambio de nombre
        viajeModificado.duracionEstimada = duracionEstimada;
    }
}

export default Viaje;