const AppState = { currentView: 'temas' };
const viewIds = ['temas', 'flashcards', 'pruebas', 'resultados'];

function navigateTo(viewId, updateUrl = true) {
    if (!viewIds.includes(viewId)) return;
    document.querySelectorAll('.view-section').forEach(s => { s.classList.remove('active'); s.classList.add('hidden'); });
    const active = document.getElementById(viewId);
    if(active) { active.classList.remove('hidden'); active.classList.add('active'); AppState.currentView = viewId; }
    if (updateUrl && location.hash !== `#${viewId}`) location.hash = viewId;
}

document.addEventListener('DOMContentLoaded', () => {
    renderTemas(); renderFlashcards();
    window.addEventListener('hashchange', () => {
        const requestedView = location.hash.slice(1);
        const viewId = viewIds.includes(requestedView) ? requestedView : 'temas';
        navigateTo(viewId, false);
        if (viewId === 'pruebas' && QuizState.preguntasMezcladas.length === 0) iniciarPrueba();
        if (viewId === 'resultados') renderResultados();
    });
    const requestedView = location.hash.slice(1);
    const initialView = viewIds.includes(requestedView) ? requestedView : 'temas';
    navigateTo(initialView, false);
    if (initialView === 'pruebas') iniciarPrueba();
    if (initialView === 'resultados') renderResultados();
    if (!location.hash) location.hash = 'temas';
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.addEventListener('click', (e) => { if (e.target.innerText.includes('Pruebas')) iniciarPrueba(); });
    });
});

function renderTemas() {
    const container = document.getElementById('temas-container'); container.innerHTML = '';
    studyData.temas.forEach(tema => {
        const card = document.createElement('div'); card.className = 'tema-card';
        card.innerHTML = `<h3>${tema.titulo}</h3><p>${tema.resumen}</p><button onclick="verTema('${tema.id}')">Leer Apuntes</button>`;
        container.appendChild(card);
    });
}

function verTema(id) {
    const tema = studyData.temas.find(t => t.id === id); if (!tema) return;
    document.getElementById('temas-container').innerHTML = `<button class="btn-back" onclick="renderTemas()">⬅ Volver a Temas</button><div class="tema-contenido"><h3>${tema.titulo}</h3>${tema.contenido}</div>`;
}

function renderFlashcards() {
    const container = document.getElementById('flashcard-container'); container.innerHTML = '';
    studyData.flashcards.forEach(card => {
        const flip = document.createElement('div'); flip.className = 'flashcard';
        flip.innerHTML = `<div class="flashcard-inner" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-front"><span class="tag">${card.tema.toUpperCase()}</span><p class="pregunta">${card.pregunta}</p><span class="hint">Toca para girar</span></div>
            <div class="flashcard-back"><p class="respuesta">${card.respuesta}</p></div></div>`;
        container.appendChild(flip);
    });
}

const QuizState = { currentIndex: 0, respuestasUsuario: [], preguntasMezcladas: [] };
function iniciarPrueba() {
    QuizState.currentIndex = 0; QuizState.respuestasUsuario = [];
    QuizState.preguntasMezcladas = [...studyData.preguntas].sort(() => Math.random() - 0.5).slice(0, 12);
    renderPregunta();
}

function renderPregunta() {
    const c = document.getElementById('pruebas-container'); const idx = QuizState.currentIndex; const total = QuizState.preguntasMezcladas.length;
    if (idx >= total) { renderFinal(); return; }
    const p = QuizState.preguntasMezcladas[idx];
    c.innerHTML = `<div class="quiz-header"><span>Pregunta ${idx + 1} de ${total}</span><span class="quiz-tag">${p.tema.toUpperCase()}</span></div>
        <div class="quiz-body"><h3>${p.pregunta}</h3><div class="quiz-options">
        ${p.opciones.map((o, i) => `<button class="option-btn" onclick="guardarRespuesta(${i})">${o}</button>`).join('')}
        </div></div>`;
}

function guardarRespuesta(i) {
    const p = QuizState.preguntasMezcladas[QuizState.currentIndex];
    QuizState.respuestasUsuario.push({ pregunta: p, seleccion: i, esCorrecta: i === p.respuestaCorrecta });
    QuizState.currentIndex++; renderPregunta();
}

function renderFinal() {
    document.getElementById('pruebas-container').innerHTML = `<div class="quiz-body" style="text-align: center;"><h3>¡Prueba Finalizada! 🎉</h3>
    <button class="btn-primary" onclick="navigateTo('resultados'); renderResultados();">Ver Análisis</button></div>`;
}

function renderResultados() {
    const c = document.getElementById('resultados-container'); const r = QuizState.respuestasUsuario;
    if (r.length === 0) { c.innerHTML = '<p>No hay pruebas recientes.</p>'; return; }
    const total = r.length; const correctas = r.filter(x => x.esCorrecta).length; const pct = Math.round((correctas/total)*100);
    const temas = [...new Set(r.filter(x => !x.esCorrecta).map(x => x.pregunta.tema))];
    let html = `<div class="results-header"><div class="score-circle ${pct >= 70 ? 'score-pass' : 'score-fail'}"><h2>${pct}%</h2><p>${correctas}/${total}</p></div></div>`;
    if (temas.length > 0) html += `<div class="improvement-box"><h4>⚠️ Puntos a Mejorar</h4><ul>${temas.map(t => `<li><b>${t.toUpperCase()}</b></li>`).join('')}</ul></div>`;
    html += `<div class="review-section"><h4>Revisión Detallada</h4>`;
    r.forEach((item, i) => {
        const p = item.pregunta; const cClass = item.esCorrecta ? 'review-correct' : 'review-incorrect';
        html += `<div class="review-card ${cClass}"><p class="review-q">${i+1}. ${p.pregunta}</p>
        <p>Tu respuesta: ${p.opciones[item.seleccion]} ${item.esCorrecta ? '✅' : '❌'}</p>
        ${!item.esCorrecta ? `<p style="color:#b91c1c;">Correcta: ${p.opciones[p.respuestaCorrecta]}</p>` : ''}
        <div class="review-explanation"><small>${p.explicacion}</small></div></div>`;
    });
    html += `</div><div style="text-align:center; margin-top:2rem;"><button class="btn-primary" onclick="navigateTo('pruebas'); iniciarPrueba();">Repetir Prueba</button></div>`;
    c.innerHTML = html;
}