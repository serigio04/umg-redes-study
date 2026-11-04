const studyData = {
    temas: [
        {
            id: 'seguridad',
            titulo: 'Seguridad de Redes',
            resumen: 'Tríada CIA, Firewalls, ACLs, Hacking y mitigación de ataques.',
            contenido: `
                <h3>1. La Tríada CIA</h3>
                <p>Confidencialidad, Integridad y Disponibilidad. Es la base de la seguridad informática.</p>
                <br>
                <h3>2. Tipos de Firewall</h3>
                <ul>
                    <li><b>Filtrado de Paquetes:</b> Examina en Capa 3 de forma individual.</li>
                    <li><b>Stateful:</b> Supervisa el estado de conexiones activas.</li>
                </ul>
                <p><em>(Aquí puedes pegar el resto de tus apuntes generados anteriormente)</em></p>
            `
        },
        {
            id: 'nat',
            titulo: 'Network Address Translation (NAT)',
            resumen: 'Agotamiento IPv4, NAT Estático, Dinámico, PAT y Superposición.',
            contenido: `
                <h3>1. Concepto de NAT</h3>
                <p>Reasigna un espacio de IP privada en IP pública, mitigando el agotamiento de IPv4.</p>
                <br>
                <h3>2. PAT (Sobrecarga)</h3>
                <p>Modifica números de puerto (TCP/UDP) para que múltiples hosts compartan una sola IP pública.</p>
            `
        }
    ],
    flashcards: [
        { id: 1, tema: 'seguridad', pregunta: '¿Qué conforma la Tríada CIA?', respuesta: 'Confidencialidad, Integridad y Disponibilidad.' },
        { id: 2, tema: 'seguridad', pregunta: 'Diferencia principal entre ACL Inbound y Outbound', respuesta: 'Inbound procesa antes de enrutar (ahorra CPU). Outbound enruta y luego procesa.' },
        { id: 3, tema: 'nat', pregunta: '¿Qué es PAT (Overload)?', respuesta: 'Permite a múltiples hosts privados compartir una única IP pública usando números de puerto de transporte para diferenciar sesiones.' },
        { id: 4, tema: 'nat', pregunta: '¿Cuándo se debe utilizar Twice NAT?', respuesta: 'Cuando hay superposición de IPs (Overlapping), como en fusiones de empresas donde ambas usan la misma subred privada (ej. 10.1.1.0/24).' }
    ],
    preguntas: [
        {
            id: 1,
            tema: 'seguridad',
            tipo: 'vf', // Verdadero o Falso
            pregunta: 'El protocolo SSH opera en el puerto 23 y transmite credenciales en texto plano.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1, // Índice de la respuesta (1 = 'Falso')
            explicacion: 'Falso. SSH opera en el puerto 22 de forma cifrada. El que usa el puerto 23 y texto plano es Telnet.'
        },
        {
            id: 2,
            tema: 'nat',
            tipo: 'directa', // Selección múltiple
            pregunta: '¿Qué mecanismo mitiga el agotamiento de IPv4 permitiendo que miles de hosts compartan una sola IP pública?',
            opciones: ['NAT Estático (1:1)', 'IPsec en Modo Túnel', 'PAT (NAT con Sobrecarga)', 'VLANs'],
            respuestaCorrecta: 2, // Índice de la respuesta (2 = 'PAT')
            explicacion: 'PAT (Port Address Translation) utiliza los números de puerto TCP/UDP para diferenciar las sesiones de múltiples dispositivos locales.'
        },
        {
            id: 3,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: 'En el modelo jerárquico de 3 capas de Cisco, ¿en qué capa se aplican típicamente las listas de control de acceso (ACLs) y el enrutamiento Inter-VLAN?',
            opciones: ['Capa de Acceso', 'Capa de Distribución', 'Capa de Núcleo (Core)', 'Capa Física'],
            respuestaCorrecta: 1, // Índice 1 = 'Capa de Distribución'
            explicacion: 'La capa de Distribución filtra el tráfico (ACLs) y enruta entre VLANs. El Núcleo solo se dedica a la conmutación a altísima velocidad.'
        }
    ]
};