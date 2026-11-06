const AppState = { currentView: 'temas' };
const QuizState = { currentIndex: 0, respuestasUsuario: [], preguntasMezcladas: [] };
const viewIds = ['temas', 'flashcards', 'pruebas', 'resultados'];

function navigateTo(viewId, updateUrl = true) {
    if (!viewIds.includes(viewId)) return;

    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.toggle('active', section.id === viewId);
        section.classList.toggle('hidden', section.id !== viewId);
    });
    AppState.currentView = viewId;

    if (updateUrl && location.hash !== `#${viewId}`) {
        location.hash = viewId;
    }
}

function syncRoute() {
    const requestedView = location.hash.slice(1);
    const viewId = viewIds.includes(requestedView) ? requestedView : 'temas';
    navigateTo(viewId, false);
    if (viewId === 'pruebas' && QuizState.preguntasMezcladas.length === 0) iniciarPrueba();
    if (viewId === 'resultados') renderResultados();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTemas();
    renderFlashcards();
    document.querySelectorAll('.nav-links button[data-view]').forEach(button => {
        button.addEventListener('click', () => {
            const viewId = button.dataset.view;
            if (viewId === 'pruebas') iniciarPrueba();
            if (viewId === 'resultados') renderResultados();
            navigateTo(viewId);
        });
    });
    window.addEventListener('hashchange', syncRoute);
    syncRoute();
    if (!location.hash) location.hash = 'temas';
});

function renderTemas() {
    const container = document.getElementById('temas-container');
    container.innerHTML = '';
    studyData.temas.forEach(tema => {
        const card = document.createElement('article');
        card.className = 'tema-card';
        card.innerHTML = `<h3>${tema.titulo}</h3><p>${tema.resumen}</p><button type="button" onclick="verTema('${tema.id}')">Leer apuntes</button>`;
        container.appendChild(card);
    });
}

function verTema(id) {
    const tema = studyData.temas.find(item => item.id === id);
    if (!tema) return;
    document.getElementById('temas-container').innerHTML = `
        <button class="btn-back" type="button" onclick="renderTemas()">← Volver a temas</button>
        <div class="tema-contenido"><h3>${tema.titulo}</h3>${tema.contenido}</div>`;
}

function renderFlashcards() {
    const container = document.getElementById('flashcard-container');
    container.innerHTML = '';
    studyData.flashcards.forEach(card => {
        const element = document.createElement('article');
        element.className = 'flashcard';
        element.innerHTML = `
            <div class="flashcard-inner" role="button" tabindex="0" aria-label="Voltear tarjeta: ${card.pregunta}">
                <div class="flashcard-front"><span class="tag">${card.tema.toUpperCase()}</span><p class="pregunta">${card.pregunta}</p><span class="hint">Haz clic o presiona Enter para girar</span></div>
                <div class="flashcard-back"><p class="respuesta">${card.respuesta}</p></div>
            </div>`;
        const flip = () => element.querySelector('.flashcard-inner').classList.toggle('flipped');
        element.querySelector('.flashcard-inner').addEventListener('click', flip);
        element.querySelector('.flashcard-inner').addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                flip();
            }
        });
        container.appendChild(element);
    });
}

function iniciarPrueba() {
    QuizState.currentIndex = 0;
    QuizState.respuestasUsuario = [];
    QuizState.preguntasMezcladas = [...studyData.preguntas]
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
    renderPregunta();
}

function renderPregunta() {
    const container = document.getElementById('pruebas-container');
    const total = QuizState.preguntasMezcladas.length;
    if (QuizState.currentIndex >= total) {
        renderFinal();
        return;
    }

    const pregunta = QuizState.preguntasMezcladas[QuizState.currentIndex];
    container.innerHTML = `
        <div class="quiz-header"><span>Pregunta ${QuizState.currentIndex + 1} de ${total}</span><span class="quiz-tag">${pregunta.tema.toUpperCase()}</span></div>
        <div class="quiz-body"><h3>${pregunta.pregunta}</h3><div class="quiz-options">
            ${pregunta.opciones.map((opcion, index) => `<button class="option-btn" type="button" onclick="guardarRespuesta(${index})">${opcion}</button>`).join('')}
        </div></div>`;
}

function guardarRespuesta(index) {
    const pregunta = QuizState.preguntasMezcladas[QuizState.currentIndex];
    if (!pregunta || index < 0 || index >= pregunta.opciones.length) return;
    QuizState.respuestasUsuario.push({
        pregunta,
        seleccion: index,
        esCorrecta: index === pregunta.respuestaCorrecta
    });
    QuizState.currentIndex++;
    renderPregunta();
}

function renderFinal() {
    document.getElementById('pruebas-container').innerHTML = `
        <div class="quiz-body quiz-finished"><h3>¡Prueba finalizada!</h3>
        <button class="btn-primary" type="button" onclick="navigateTo('resultados'); renderResultados()">Ver análisis</button></div>`;
}

function renderResultados() {
    const container = document.getElementById('resultados-container');
    const respuestas = QuizState.respuestasUsuario;
    if (respuestas.length === 0) {
        container.innerHTML = '<p>Aún no has realizado una prueba. Ve a Pruebas para comenzar.</p>';
        return;
    }

    const correctas = respuestas.filter(item => item.esCorrecta).length;
    const porcentaje = Math.round((correctas / respuestas.length) * 100);
    const temasPorRevisar = [...new Set(respuestas.filter(item => !item.esCorrecta).map(item => item.pregunta.tema))];
    let html = `<div class="results-header"><div class="score-circle ${porcentaje >= 70 ? 'score-pass' : 'score-fail'}"><h2>${porcentaje}%</h2><p>${correctas} de ${respuestas.length}</p></div><div><h3>${porcentaje >= 70 ? '¡Buen trabajo!' : 'Sigue repasando'}</h3></div></div>`;

    if (temasPorRevisar.length) {
        html += `<div class="improvement-box"><h4>Puntos a mejorar</h4><ul>${temasPorRevisar.map(tema => `<li>${tema.toUpperCase()}</li>`).join('')}</ul></div>`;
    }
    html += '<div class="review-section"><h4>Revisión detallada</h4>';
    respuestas.forEach((item, index) => {
        const pregunta = item.pregunta;
        html += `<article class="review-card ${item.esCorrecta ? 'review-correct' : 'review-incorrect'}">
            <p>${index + 1}. ${pregunta.pregunta}</p>
            <p>Tu respuesta: ${pregunta.opciones[item.seleccion]} ${item.esCorrecta ? '✅' : '❌'}</p>
            ${item.esCorrecta ? '' : `<p>Respuesta correcta: ${pregunta.opciones[pregunta.respuestaCorrecta]}</p>`}
            <div class="review-explanation">${pregunta.explicacion}</div></article>`;
    });
    container.innerHTML = `${html}</div><div class="results-actions"><button class="btn-primary" type="button" onclick="iniciarPrueba(); navigateTo('pruebas')">Repetir prueba</button></div>`;
}
