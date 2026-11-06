const studyData = {
    temas: [
        {
            id: 'api-web',
            titulo: 'APIs web y arquitectura HTTP',
            resumen: 'Cómo se comunican clientes y servicios, y cómo se diseña una API REST.',
            contenido: `
                <h3>El modelo cliente-servidor</h3>
                <p>Una aplicación web suele separar el cliente, que solicita una operación, del servidor, que procesa la petición y devuelve una respuesta. HTTP define el intercambio mediante peticiones y respuestas.</p>
                <h3>Diseño de una API REST</h3>
                <p>Una API expone recursos mediante rutas y métodos HTTP. Las rutas de ejemplo de esta guía usan el prefijo <code>/api</code>; los nombres concretos dependen del diseño del proyecto.</p>
                <ul>
                    <li><b>GET:</b> consultar un recurso.</li>
                    <li><b>POST:</b> crear un recurso o iniciar una operación.</li>
                    <li><b>PUT/PATCH:</b> reemplazar o modificar un recurso.</li>
                    <li><b>DELETE:</b> solicitar la eliminación de un recurso.</li>
                </ul>
                <p>Una respuesta HTTP incluye un código de estado y, frecuentemente, una representación del resultado. Mantener contratos claros y consistentes facilita la integración entre cliente y backend.</p>
            `
        },
        {
            id: 'spring',
            titulo: 'Backend con Spring Boot',
            resumen: 'Controladores, configuración y cadena de filtros de una API Spring.',
            contenido: `
                <h3>Organización del backend</h3>
                <p>Spring Boot permite construir servicios Java mediante componentes configurables. Un controlador REST recibe peticiones HTTP y delega el trabajo en la lógica de la aplicación.</p>
                <h3>Cadena de filtros</h3>
                <p>Spring Security procesa las peticiones antes de que lleguen a los controladores. Los filtros pueden autenticar, autorizar o rechazar una petición.</p>
                <ul>
                    <li><b>SecurityFilterChain:</b> declara reglas de acceso y el orden de los filtros.</li>
                    <li><b>OncePerRequestFilter:</b> base habitual para un filtro que se ejecuta una vez por petición.</li>
                    <li><b>SecurityContextHolder:</b> mantiene la autenticación asociada a la petición actual.</li>
                </ul>
                <p>En una API stateless, un filtro puede leer el token de autenticación, validar su firma y expiración y, si es válido, establecer la identidad y autoridades del usuario.</p>
            `
        },
        {
            id: 'seguridad',
            titulo: 'Seguridad de aplicaciones y APIs',
            resumen: 'Autenticación, autorización, JWT, roles, límites y protección de cuentas.',
            contenido: `
                <h3>Autenticación y autorización</h3>
                <p>La autenticación comprueba quién es el usuario; la autorización determina qué acciones puede realizar. RBAC (control de acceso basado en roles) agrupa permisos en roles.</p>
                <p>En Spring Security, <code>hasRole("ADMIN")</code> busca la autoridad <code>ROLE_ADMIN</code>. Las rutas públicas deben declararse explícitamente y el resto puede requerir autenticación.</p>
                <h3>Tokens y errores de inicio de sesión</h3>
                <p>Un filtro JWT verifica la firma y la expiración antes de aceptar las afirmaciones del token. Los errores de credenciales deben ser genéricos para no revelar si una cuenta existe. Una API puede llevar registro de intentos fallidos y aplicar un bloqueo temporal configurable.</p>
                <h3>Rate limiting</h3>
                <p>Limitar peticiones por cliente en una ventana de tiempo ayuda a controlar abuso y fuerza bruta. Bucket4j implementa el algoritmo token bucket; el límite es una política del sistema, no un valor universal. Al agotarse el límite, una API puede responder <code>429 Too Many Requests</code>.</p>
                <h3>Protección en producción</h3>
                <ul>
                    <li>Usa HTTPS para proteger el tráfico en tránsito.</li>
                    <li>Guarda secretos fuera del código y limita su acceso.</li>
                    <li>Desactiva CSRF solo cuando la arquitectura de la API y su estrategia de autenticación lo justifiquen; no es una decisión automática para toda aplicación.</li>
                    <li>Confía en cabeceras reenviadas únicamente cuando provengan de proxies controlados.</li>
                </ul>
            `
        },
        {
            id: 'despliegue',
            titulo: 'Despliegue y proxies inversos',
            resumen: 'Diferencias entre local y nube, cabeceras reenviadas y operación segura.',
            contenido: `
                <h3>Del entorno local a la nube</h3>
                <p>En una plataforma como Render, AWS o Heroku, un proxy inverso o balanceador puede recibir primero la petición y reenviarla a Spring Boot. Por eso <code>request.getRemoteAddr()</code> puede identificar al proxy y no al cliente original.</p>
                <h3>Cabeceras reenviadas</h3>
                <p>El proxy puede añadir información como <code>X-Forwarded-For</code>. Spring Boot puede procesar cabeceras reenviadas con <code>server.forward-headers-strategy=framework</code>. Esta configuración debe acompañarse de una topología de confianza: acepta esos valores solo de proxies conocidos y configurados, ya que el cliente no confiable podría falsificarlos.</p>
                <h3>Verificación del despliegue</h3>
                <ul>
                    <li>Configura variables de entorno para valores sensibles y específicos del entorno.</li>
                    <li>Verifica salud, logs y códigos de respuesta después del despliegue.</li>
                    <li>Comprueba HTTPS, reglas de acceso y el comportamiento de la aplicación detrás del proxy.</li>
                    <li>Evita depender de la IP cliente para decisiones sensibles si la cadena de proxies no está correctamente controlada.</li>
                </ul>
            `
        },
        {
            id: 'http',
            titulo: 'Códigos de estado y contratos de API',
            resumen: 'Comunica resultados, validaciones y errores mediante códigos HTTP adecuados.',
            contenido: `
                <h3>Estados frecuentes</h3>
                <ul>
                    <li><b>200 OK:</b> operación exitosa.</li>
                    <li><b>400 Bad Request:</b> datos o formato de petición inválidos.</li>
                    <li><b>401 Unauthorized:</b> falta autenticación válida o las credenciales no son válidas.</li>
                    <li><b>403 Forbidden:</b> el usuario autenticado no tiene permiso.</li>
                    <li><b>429 Too Many Requests:</b> se alcanzó un límite de solicitudes.</li>
                </ul>
                <p>Un contrato de API coherente usa estados y mensajes que describen el resultado sin exponer información interna. En particular, los mensajes de autenticación deben evitar la enumeración de usuarios.</p>
            `
        }
    ],
    flashcards: [
        { id: 1, tema: 'api-web', pregunta: '¿Qué describe una petición HTTP?', respuesta: 'Una operación solicitada por un cliente, con método, ruta y datos opcionales.' },
        { id: 2, tema: 'api-web', pregunta: '¿Para qué se usa GET en una API REST?', respuesta: 'Para consultar o recuperar una representación de un recurso.' },
        { id: 3, tema: 'api-web', pregunta: '¿Qué es el contrato de una API?', respuesta: 'La definición de rutas, métodos, datos y respuestas que permite a los clientes integrarse de forma consistente.' },
        { id: 4, tema: 'spring', pregunta: '¿Qué responsabilidad tiene un controlador REST?', respuesta: 'Recibir solicitudes HTTP y coordinar la respuesta de la aplicación, delegando la lógica correspondiente.' },
        { id: 5, tema: 'spring', pregunta: '¿Qué configura SecurityFilterChain?', respuesta: 'Las reglas de seguridad y los filtros que procesan las solicitudes antes de llegar al controlador.' },
        { id: 6, tema: 'spring', pregunta: '¿Qué hace OncePerRequestFilter?', respuesta: 'Proporciona una base para ejecutar un filtro una vez por solicitud.' },
        { id: 7, tema: 'seguridad', pregunta: '¿Cuál es la diferencia entre autenticación y autorización?', respuesta: 'Autenticación verifica identidad; autorización determina los recursos o acciones permitidos.' },
        { id: 8, tema: 'seguridad', pregunta: '¿Qué autoridad busca hasRole("ADMIN") en Spring Security?', respuesta: 'ROLE_ADMIN, porque Spring agrega el prefijo ROLE_ al nombre del rol.' },
        { id: 9, tema: 'seguridad', pregunta: '¿Qué valida un filtro JWT antes de confiar en un token?', respuesta: 'Como mínimo, su firma y expiración; después establece la autenticación si es válido.' },
        { id: 10, tema: 'seguridad', pregunta: '¿Qué comunica HTTP 429?', respuesta: 'Que el cliente superó el límite de solicitudes permitido.' },
        { id: 11, tema: 'seguridad', pregunta: '¿Para qué sirve un mensaje genérico de error de inicio de sesión?', respuesta: 'Evita revelar si una cuenta existe y dificulta la enumeración de usuarios.' },
        { id: 12, tema: 'despliegue', pregunta: '¿Por qué getRemoteAddr() puede no ser la IP del cliente en la nube?', respuesta: 'La conexión inmediata puede proceder del proxy inverso o balanceador.' },
        { id: 13, tema: 'despliegue', pregunta: '¿Qué información suele transportar X-Forwarded-For?', respuesta: 'Direcciones IP asociadas a los clientes que atravesaron proxies.' },
        { id: 14, tema: 'despliegue', pregunta: '¿Cuándo se debe confiar en cabeceras reenviadas?', respuesta: 'Solo al recibirlas desde proxies controlados y configurados como confiables.' },
        { id: 15, tema: 'http', pregunta: '¿Qué diferencia 401 de 403?', respuesta: '401 indica que falta autenticación válida; 403 que la identidad autenticada no tiene permiso.' },
        { id: 16, tema: 'http', pregunta: '¿Qué suele indicar 400 Bad Request?', respuesta: 'Que la petición contiene datos inválidos o no cumple el formato esperado.' }
    ],
    preguntas: [
        { id: 1, tema: 'api-web', tipo: 'directa', pregunta: '¿Qué método HTTP se usa normalmente para consultar un recurso sin modificarlo?', opciones: ['GET', 'DELETE', 'PATCH', 'POST'], respuestaCorrecta: 0, explicacion: 'GET solicita una representación del recurso. Los demás métodos se usan típicamente para crear, modificar o eliminar.' },
        { id: 2, tema: 'api-web', tipo: 'directa', pregunta: '¿Cuál es el propósito principal de un contrato de API?', opciones: ['Definir cómo interactúan clientes y servicio', 'Cifrar automáticamente la base de datos', 'Sustituir el servidor web', 'Asignar direcciones IP a los clientes'], respuestaCorrecta: 0, explicacion: 'El contrato documenta rutas, métodos, datos y respuestas para que los consumidores sepan cómo integrar el servicio.' },
        { id: 3, tema: 'api-web', tipo: 'vf', pregunta: 'Una API REST suele exponer recursos mediante rutas y métodos HTTP.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 0, explicacion: 'Las rutas identifican recursos y los métodos HTTP expresan la operación solicitada.' },
        { id: 4, tema: 'api-web', tipo: 'directa', pregunta: '¿Qué significa que una petición sea parte del intercambio cliente-servidor?', opciones: ['El cliente solicita una operación y el servidor responde', 'El servidor siempre inicia la conexión del navegador', 'El cliente controla directamente la base de datos', 'La respuesta no necesita un estado HTTP'], respuestaCorrecta: 0, explicacion: 'En el modelo web usual, el cliente envía la petición y el servidor devuelve un resultado HTTP.' },
        { id: 5, tema: 'spring', tipo: 'directa', pregunta: '¿Qué componente de Spring Security define reglas y cadena de filtros web?', opciones: ['SecurityFilterChain', 'LocalDateTime', 'ConcurrentHashMap', 'RestTemplate'], respuestaCorrecta: 0, explicacion: 'SecurityFilterChain configura cómo se protegen y procesan las solicitudes HTTP.' },
        { id: 6, tema: 'spring', tipo: 'directa', pregunta: '¿Qué describe OncePerRequestFilter?', opciones: ['Un filtro que se ejecuta una vez por solicitud', 'Un controlador que solo acepta POST', 'Una base de datos de sesiones', 'Una estrategia de caché para respuestas'], respuestaCorrecta: 0, explicacion: 'La clase es una base para lógica de filtro que debe procesarse una sola vez por petición.' },
        { id: 7, tema: 'spring', tipo: 'vf', pregunta: 'Los filtros de seguridad pueden procesar una solicitud antes de que llegue a un controlador.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 0, explicacion: 'La cadena de filtros intercepta y procesa la solicitud antes de su despacho al controlador.' },
        { id: 8, tema: 'spring', tipo: 'directa', pregunta: '¿Qué debe hacer el filtro después de validar correctamente un JWT?', opciones: ['Establecer la autenticación del usuario en el contexto de seguridad', 'Desactivar todos los permisos', 'Cambiar el método HTTP a GET', 'Eliminar la ruta solicitada'], respuestaCorrecta: 0, explicacion: 'Si el token es válido, el filtro puede construir la autenticación y establecerla en SecurityContextHolder.' },
        { id: 9, tema: 'seguridad', tipo: 'directa', pregunta: '¿Cuál es la diferencia correcta entre autenticación y autorización?', opciones: ['Identidad frente a permisos', 'Cifrado frente a compresión', 'Ruta frente a dominio', 'Cliente frente a proxy'], respuestaCorrecta: 0, explicacion: 'Autenticar determina quién es el usuario; autorizar decide qué tiene permitido hacer.' },
        { id: 10, tema: 'seguridad', tipo: 'directa', pregunta: 'En Spring Security, ¿qué autoridad corresponde a hasRole("ADMIN")?', opciones: ['ROLE_ADMIN', 'ADMIN_ONLY', 'AUTH_ADMIN', 'ROLE_USER'], respuestaCorrecta: 0, explicacion: 'hasRole agrega automáticamente el prefijo ROLE_ al nombre indicado.' },
        { id: 11, tema: 'seguridad', tipo: 'vf', pregunta: 'Un mensaje de inicio de sesión distinto para usuario inexistente y contraseña errónea facilita la enumeración de cuentas.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 0, explicacion: 'La diferencia revela si una cuenta existe. Un mensaje genérico reduce esa filtración de información.' },
        { id: 12, tema: 'seguridad', tipo: 'directa', pregunta: '¿Qué código HTTP corresponde típicamente a solicitudes rechazadas por rate limiting?', opciones: ['429', '200', '301', '304'], respuestaCorrecta: 0, explicacion: '429 Too Many Requests comunica que se superó un límite de solicitudes.' },
        { id: 13, tema: 'seguridad', tipo: 'directa', pregunta: '¿Qué algoritmo describe Bucket4j en el material de estudio?', opciones: ['Token Bucket', 'Round Robin', 'Quick Sort', 'Bellman-Ford'], respuestaCorrecta: 0, explicacion: 'Bucket4j implementa el algoritmo token bucket para controlar la frecuencia de solicitudes.' },
        { id: 14, tema: 'seguridad', tipo: 'vf', pregunta: 'Desactivar CSRF es apropiado automáticamente para cualquier aplicación web.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 1, explicacion: 'La decisión depende de la arquitectura y de cómo se autentican las solicitudes; no debe desactivarse sin evaluar el contexto.' },
        { id: 15, tema: 'seguridad', tipo: 'directa', pregunta: '¿Qué estado indica que el usuario está autenticado, pero no tiene permiso para el recurso?', opciones: ['403 Forbidden', '401 Unauthorized', '400 Bad Request', '429 Too Many Requests'], respuestaCorrecta: 0, explicacion: '403 indica que el servidor entendió la petición, pero la identidad actual no está autorizada.' },
        { id: 16, tema: 'seguridad', tipo: 'vf', pregunta: 'Un token JWT debe validarse antes de usar sus afirmaciones para establecer la identidad.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 0, explicacion: 'La firma y la expiración deben verificarse; de otro modo no se debe confiar en las afirmaciones del token.' },
        { id: 17, tema: 'despliegue', tipo: 'directa', pregunta: '¿Por qué puede cambiar la IP observada por la aplicación al desplegarla detrás de un proxy?', opciones: ['La conexión inmediata puede provenir del proxy', 'HTTP elimina las direcciones IP', 'Spring siempre aleatoriza la IP', 'El DNS convierte la IP en un código 429'], respuestaCorrecta: 0, explicacion: 'El proxy abre la conexión hacia la aplicación, así que getRemoteAddr() puede devolver la dirección del proxy.' },
        { id: 18, tema: 'despliegue', tipo: 'vf', pregunta: 'Conviene aceptar X-Forwarded-For de cualquier cliente de Internet como fuente confiable.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 1, explicacion: 'Un cliente puede falsificar la cabecera. Solo se debe confiar en valores suministrados por proxies controlados.' },
        { id: 19, tema: 'despliegue', tipo: 'directa', pregunta: '¿Qué propiedad de Spring Boot se menciona para procesar cabeceras reenviadas?', opciones: ['server.forward-headers-strategy=framework', 'spring.datasource.enabled=false', 'server.port=443', 'security.jwt.disabled=true'], respuestaCorrecta: 0, explicacion: 'La propiedad indicada habilita el procesamiento de cabeceras reenviadas mediante la estrategia framework.' },
        { id: 20, tema: 'despliegue', tipo: 'vf', pregunta: 'La configuración para procesar cabeceras reenviadas debe considerar qué proxies son confiables.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 0, explicacion: 'La aplicación debe aceptar esas cabeceras solo en una topología donde el proxy de confianza las establece y controla.' },
        { id: 21, tema: 'http', tipo: 'directa', pregunta: '¿Qué estado indica que los datos de la petición son inválidos?', opciones: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '200 OK'], respuestaCorrecta: 0, explicacion: '400 comunica que el servidor no puede procesar la petición debido a datos o formato inválidos.' },
        { id: 22, tema: 'http', tipo: 'directa', pregunta: '¿Qué código representa normalmente el éxito de una operación?', opciones: ['200 OK', '400 Bad Request', '401 Unauthorized', '429 Too Many Requests'], respuestaCorrecta: 0, explicacion: '200 OK indica que la petición se procesó satisfactoriamente.' },
        { id: 23, tema: 'http', tipo: 'vf', pregunta: '401 y 403 significan exactamente lo mismo y son intercambiables.', opciones: ['Verdadero', 'Falso'], respuestaCorrecta: 1, explicacion: '401 se refiere a autenticación faltante o no válida; 403 indica que la identidad no está autorizada.' },
        { id: 24, tema: 'http', tipo: 'directa', pregunta: '¿Qué principio ayuda a evitar revelar si una cuenta existe al fallar el inicio de sesión?', opciones: ['Usar un mensaje genérico de credenciales inválidas', 'Devolver un estado distinto para cada nombre', 'Incluir el hash de contraseña en la respuesta', 'Revelar el rol esperado del usuario'], respuestaCorrecta: 0, explicacion: 'Un mensaje genérico evita que la respuesta confirme o niegue la existencia de una cuenta.' }
    ]
};
