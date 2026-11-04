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
    ]
};