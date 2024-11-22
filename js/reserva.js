class Reserva {
    static reservas = []; // Simula la tabla Reserva

    constructor(id, idUsuario, idViaje, cantidadAsientos, fechaReserva) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idViaje = idViaje;
        this.cantidadAsientos = cantidadAsientos;
        this.fechaReserva = fechaReserva;
    }

    static crearReserva(idUsuario, idViaje, cantidadAsientos, fechaReserva) {
        const id = Reserva.reservas.length + 1;
        const reserva = new Reserva(id, idUsuario, idViaje, cantidadAsientos, fechaReserva);
        Reserva.reservas.push(reserva);
        return reserva;
    }

    static obtenerReservas() {
        return Reserva.reservas;
    }

    static eliminarReserva(id) {
        Reserva.reservas = Reserva.reservas.filter(reserva => reserva.id !== id);
    }
}

export default Reserva;
