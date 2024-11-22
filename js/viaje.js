class Viaje {
    static viajes = []; // Simula la tabla Viaje

    constructor(id, idUsuario, idVehiculo, origen, destino, fechaHora, duracionEstimada) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idVehiculo = idVehiculo;
        this.origen = origen;
        this.destino = destino;
        this.fechaHora = fechaHora;
        this.duracionEstimada = duracionEstimada;
    }

    static crearViaje(idUsuario, idVehiculo, origen, destino, fechaHora, duracionEstimada) {
        const id = Viaje.viajes.length + 1;
        const viaje = new Viaje(id, idUsuario, idVehiculo, origen, destino, fechaHora, duracionEstimada);
        Viaje.viajes.push(viaje);
        return viaje;
    }

    static obtenerViajes() {
        return Viaje.viajes;
    }

    static eliminarViaje(id) {
        Viaje.viajes = Viaje.viajes.filter(viaje => viaje.id !== id);
    }
}

export default Viaje;
