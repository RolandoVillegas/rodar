class Reserva {
    static reservas = []; // Simula la tabla Reserva
    static ultimoId = 0; // Contador para IDs únicos

    constructor(id, idUsuario, idViaje, cantidadAsientos, fechaReserva) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idViaje = idViaje;
        this.cantidadAsientos = cantidadAsientos;
        this.fechaReserva = fechaReserva;
    }

    static crearReserva(idUsuario, idViaje, cantidadAsientos, fechaReserva) {
        const id = ++Reserva.ultimoId; // Incrementa automáticamente el ID
        const reserva = new Reserva(id, idUsuario, idViaje, cantidadAsientos, fechaReserva);
        Reserva.reservas.push(reserva);
        return reserva;
    }

    static obtenerReservas() {
        return Reserva.reservas;
    }

    static obtenerReserva(id) {
        return Reserva.reservas.find(reserva => reserva.id === id);
    }

    static eliminarReserva(id) {
        Reserva.reservas = Reserva.reservas.filter(reserva => reserva.id !== id);
    }

    static modificarReserva(id, idUsuario, idViaje, cantidadAsientos, fechaReserva) {
        const reservaModificada = Reserva.obtenerReserva(id);
        if (!reservaModificada) {
            throw new Error(`Reserva con id ${id} no encontrada.`);
        }
        reservaModificada.idUsuario = idUsuario;
        reservaModificada.idViaje = idViaje;
        reservaModificada.cantidadAsientos = cantidadAsientos;
        reservaModificada.fechaReserva = fechaReserva;
    }
}

export default Reserva;