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
    navigateTo('temas');
    renderTemas();
    renderFlashcards();
});

// --- MÓDULO: TEMAS DE ESTUDIO ---
function renderTemas() {
    const container = document.getElementById('temas-container');
    container.innerHTML = ''; // Limpiar contenedor

    studyData.temas.forEach(tema => {
        const card = document.createElement('div');
        card.className = 'tema-card';
        card.innerHTML = `
            <h3>${tema.titulo}</h3>
            <p>${tema.resumen}</p>
            <button onclick="verTema('${tema.id}')">Leer Apuntes</button>
        `;
        container.appendChild(card);
    });
}

function verTema(id) {
    const tema = studyData.temas.find(t => t.id === id);
    if (!tema) return;

    const container = document.getElementById('temas-container');
    container.innerHTML = `
        <button class="btn-back" onclick="renderTemas()">⬅ Volver a Temas</button>
        <div class="tema-contenido">
            <h3>${tema.titulo}</h3>
            ${tema.contenido}
        </div>
    `;
}

// --- MÓDULO: FLASHCARDS ---
function renderFlashcards() {
    const container = document.getElementById('flashcard-container');
    container.innerHTML = '';

    studyData.flashcards.forEach(card => {
        const flipCard = document.createElement('div');
        flipCard.className = 'flashcard';
        // Alternar la clase 'flipped' al hacer clic
        flipCard.innerHTML = `
            <div class="flashcard-inner" onclick="this.classList.toggle('flipped')">
                <div class="flashcard-front">
                    <span class="tag">${card.tema.toUpperCase()}</span>
                    <p class="pregunta">${card.pregunta}</p>
                    <span class="hint">Toca para girar</span>
                </div>
                <div class="flashcard-back">
                    <p class="respuesta">${card.respuesta}</p>
                </div>
            </div>
        `;
        container.appendChild(flipCard);
    });
}