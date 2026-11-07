const studyData = {
    temas: [
        {
            id: 'contadores-asincronos',
            titulo: 'Contadores asíncronos',
            resumen: 'Cómo cuenta una cadena de flip-flops y por qué el retardo se acumula entre etapas.',
            contenido: `<h3>Principio de operación</h3>
                <p>En un contador asíncrono, el reloj externo acciona directamente solo al primer flip-flop, que representa el bit menos significativo (LSB). La transición de salida de cada etapa dispara la siguiente, por lo que los cambios no ocurren simultáneamente.</p>
                <h3>Retardo de propagación</h3>
                <p>Cada flip-flop necesita un tiempo para responder. Como las etapas se activan en cascada, el retardo total crece con la cantidad de etapas. Esto limita la frecuencia máxima y puede producir estados transitorios durante el conteo.</p>
                <ul><li>Ventaja: estructura sencilla.</li><li>Limitación: el retardo se acumula de una etapa a la siguiente.</li><li>Al analizarlo, identifica qué transición de salida activa cada flip-flop.</li></ul>`
        },
        {
            id: 'maquinas-estados',
            titulo: 'Máquinas de estados y contadores síncronos',
            resumen: 'Representa secuencias con estados y diseña la lógica que determina la transición siguiente.',
            contenido: `<h3>Máquina de estados</h3>
                <p>Es un circuito secuencial formado por memoria (flip-flops) y lógica combinacional. El estado futuro depende del estado actual y de las entradas presentes.</p>
                <h3>Contadores síncronos</h3>
                <p>El reloj se distribuye en paralelo a todos los flip-flops, por lo que las salidas cambian coordinadas con el flanco activo. La lógica combinacional decide qué bits deben cambiar. Para el conteo descendente, un bit cambia cuando los bits de menor peso están en cero.</p>
                <h3>Procedimiento de diseño</h3>
                <ol><li>Dibuja el diagrama de estados.</li><li>Construye la tabla de estado actual y estado siguiente.</li><li>Obtén las excitaciones requeridas para los flip-flops (por ejemplo, D, J o K).</li><li>Simplifica las ecuaciones con mapas de Karnaugh.</li><li>Implementa la lógica combinacional y los flip-flops.</li></ol>
                <p>Los estados no utilizados pueden marcarse como condiciones “no importa” (X) si el diseño permite aprovecharlos en la simplificación.</p>`
        },
        {
            id: 'registros-desplazamiento',
            titulo: 'Registros de desplazamiento',
            resumen: 'Almacenan temporalmente bits y los desplazan entre flip-flops al ritmo del reloj.',
            contenido: `<h3>Funcionamiento</h3>
                <p>Un registro de desplazamiento conecta flip-flops en cascada. En cada flanco activo, el dato pasa a la etapa siguiente, de modo que puede almacenarse temporalmente o desplazarse a izquierda o derecha.</p>
                <h3>Transferencia de datos</h3>
                <ul><li><b>Serie-serial:</b> los bits entran y salen uno por ciclo.</li><li><b>Serie-paralelo:</b> los bits se cargan secuencialmente y se leen simultáneamente desde las salidas de las etapas.</li></ul>
                <p>Los diagramas de tiempo muestran el reloj, los datos de entrada y cómo cada bit avanza una etapa por flanco. Para analizar un registro de n bits, sigue el valor de cada flip-flop ciclo a ciclo.</p>`
        },
        {
            id: 'contadores-registro',
            titulo: 'Contadores basados en registros',
            resumen: 'La realimentación transforma un registro de desplazamiento en un generador de secuencias cíclicas.',
            contenido: `<h3>Contador en anillo</h3>
                <p>La salida directa de la última etapa se conecta a la entrada de la primera. Con una inicialización de un solo “1” y los demás bits en cero, ese bit circula y un registro de n etapas recorre n estados.</p>
                <h3>Contador Johnson</h3>
                <p>La salida invertida de la última etapa se realimenta a la entrada de la primera. La secuencia primero llena el registro con unos y después con ceros, generando 2n estados para n flip-flops.</p>
                <p>En ambos circuitos la secuencia depende del estado inicial; por eso es importante considerar la inicialización al verificar sus estados.</p>`
        },
        {
            id: 'matriz-memoria',
            titulo: 'Organización de la memoria',
            resumen: 'Direcciones, decodificadores, líneas de palabra y líneas de bit organizan el acceso a las celdas.',
            contenido: `<h3>Lectura y escritura</h3>
                <ol><li>El bus de direcciones llega al decodificador.</li><li>El decodificador selecciona una fila mediante la línea de palabra (wordline).</li><li>Las celdas de esa fila se conectan a las columnas o líneas de bit (bitlines).</li><li>Los circuitos de lectura extraen el dato, o los de escritura actualizan las celdas seleccionadas.</li></ol>
                <h3>Capacidad</h3>
                <p>Con k bits de dirección se pueden seleccionar 2<sup>k</sup> posiciones. Si cada posición almacena n bits, la organización se expresa como 2<sup>k</sup> × n bits.</p>
                <p>La wordline selecciona la fila; las bitlines transportan los valores de las celdas hacia o desde los circuitos de datos.</p>`
        },
        {
            id: 'tipos-memoria',
            titulo: 'RAM, ROM y memoria Flash',
            resumen: 'Compara volatilidad, tecnología de almacenamiento y uso de las principales memorias semiconductoras.',
            contenido: `<h3>RAM</h3>
                <p>Permite leer y escribir posiciones de memoria y es volátil: necesita alimentación para conservar los datos. La <b>SRAM</b> almacena cada bit mediante latches y no requiere refresco mientras tenga energía. La <b>DRAM</b> almacena carga en condensadores y requiere refrescos periódicos.</p>
                <h3>ROM y Flash</h3>
                <p>La ROM es no volátil y se utiliza principalmente para lectura. La memoria Flash también conserva datos sin alimentación y utiliza transistores con puerta flotante para almacenar carga eléctrica.</p>
                <p>La presencia de carga modifica el comportamiento eléctrico de la celda. La convención que relaciona carga con 0 o 1 depende del diseño y del esquema de lectura; el punto clave es que el estado almacenado persiste aun cuando se desconecta la alimentación.</p>`
        }
    ],
    flashcards: [
        { id: 1, tema: 'contadores-asincronos', pregunta: '¿Qué flip-flop recibe directamente el reloj externo en un contador asíncrono?', respuesta: 'El primer flip-flop, correspondiente al bit menos significativo (LSB).' },
        { id: 2, tema: 'contadores-asincronos', pregunta: '¿Qué limita la frecuencia máxima de un contador asíncrono?', respuesta: 'El retardo de propagación acumulado a través de sus etapas.' },
        { id: 3, tema: 'maquinas-estados', pregunta: '¿Qué determina el estado futuro de una máquina de estados?', respuesta: 'El estado actual y las entradas presentes.' },
        { id: 4, tema: 'maquinas-estados', pregunta: '¿Qué herramienta se usa para simplificar las ecuaciones de excitación?', respuesta: 'Los mapas de Karnaugh.' },
        { id: 5, tema: 'registros-desplazamiento', pregunta: '¿Qué hace un registro de desplazamiento en cada flanco activo?', respuesta: 'Transfiere cada bit a la etapa siguiente, según la dirección de desplazamiento.' },
        { id: 6, tema: 'registros-desplazamiento', pregunta: '¿Qué caracteriza una transferencia serie-paralelo?', respuesta: 'Los datos entran secuencialmente y las salidas de las etapas se leen en paralelo.' },
        { id: 7, tema: 'contadores-registro', pregunta: '¿Cuántos estados genera idealmente un contador Johnson de n etapas?', respuesta: '2n estados.' },
        { id: 8, tema: 'contadores-registro', pregunta: '¿Cuántos estados recorre un contador en anillo de n etapas con un único 1?', respuesta: 'n estados, uno por cada posición del bit.' },
        { id: 9, tema: 'matriz-memoria', pregunta: '¿Qué selecciona la línea de palabra (wordline)?', respuesta: 'La fila de celdas activada por el decodificador de direcciones.' },
        { id: 10, tema: 'matriz-memoria', pregunta: '¿Cuántas posiciones direcciona un bus de k bits?', respuesta: '2^k posiciones.' },
        { id: 11, tema: 'tipos-memoria', pregunta: '¿Qué necesita la DRAM para conservar correctamente los datos mientras está alimentada?', respuesta: 'Ciclos periódicos de refresco debido al almacenamiento en condensadores.' },
        { id: 12, tema: 'tipos-memoria', pregunta: '¿Qué propiedad comparten RAM, ROM y Flash respecto a la volatilidad?', respuesta: 'RAM es volátil; ROM y Flash son no volátiles.' }
    ],
    preguntas: [
        {
            id: 1, tema: 'contadores-asincronos', tipo: 'directa',
            pregunta: 'En un contador asíncrono, ¿qué señal activa directamente el segundo flip-flop?',
            opciones: ['El reloj externo conectado en paralelo', 'La transición de salida del primer flip-flop', 'La señal de reset únicamente', 'La salida del decodificador de direcciones'],
            respuestaCorrecta: 1,
            explicacion: 'En la estructura asíncrona, el reloj externo activa la primera etapa y la salida de una etapa dispara la siguiente, creando una propagación en cascada.'
        },
        {
            id: 2, tema: 'contadores-asincronos', tipo: 'vf',
            pregunta: 'El retardo total de un contador asíncrono puede aumentar al añadir etapas.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'Cada etapa añade su propio retardo de propagación, por lo que el retardo de la cadena crece con el número de flip-flops.'
        },
        {
            id: 3, tema: 'contadores-asincronos', tipo: 'directa',
            pregunta: '¿Cuál es una consecuencia práctica del retardo de propagación acumulado?',
            opciones: ['Aumenta la frecuencia máxima sin límite', 'Reduce la frecuencia máxima de operación', 'Elimina la necesidad de flip-flops', 'Convierte el contador en una memoria ROM'],
            respuestaCorrecta: 1,
            explicacion: 'La siguiente transición debe esperar a que se propague la anterior, así que existe un límite de velocidad de operación.'
        },
        {
            id: 4, tema: 'contadores-asincronos', tipo: 'directa',
            pregunta: '¿Qué bit recibe el reloj externo en la primera etapa del contador?',
            opciones: ['El bit más significativo (MSB)', 'El bit menos significativo (LSB)', 'Todos los bits simultáneamente', 'Ningún bit'],
            respuestaCorrecta: 1,
            explicacion: 'La primera etapa representa el LSB y es la única que recibe directamente el reloj externo en la arquitectura descrita.'
        },
        {
            id: 5, tema: 'maquinas-estados', tipo: 'directa',
            pregunta: '¿De qué depende el estado futuro en una máquina de estados?',
            opciones: ['Solo del reloj, sin importar entradas ni estado actual', 'Del estado actual y de las entradas presentes', 'Solo del número de flip-flops', 'Únicamente del estado inicial'],
            respuestaCorrecta: 1,
            explicacion: 'La lógica combinacional calcula el próximo estado usando el estado almacenado y las entradas presentes.'
        },
        {
            id: 6, tema: 'maquinas-estados', tipo: 'vf',
            pregunta: 'En un contador síncrono, el reloj se distribuye a todos los flip-flops en paralelo.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'El reloj común hace que las etapas reciban el flanco activo simultáneamente, a diferencia de una cadena asíncrona.'
        },
        {
            id: 7, tema: 'maquinas-estados', tipo: 'directa',
            pregunta: '¿Cuál es el orden correcto de los primeros pasos para diseñar una secuencia de estados?',
            opciones: ['Implementar hardware, dibujar el diagrama y luego definir estados', 'Dibujar el diagrama y construir la tabla de estado siguiente', 'Simplificar con Karnaugh antes de definir estados', 'Elegir las compuertas y omitir la tabla de transiciones'],
            respuestaCorrecta: 1,
            explicacion: 'Primero se especifica la secuencia con el diagrama de estados y la tabla de estado siguiente; luego se derivan excitaciones y ecuaciones.'
        },
        {
            id: 8, tema: 'maquinas-estados', tipo: 'directa',
            pregunta: '¿Para qué se usan las condiciones “no importa” (X) en el diseño descrito?',
            opciones: ['Para indicar que el reloj está desconectado', 'Para ayudar a simplificar ecuaciones al agrupar en mapas de Karnaugh', 'Para reemplazar todos los estados válidos', 'Para aumentar el número de flip-flops automáticamente'],
            respuestaCorrecta: 1,
            explicacion: 'Los estados que no pertenecen a la secuencia pueden tratarse como condiciones no importa para encontrar agrupaciones más simples, si es seguro hacerlo.'
        },
        {
            id: 9, tema: 'registros-desplazamiento', tipo: 'directa',
            pregunta: '¿Qué sucede con los datos de un registro de desplazamiento en cada flanco activo?',
            opciones: ['Cada dato avanza a la etapa siguiente', 'Todos los datos se borran siempre', 'El reloj se convierte en una dirección', 'Las etapas dejan de estar conectadas'],
            respuestaCorrecta: 0,
            explicacion: 'Los flip-flops están conectados en cascada y cada flanco activo desplaza el contenido de una etapa hacia la siguiente.'
        },
        {
            id: 10, tema: 'registros-desplazamiento', tipo: 'vf',
            pregunta: 'En una transferencia serie-paralelo, los bits entran uno por ciclo y las salidas pueden leerse simultáneamente.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'La entrada es serial, mientras que las salidas de las etapas permiten obtener el conjunto de bits en paralelo.'
        },
        {
            id: 11, tema: 'registros-desplazamiento', tipo: 'directa',
            pregunta: '¿Qué representa un diagrama de tiempos para un registro?',
            opciones: ['La ubicación física de las celdas de memoria', 'La evolución temporal del reloj y de los datos por las etapas', 'El costo de cada flip-flop', 'La lista de direcciones de una ROM'],
            respuestaCorrecta: 1,
            explicacion: 'Un diagrama de tiempos permite seguir cuándo entra cada bit y cómo se desplaza por las etapas en relación con el reloj.'
        },
        {
            id: 12, tema: 'registros-desplazamiento', tipo: 'directa',
            pregunta: '¿Cuál es una función principal de un registro de desplazamiento?',
            opciones: ['Almacenar temporalmente y desplazar datos', 'Decodificar direcciones de red', 'Refrescar celdas DRAM', 'Generar exclusivamente señales analógicas'],
            respuestaCorrecta: 0,
            explicacion: 'Estos registros sirven tanto para almacenamiento temporal como para mover datos entre etapas sincronizadas por el reloj.'
        },
        {
            id: 13, tema: 'contadores-registro', tipo: 'directa',
            pregunta: '¿Qué realimentación define al contador Johnson descrito?',
            opciones: ['La salida directa del primer flip-flop hacia todos los demás', 'La salida invertida de la última etapa hacia la entrada de la primera', 'Una dirección de memoria hacia la entrada D', 'El reloj invertido hacia la salida Q'],
            respuestaCorrecta: 1,
            explicacion: 'El contador Johnson conecta la salida complementada de la última etapa con la entrada de la primera.'
        },
        {
            id: 14, tema: 'contadores-registro', tipo: 'directa',
            pregunta: 'Un contador Johnson de 5 flip-flops genera, según la regla 2n, ¿cuántos estados?',
            opciones: ['5', '7', '10', '32'],
            respuestaCorrecta: 2,
            explicacion: 'Al sustituir n = 5 en 2n se obtienen 10 estados para la secuencia Johnson descrita.'
        },
        {
            id: 15, tema: 'contadores-registro', tipo: 'vf',
            pregunta: 'En un contador en anillo de n etapas con un único 1 circulante se recorren n estados.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'El 1 ocupa sucesivamente cada una de las n etapas, de modo que la secuencia contiene n estados.'
        },
        {
            id: 16, tema: 'contadores-registro', tipo: 'directa',
            pregunta: '¿Qué se conecta para formar el contador en anillo clásico?',
            opciones: ['La salida directa de la última etapa con la entrada de la primera', 'La salida de cada etapa a una wordline', 'La salida invertida de cada etapa a una bitline', 'La entrada del reloj con el bus de direcciones'],
            respuestaCorrecta: 0,
            explicacion: 'La realimentación directa de la última etapa a la primera cierra el recorrido del bit circulante.'
        },
        {
            id: 17, tema: 'matriz-memoria', tipo: 'directa',
            pregunta: '¿Qué componente activa la fila de memoria indicada por la dirección?',
            opciones: ['El decodificador de direcciones', 'El latch de salida del contador', 'El condensador de refresco', 'La salida paralela del registro'],
            respuestaCorrecta: 0,
            explicacion: 'El decodificador interpreta la dirección y activa la línea de palabra correspondiente a una fila.'
        },
        {
            id: 18, tema: 'matriz-memoria', tipo: 'directa',
            pregunta: '¿Cuál es la función principal de las líneas de bit (bitlines)?',
            opciones: ['Seleccionar por sí solas la dirección de fila', 'Conectar las celdas seleccionadas con los circuitos de lectura o escritura', 'Generar los flancos de reloj', 'Almacenar el estado de la máquina'],
            respuestaCorrecta: 1,
            explicacion: 'Las bitlines enlazan las celdas de la fila seleccionada con los circuitos que leen o escriben los datos.'
        },
        {
            id: 19, tema: 'matriz-memoria', tipo: 'vf',
            pregunta: 'Una wordline selecciona una fila y las bitlines transportan los datos de las celdas.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'La selección de fila corresponde a la wordline; las bitlines sirven para el intercambio de datos con las celdas.'
        },
        {
            id: 20, tema: 'matriz-memoria', tipo: 'directa',
            pregunta: '¿Cuántas posiciones distintas se pueden seleccionar con 6 bits de dirección?',
            opciones: ['6', '12', '32', '64'],
            respuestaCorrecta: 3,
            explicacion: 'k bits permiten seleccionar 2^k posiciones. Para k = 6, 2^6 = 64 posiciones.'
        },
        {
            id: 21, tema: 'tipos-memoria', tipo: 'directa',
            pregunta: '¿Cuál afirmación distingue correctamente SRAM de DRAM?',
            opciones: ['La SRAM usa condensadores y la DRAM usa latches', 'La SRAM usa latches; la DRAM usa condensadores y requiere refresco', 'Ambas requieren refresco por definición', 'La DRAM es no volátil y la SRAM es volátil'],
            respuestaCorrecta: 1,
            explicacion: 'La SRAM almacena con latches y no requiere ciclos de refresco mientras esté alimentada; la DRAM usa condensadores y sí requiere refresco.'
        },
        {
            id: 22, tema: 'tipos-memoria', tipo: 'vf',
            pregunta: 'La memoria RAM descrita conserva sus datos sin alimentación.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'La RAM descrita es volátil: necesita alimentación para conservar la información.'
        },
        {
            id: 23, tema: 'tipos-memoria', tipo: 'directa',
            pregunta: '¿Qué característica comparten ROM y Flash?',
            opciones: ['Son memorias volátiles que siempre requieren refresco', 'Son no volátiles y conservan datos sin alimentación', 'Solo permiten almacenar un bit', 'Ambas se construyen exclusivamente con latches SRAM'],
            respuestaCorrecta: 1,
            explicacion: 'Tanto ROM como Flash conservan su información al retirar la alimentación, aunque sus tecnologías y usos pueden diferir.'
        },
        {
            id: 24, tema: 'tipos-memoria', tipo: 'directa',
            pregunta: '¿Cómo almacena información la celda Flash descrita en los apuntes?',
            opciones: ['Mediante carga atrapada en una puerta flotante', 'Mediante la posición de un bit circulante', 'Mediante una wordline que gira entre flip-flops', 'Mediante un refresco de reloj que no almacena estado'],
            respuestaCorrecta: 0,
            explicacion: 'La puerta flotante aislada puede retener carga; esa carga modifica el comportamiento eléctrico de la celda y permite representar el estado almacenado.'
        }
    ]
};
