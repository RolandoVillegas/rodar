class Usuario {
    static usuarios = []; // Simula la tabla Usuario

    constructor(id, nombre, apellido, email, telefono, password) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
    }

    static crearUsuario(nombre, apellido, email, telefono, password) {
        const id = Usuario.usuarios.length + 1;
        const usuario = new Usuario(id, nombre, apellido, email, telefono, password);
        Usuario.usuarios.push(usuario);
        return usuario;
    }

    static obtenerUsuarios() {
        return Usuario.usuarios;
    }

    static eliminarUsuario(id) {
        Usuario.usuarios = Usuario.usuarios.filter(usuario => usuario.id !== id);
    }
}

export default Usuario;
