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