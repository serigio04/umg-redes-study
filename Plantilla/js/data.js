// Plantilla base para rellenar con cualquier materia
const studyData = {
    temas: [
        {
            id: 'tema1',
            titulo: 'Ejemplo de Tema',
            resumen: 'Breve resumen del tema para la tarjeta principal.',
            contenido: `<h3>Subtítulo 1</h3><p>Reemplaza este contenido con tus apuntes utilizando etiquetas HTML como &lt;p&gt;, &lt;ul&gt; y &lt;b&gt;...</p>`
        }
    ],
    flashcards: [
        { id: 1, tema: 'tema1', pregunta: '¿Pregunta de concepto rápido?', respuesta: 'Respuesta rápida que aparece al girar la tarjeta.' }
    ],
    preguntas: [
        {
            id: 1,
            tema: 'tema1',
            tipo: 'directa', // o 'vf'
            pregunta: '¿Cuál es la respuesta correcta para este problema?',
            opciones: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
            respuestaCorrecta: 1, // Índice de la opción correcta (0-based, aquí 1 = 'Opción B')
            explicacion: 'Explicación detallada de por qué la Opción B es correcta.'
        }
    ]
};