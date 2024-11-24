class Viaje {
    static viajes = []; // Simula la tabla Viaje

    constructor(id, idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada, reservado) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idVehiculo = idVehiculo;
        this.origen = origen;
        this.destino = destino;
        this.salidaFechaHora = salidaFechaHora; // Cambio de nombre
        this.duracionEstimada = duracionEstimada;
        this.reservado = reservado || "no"; // Puede valer si=el viaje está reservado, no=el viaje no está reservado
    }

    static crearViaje(idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada, reservado) {
        const id = Viaje.viajes.length + 1; // Incrementa automáticamente el ID
        const viaje = new Viaje(id, idUsuario, idVehiculo, origen, destino, salidaFechaHora, duracionEstimada, reservado);
        Viaje.viajes.push(viaje);
        // Guardar en localStorage
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
        return viaje;
    }

    static obtenerViajes() {
        // Retorna solo los viajes que no están reservados
        return Viaje.viajes.filter(viaje => viaje.reservado.includes("no"));
        
    }

    static obtenerViaje(id) {
        return Viaje.viajes.find(viaje => viaje.id === +id); // Convertir id a número, porque si no, no funciona el método.
    }

    static eliminarViaje(id) {
        Viaje.viajes = Viaje.viajes.filter(viaje => viaje.id !== +id); // Convertir id a número, porque si no, no funciona el método.
        // Guardar en localStorage
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
    }

    static modificarViaje(id, origen, destino, salidaFechaHora, duracionEstimada, reservado) {
        const viajeModificado = Viaje.obtenerViaje(id);
        if (!viajeModificado) {
            throw new Error(`Viaje con id ${id} no encontrado.`);
        }
        viajeModificado.origen = origen;
        viajeModificado.destino = destino;
        viajeModificado.salidaFechaHora = salidaFechaHora; // Cambio de nombre
        viajeModificado.duracionEstimada = duracionEstimada;
        viajeModificado.reservado = reservado;
        // Guardar en localStorage
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
    }

    static marcarViajeReservado(id) {
        const viajeModificado = Viaje.obtenerViaje(id);
        if (!viajeModificado) {
            throw new Error(`Viaje con id ${id} no encontrado.`);
        }
        viajeModificado.reservado = "si";
        // Guardar en localStorage
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
    }

    static marcarViajeNoReservado(id) {
        const viajeModificado = Viaje.obtenerViaje(id);
        if (!viajeModificado) {
            throw new Error(`Viaje con id ${id} no encontrado.`);
        }
        viajeModificado.reservado = "no";
        // Guardar en localStorage
        localStorage.setItem('viajes', JSON.stringify(Viaje.viajes));
    }   
}

export default Viaje;