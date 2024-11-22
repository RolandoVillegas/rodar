
/* Importación de objetos que simulan registros de tablas en una base de datos, a partir del 
módulo datos.js que asu vez llama a los módulos usuario.js, vehiculo.js, viaje.js y reserva.js */

import { Usuario, Vehiculo, Viaje, Reserva } from './datos.js';

/* Prueba para ver si funciona
console.log(Usuario.obtenerUsuarios());
console.log(Vehiculo.obtenerVehiculos());
console.log(Viaje.obtenerViajes());
console.log(Reserva.obtenerReservas());
*/

document.getElementById('navbarToggle').addEventListener('click', function() {
    const menu = document.getElementById('navbarMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

/* Función para mover el slider */
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Ocultar la diapositiva actual
    slides[currentSlide].classList.remove('active');
    
    // Actualizar el índice de la diapositiva actual
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    // Mostrar la nueva diapositiva
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Mueve el slide automáticamente cada 5 segundos
setInterval(() => moveSlide(1), 5000);


// Evento para buscar viaje
document.getElementById('btn-buscar-viaje').addEventListener('click', function() {
    const form = document.getElementById('form-get-ride');
    form.style.display = 'none';
    alert('Formulario enviado');
});