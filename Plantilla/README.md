# Plantilla de guías interactivas

Cada materia vive en su propia carpeta y mantiene sus propios apuntes en `js/data.js`. La navegación de las secciones de cada guía es una SPA y se refleja en el hash de la URL (`#temas`, `#flashcards`, `#pruebas` y `#resultados`).

## Agregar una materia

1. Copia la carpeta `Plantilla` en la raíz del proyecto y renómbrala con el nombre de la materia (por ejemplo, `Fisica`).
2. Edita `js/data.js`, manteniendo las estructuras `temas`, `flashcards` y `preguntas`. Usa IDs de tema válidos en tarjetas y preguntas.
3. Actualiza el título, la identidad visual y las variables de color de la materia en `index.html` y `css/styles.css`.
4. Agrega una tarjeta al dashboard en el `index.html` raíz con un enlace a `NombreDeLaMateria/`.
5. Abre el dashboard raíz y entra a la guía. Cada sección puede enlazarse directamente con su hash.

La aplicación genera las tarjetas y evaluaciones a partir de los datos locales, mezcla el banco y limita cada intento a un máximo de 12 preguntas. No requiere dependencias ni conexión a internet.
