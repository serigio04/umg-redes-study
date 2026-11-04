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

// --- ESTADO DE LA PRUEBA ---
const QuizState = {
    currentIndex: 0,
    respuestasUsuario: [],
    preguntasMezcladas: []
};

// Función para iniciar la prueba cuando se entra a la sección
function iniciarPrueba() {
    QuizState.currentIndex = 0;
    QuizState.respuestasUsuario = [];
    // Desordenar las preguntas para que no siempre salgan en el mismo orden
    QuizState.preguntasMezcladas = [...studyData.preguntas].sort(() => Math.random() - 0.5);
    
    renderPregunta();
}

// Función para renderizar la pregunta actual
function renderPregunta() {
    const container = document.getElementById('pruebas-container');
    const index = QuizState.currentIndex;
    const total = QuizState.preguntasMezcladas.length;

    // Si ya no hay preguntas, terminar prueba
    if (index >= total) {
        finalizarPrueba();
        return;
    }

    const pregunta = QuizState.preguntasMezcladas[index];

    container.innerHTML = `
        <div class="quiz-header">
            <span>Pregunta ${index + 1} de ${total}</span>
            <span class="quiz-tag">${pregunta.tema.toUpperCase()}</span>
        </div>
        <div class="quiz-body">
            <h3>${pregunta.pregunta}</h3>
            <div class="quiz-options">
                ${pregunta.opciones.map((opcion, i) => `
                    <button class="option-btn" onclick="guardarRespuesta(${i})">${opcion}</button>
                `).join('')}
            </div>
        </div>
        <div class="quiz-footer">
            <p>Lee cuidadosamente antes de seleccionar.</p>
        </div>
    `;
}

// Función para guardar la respuesta y avanzar
function guardarRespuesta(opcionSeleccionadaIndex) {
    const preguntaActual = QuizState.preguntasMezcladas[QuizState.currentIndex];
    
    QuizState.respuestasUsuario.push({
        pregunta: preguntaActual,
        seleccion: opcionSeleccionadaIndex,
        esCorrecta: opcionSeleccionadaIndex === preguntaActual.respuestaCorrecta
    });

    QuizState.currentIndex++;
    renderPregunta();
}

// Función temporal para finalizar (Se conectará con la Fase 4)
function finalizarPrueba() {
    const container = document.getElementById('pruebas-container');
    container.innerHTML = `
        <div class="quiz-body" style="text-align: center;">
            <h3>¡Prueba Finalizada! 🎉</h3>
            <p>Tus respuestas han sido registradas.</p>
            <br>
            <button class="btn-primary" onclick="navigateTo('resultados'); renderResultados();">Ver Análisis de Resultados</button>
        </div>
    `;
}

// Actualizar el DOMContentLoaded para inicializar la prueba cuando hagamos clic en el menú
document.addEventListener('DOMContentLoaded', () => {
    // ... lo que ya tenías ...
    
    // Interceptar el clic en la navegación para resetear la prueba si entramos ahí
    const botonesNav = document.querySelectorAll('.nav-links button');
    botonesNav.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.innerText.includes('Pruebas')) {
                iniciarPrueba();
            }
        });
    });
});

// --- MÓDULO: ANÁLISIS DE RESULTADOS ---
function renderResultados() {
    const container = document.getElementById('resultados-container');
    const respuestas = QuizState.respuestasUsuario;
    
    if (respuestas.length === 0) {
        container.innerHTML = `<p style="text-align:center;">Aún no has realizado ninguna prueba. Ve a la sección de Pruebas para comenzar.</p>`;
        return;
    }

    // Calcular estadísticas
    const total = respuestas.length;
    const correctas = respuestas.filter(r => r.esCorrecta).length;
    const porcentaje = Math.round((correctas / total) * 100);

    // Identificar áreas de mejora (temas donde hubo errores)
    const errores = respuestas.filter(r => !r.esCorrecta);
    const temasAmejorar = [...new Set(errores.map(r => r.pregunta.tema))];

    // Construir interfaz
    let html = `
        <div class="results-header">
            <div class="score-circle ${porcentaje >= 70 ? 'score-pass' : 'score-fail'}">
                <h2>${porcentaje}%</h2>
                <p>${correctas} de ${total}</p>
            </div>
            <div class="score-message">
                <h3>${porcentaje >= 70 ? '¡Buen trabajo!' : 'Necesitas repasar un poco más.'}</h3>
            </div>
        </div>
    `;

    // Sección de Puntos de Mejora
    if (temasAmejorar.length > 0) {
        html += `
            <div class="improvement-box">
                <h4>⚠️ Puntos a Mejorar</h4>
                <p>Te recomendamos repasar los siguientes módulos:</p>
                <ul>
                    ${temasAmejorar.map(tema => `<li>Módulo: <b>${tema.toUpperCase()}</b></li>`).join('')}
                </ul>
                <button class="btn-small" onclick="navigateTo('temas')">Ir a estudiar</button>
            </div>
        `;
    }

    // Revisión detallada de cada pregunta
    html += `<div class="review-section"><h4>Revisión Detallada</h4>`;
    
    respuestas.forEach((item, index) => {
        const p = item.pregunta;
        const claseEstado = item.esCorrecta ? 'review-correct' : 'review-incorrect';
        const icono = item.esCorrecta ? '✅' : '❌';

        html += `
            <div class="review-card ${claseEstado}">
                <p class="review-q"><b>${index + 1}.</b> ${p.pregunta}</p>
                <p class="review-a">Tu respuesta: <span>${p.opciones[item.seleccion]}</span> ${icono}</p>
                ${!item.esCorrecta ? `<p class="review-correct-a">Respuesta correcta: <b>${p.opciones[p.respuestaCorrecta]}</b></p>` : ''}
                <div class="review-explanation">
                    <small><b>Explicación:</b> ${p.explicacion}</small>
                </div>
            </div>
        `;
    });

    html += `</div>
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn-primary" onclick="iniciarPrueba()">Repetir Prueba</button>
        </div>
    `;

    container.innerHTML = html;
}