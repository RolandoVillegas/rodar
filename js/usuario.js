class Usuario { 
    static usuarios = []; // Simula la tabla Usuario
    static ultimoId = 0;  // Contador de IDs únicos

    constructor(id, usuario, password, nombre, apellido, email, telefono) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }

    static crearUsuario(usuario, password, nombre, apellido, email, telefono) {
        if (Usuario.usuarios.some(u => u.usuario === usuario)) {
            throw new Error("El usuario ya existe.");
        }
        const id = ++Usuario.ultimoId; // Generar ID único
        const nuevoUsuario = new Usuario(id, usuario, password, nombre, apellido, email, telefono);
        Usuario.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    static obtenerUsuarios() {
        return Usuario.usuarios;
    }

    static eliminarUsuario(id) {
        Usuario.usuarios = Usuario.usuarios.filter(usuario => usuario.id !== id);
    }

    static modificarUsuario(id, usuario, password, nombre, apellido, email, telefono) {
        const usuarioModificado = Usuario.obtenerUsuario(id);
        if (!usuarioModificado) {
            throw new Error(`Usuario con id ${id} no encontrado.`);
        }
        if (Usuario.usuarios.some(u => u.usuario === usuario && u.id !== id)) {
            throw new Error(`El usuario ${usuario} ya está en uso.`);
        }
        usuarioModificado.usuario = usuario;
        usuarioModificado.password = password;
        usuarioModificado.nombre = nombre;
        usuarioModificado.apellido = apellido;
        usuarioModificado.email = email;
        usuarioModificado.telefono = telefono;
    }

    static obtenerUsuario(id) {
        return Usuario.usuarios.find(usuario => usuario.id === id);
    }
}

export default Usuario;