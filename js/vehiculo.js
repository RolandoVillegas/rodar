class Vehiculo {
    static vehiculos = []; // Simula la tabla Vehiculo

    constructor(id, idUsuario, marca, modelo, patente, capacidad) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.capacidad = capacidad;
    }

    static crearVehiculo(idUsuario, marca, modelo, patente, capacidad) {
        const id = Vehiculo.vehiculos.length + 1;
        const vehiculo = new Vehiculo(id, idUsuario, marca, modelo, patente, capacidad);
        Vehiculo.vehiculos.push(vehiculo);
        return vehiculo;
    }

    static obtenerVehiculos() {
        return Vehiculo.vehiculos;
    }

    static eliminarVehiculo(id) {
        Vehiculo.vehiculos = Vehiculo.vehiculos.filter(vehiculo => vehiculo.id !== id);
    }
}

export default Vehiculo;
