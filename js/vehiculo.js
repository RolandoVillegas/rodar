class Vehiculo {
    static vehiculos = []; // Simula la tabla Vehiculo
    static ultimoId = 0; // Contador para IDs únicos

    constructor(id, idUsuario, marca, modelo, patente, capacidad) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.capacidad = capacidad;
    }

    static crearVehiculo(idUsuario, marca, modelo, patente, capacidad) {
        const id = ++Vehiculo.ultimoId; // Incrementa el ID automáticamente
        const vehiculo = new Vehiculo(id, idUsuario, marca, modelo, patente, capacidad);
        Vehiculo.vehiculos.push(vehiculo);

        // Guardar en localStorage
        localStorage.setItem('vehiculos', JSON.stringify(Vehiculo.vehiculos));

        return vehiculo;
    }

    static obtenerVehiculos() {
        return Vehiculo.vehiculos;
    }

    static obtenerVehiculo(id) {
        return Vehiculo.vehiculos.find(vehiculo => vehiculo.id === id);
    }

    static eliminarVehiculo(id) {
        Vehiculo.vehiculos = Vehiculo.vehiculos.filter(vehiculo => vehiculo.id !== id);
        // Guardar en localStorage
        localStorage.setItem('vehiculos', JSON.stringify(Vehiculo.vehiculos));
    }

    static modificarVehiculo(id, marca, modelo, patente, capacidad) {
        const vehiculoModificado = Vehiculo.obtenerVehiculo(id);
        if (!vehiculoModificado) {
            throw new Error(`Vehículo con id ${id} no encontrado.`);
        }
        vehiculoModificado.marca = marca;
        vehiculoModificado.modelo = modelo;
        vehiculoModificado.patente = patente;
        vehiculoModificado.capacidad = capacidad;
        // Guardar en localStorage
        localStorage.setItem('vehiculos', JSON.stringify(Vehiculo.vehiculos));
    }
}

export default Vehiculo;
