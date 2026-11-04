// Manejador del estado de la aplicación
const AppState = {
    currentView: 'temas'
};

/**
 * Función para navegar entre las diferentes secciones de la SPA.
 * @param {string} viewId - El ID de la sección HTML a mostrar ('temas', 'flashcards', 'pruebas', 'resultados')
 */
function navigateTo(viewId) {
    // 1. Ocultar todas las secciones
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    // 2. Mostrar la sección solicitada
    const activeSection = document.getElementById(viewId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('active');
        AppState.currentView = viewId;
    }
}

// Inicialización de la app al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Asegurarnos de que inicie en la vista de temas
    navigateTo('temas');
});