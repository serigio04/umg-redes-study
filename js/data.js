const studyData = {
    temas: [
        {
            id: 'seguridad',
            titulo: 'Seguridad de Redes',
            resumen: 'Tríada CIA, Protocolos, Firewalls, ACLs, Hacking, Intrusión, Spoofing y Sniffing.',
            contenido: `
                <h3>1. Fundamentos y Tríada CIA</h3>
                <p><b>Confidencialidad:</b> Cifrado de datos. 
                <b>Integridad:</b> Algoritmos Hash. 
                <b>Disponibilidad:</b> Acceso garantizado. 
                Las amenazas pueden ser <b>Pasivas</b> (Sniffing silencioso) o <b>Activas</b> (Modificación, DoS).</p>
                
                <h3>2. Protocolos de Seguridad</h3>
                <ul>
                    <li>Sustituir Telnet (23) por <b>SSH (22)</b>.</li>
                    <li>Sustituir HTTP (80) por <b>HTTPS (443)</b>.</li>
                    <li>Sustituir FTP (21) por <b>SFTP/SCP (22)</b>.</li>
                    <li><b>IPSec:</b> Base para VPNs. <b>WPA3:</b> Corrige ataques KRACK de WPA2.</li>
                </ul>

                <h3>3. Listas de Control de Acceso (ACLs)</h3>
                <p><b>Estándar (1-99):</b> Filtra solo por IP origen. Va cerca del destino.<br>
                <b>Extendida (100-199):</b> Filtra IP origen/destino y puertos. Va cerca del origen.<br>
                <i>Nota: Tienen un "Deny Implícito" al final; procesan Inbound (ahorra CPU) u Outbound.</i></p>

                <h3>4. Hacking y Fases de Ataque</h3>
                <p>Hackers: White Hat (Éticos), Black Hat (Maliciosos), Grey Hat (Híbridos).<br>
                <b>Fases:</b> 1. Reconocimiento, 2. Escaneo, 3. Gaining Access (Explotación), 4. Mantenimiento (Backdoors), 5. Borrado de Huellas.</p>

                <h3>5. Prevención, Spoofing y Sniffing</h3>
                <ul>
                    <li><b>IDS vs IPS:</b> IDS es pasivo (alerta), IPS es activo (bloquea).</li>
                    <li><b>Spoofing (Suplantación):</b> IP, ARP (MitM), DNS, Email. Se mitiga con DAI (Dynamic ARP Inspection) y DNSSEC.</li>
                    <li><b>Sniffing:</b> Captura de paquetes. Se protege con cifrado (TLS, SSH) y Port Security.</li>
                </ul>
            `
        },
        {
            id: 'nat',
            titulo: 'Network Address Translation (NAT)',
            resumen: 'Rangos RFC 1918, Terminología, NAT Estático, Dinámico, PAT y Twice NAT.',
            contenido: `
                <h3>1. Fundamentos y Rangos (RFC 1918)</h3>
                <p>Oculta la red interna y ahorra IPs públicas. Rangos privados:</p>
                <ul>
                    <li>Clase A: 10.0.0.0 /8</li>
                    <li>Clase B: 172.16.0.0 /12</li>
                    <li>Clase C: 192.168.0.0 /16</li>
                </ul>

                <h3>2. Terminología Crítica</h3>
                <p><b>Inside Local:</b> IP privada del host interno.<br>
                <b>Inside Global:</b> IP pública que representa al host interno.<br>
                <b>Outside Global:</b> IP pública del destino en internet.</p>

                <h3>3. Tipos de NAT y Criterios</h3>
                <ul>
                    <li><b>Estático (1:1):</b> Mapeo permanente. Útil para publicar servidores web/correo.</li>
                    <li><b>Dinámico:</b> Pool temporal unidireccional para tráfico de salida.</li>
                    <li><b>PAT (Sobrecarga):</b> Relación Muchos a 1. Usa puertos TCP/UDP para diferenciar sesiones. Soporta ~65,000 conexiones. Es el más usado.</li>
                    <li><b>Twice NAT (Overlapping):</b> Traduce origen y destino. Usado en fusiones donde hay IPs duplicadas (ej. ambas usan 10.1.1.0/24).</li>
                </ul>

                <h3>4. Desventajas de NAT</h3>
                <p>Añade latencia por procesamiento, rompe la trazabilidad End-to-End, e interfiere con IPSec (requiere NAT-T).</p>
            `
        },
        {
            id: 'vpn',
            titulo: 'Redes Privadas Virtuales (VPN)',
            resumen: 'Tipos de Túneles, IPsec, Arquitecturas, Protocolos y Criptografía.',
            contenido: `
                <h3>1. Túneles y Arquitecturas</h3>
                <ul>
                    <li><b>Split Tunnel:</b> Solo tráfico corporativo va por VPN; Internet va directo.</li>
                    <li><b>Full Tunnel:</b> TODO el tráfico va cifrado.</li>
                    <li><b>Topologías:</b> Hub and Spoke (fácil pero cuello de botella), Full Mesh (ideal pero compleja), Partial Mesh (común en SD-WAN).</li>
                </ul>

                <h3>2. Framework IPsec</h3>
                <p><b>Modos:</b> Transporte (Host-to-Host, mantiene IP original) vs Túnel (Site-to-Site, crea nueva cabecera).<br>
                <b>Fases IKE:</b> Fase 1 (Canal seguro Diffie-Hellman), Fase 2 (SAs para el tráfico real).<br>
                <b>Protocolos:</b> ESP (Cifra y autentica, soporta NAT-T) vs AH (Solo autentica, no soporta NAT).</p>

                <h3>3. Protocolos Alternativos</h3>
                <ul>
                    <li><b>OpenVPN:</b> Basado en OpenSSL, altamente evasivo en firewalls.</li>
                    <li><b>WireGuard:</b> Futuro estándar, muy ligero (4k líneas), veloz (ChaCha20).</li>
                    <li><b>SSL/TLS VPN:</b> Clientless, acceso vía navegador web (HTTPS 443).</li>
                </ul>
                
                <h3>4. Fugas (Leaks)</h3>
                <p>Las fugas de DNS o IPv6 ocurren cuando tráfico escapa del túnel. Se mitiga forzando DNS internos y deshabilitando IPv6 si no está soportado en la VPN.</p>
            `
        },
        {
            id: 'diseno',
            titulo: 'Diseño de Redes y Cloud',
            resumen: 'Topologías, Modelo Jerárquico, Arquitectura Modular y SDN.',
            contenido: `
                <h3>1. Topologías y Modelo de 3 Capas</h3>
                <p>El objetivo es minimizar colisiones (switches) y broadcast (VLANs/routers).</p>
                <ul>
                    <li><b>Acceso:</b> Conexión de usuarios, QoS, VLANs, Port Security y PoE.</li>
                    <li><b>Distribución:</b> Enrutamiento Inter-VLAN, ACLs y redundancia (HSRP/GLBP).</li>
                    <li><b>Núcleo (Core):</b> Conmutación veloz pura. <b>CERO ACLs</b>.</li>
                </ul>
                <p><i>PyMEs: Usan "Collapsed Core" (Núcleo y Distribución fusionados).</i></p>

                <h3>2. Arquitectura Modular</h3>
                <p>Divide la red en bloques que aíslan fallos: Campus, WAN/Branch, Data Center, y Internet Edge (donde va la DMZ y el Firewall).</p>

                <h3>3. Evolución SDN y SD-WAN</h3>
                <p>SDN separa el <b>Plano de Control</b> (inteligencia/ruteo) del <b>Plano de Datos</b> (hardware/reenvío). SD-WAN permite mezclar enlaces (MPLS, Internet, 5G) y optimizar costos.</p>

                <h3>4. Ecosistema Cloud</h3>
                <ul>
                    <li><b>On-Premise:</b> Infraestructura privada, CAPEX (Gasto de capital alto), control total.</li>
                    <li><b>Nube (OPEX):</b> Pago por consumo.</li>
                    <li><b>Modelos:</b> IaaS (Máquinas Virtuales), PaaS (Plataformas para Devs), SaaS (Software final como Zoom/O365).</li>
                </ul>
            `
        }
    ],

    flashcards: [
        { id: 1, tema: 'seguridad', pregunta: '¿Qué es el Deny Implícito en una ACL?', respuesta: 'Regla invisible al final de toda ACL que bloquea todo el tráfico que no hizo match previo ("permit ip any any" lo anula).' },
        { id: 2, tema: 'seguridad', pregunta: 'Diferencia entre ataques Activos y Pasivos', respuesta: 'Pasivos (Sniffing): Solo escuchan, difíciles de detectar. Activos (DoS, MitM): Alteran el sistema.' },
        { id: 3, tema: 'seguridad', pregunta: '¿Cuáles son las 5 fases del Hacking?', respuesta: 'Reconocimiento, Escaneo, Gaining Access, Mantenimiento y Borrado de huellas.' },
        { id: 4, tema: 'seguridad', pregunta: '¿Qué protege DAI (Dynamic ARP Inspection)?', respuesta: 'Valida paquetes ARP en switches para evitar el ARP Spoofing (ataques Man-in-the-Middle).' },
        { id: 5, tema: 'nat', pregunta: 'Define Inside Local e Inside Global', respuesta: 'Inside Local = IP Privada del equipo. Inside Global = IP Pública por la que el router lo traduce hacia afuera.' },
        { id: 6, tema: 'nat', pregunta: '¿Por qué NAT rompe el esquema End-to-End?', respuesta: 'Porque modifica las cabeceras IP en el camino, lo que afecta a protocolos como IPSec sin NAT-T o SIP antiguo.' },
        { id: 7, tema: 'nat', pregunta: '¿Para qué sirve el NAT Estático (1:1)?', respuesta: 'Para mapear permanentemente una IP privada a una pública, permitiendo publicar servidores (Web, Mail) hacia Internet.' },
        { id: 8, tema: 'vpn', pregunta: '¿Qué es una arquitectura VPN Full Mesh?', respuesta: 'Túneles directos entre todos los nodos. Muy rápida y tolerante a fallos, pero muy compleja de escalar matemáticamente.' },
        { id: 9, tema: 'vpn', pregunta: 'Diferencia entre ESP y AH en IPsec', respuesta: 'ESP cifra y autentica (soporta NAT). AH solo autentica (incompatible con NAT porque la modificación de IP rompe la firma).' },
        { id: 10, tema: 'vpn', pregunta: '¿Qué es un DNS Leak en una VPN?', respuesta: 'Cuando las consultas de navegación se escapan fuera del túnel cifrado y van al ISP local, revelando tu actividad.' },
        { id: 11, tema: 'diseno', pregunta: 'Regla de oro de la Capa de Núcleo (Core)', respuesta: 'Solo conmutación a máxima velocidad. NO aplicar ACLs ni manipulación pesada de paquetes.' },
        { id: 12, tema: 'diseno', pregunta: '¿Qué es un Núcleo Comprimido (Collapsed Core)?', respuesta: 'Diseño para PyMEs que fusiona la capa de Distribución y Núcleo en un solo equipo.' },
        { id: 13, tema: 'diseno', pregunta: 'Diferencia entre HSRP y GLBP', respuesta: 'Ambos dan redundancia (Distribución). HSRP es Activo/Standby. GLBP permite balanceo de carga real entre routers.' },
        { id: 14, tema: 'diseno', pregunta: '¿Qué separa el paradigma SDN?', respuesta: 'Separa el Plano de Control (cerebro/decisiones) del Plano de Datos (hardware/reenvío).' },
        { id: 15, tema: 'diseno', pregunta: 'CAPEX vs OPEX en Cloud', respuesta: 'CAPEX (On-Premise) es gasto inicial fuerte en hardware. OPEX (Cloud Pública) es gasto operativo por consumo/suscripción.' }
    ],

    preguntas: [
        {
            id: 1,
            tema: 'seguridad',
            tipo: 'directa',
            pregunta: '¿Dónde se debe ubicar estratégicamente una ACL Extendida para optimizar la red?',
            opciones: ['Lo más cerca posible del destino', 'Lo más cerca posible del origen', 'En el Firewall perimetral exclusivamente', 'En la capa Core'],
            respuestaCorrecta: 1,
            explicacion: 'Las ACL Extendidas filtran con alta precisión (IPs, puertos). Al ubicarlas cerca del origen, se descarta el tráfico no deseado rápido, ahorrando ancho de banda en toda la red.'
        },
        {
            id: 2,
            tema: 'seguridad',
            tipo: 'vf',
            pregunta: 'El protocolo Telnet es ideal para la gestión remota porque envía las contraseñas cifradas.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. Telnet (puerto 23) transmite todo en texto plano. Debe reemplazarse siempre por SSH (puerto 22).'
        },
        {
            id: 3,
            tema: 'seguridad',
            tipo: 'directa',
            pregunta: '¿Qué fase de un ciberataque involucra la instalación de Backdoors (puertas traseras)?',
            opciones: ['Reconocimiento', 'Escaneo', 'Mantenimiento del Acceso', 'Borrado de huellas'],
            respuestaCorrecta: 2,
            explicacion: 'En la fase de Mantenimiento, el atacante asegura persistencia en el sistema comprometido instalando backdoors o troyanos.'
        },
        {
            id: 4,
            tema: 'nat',
            tipo: 'directa',
            pregunta: '¿Qué método NAT usarías en una casa donde 15 dispositivos comparten una sola conexión a Internet?',
            opciones: ['NAT Estático', 'Twice NAT', 'NAT Dinámico estricto', 'PAT (Sobrecarga)'],
            respuestaCorrecta: 3,
            explicacion: 'PAT (Port Address Translation) es el estándar doméstico; usa los puertos de capa de transporte (TCP/UDP) para enrutar el tráfico de múltiples equipos usando 1 sola IP.'
        },
        {
            id: 5,
            tema: 'nat',
            tipo: 'vf',
            pregunta: 'Twice NAT se utiliza exclusivamente cuando se desean publicar servidores web (HTTP/HTTPS) hacia internet.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. Twice NAT se usa para resolver superposición de IPs (Overlapping), como cuando dos empresas fusionadas usan la misma red 10.1.1.0/24.'
        },
        {
            id: 6,
            tema: 'vpn',
            tipo: 'directa',
            pregunta: 'Si un usuario en su casa necesita acceder al ERP corporativo, pero quiere navegar en YouTube desde su internet local sin saturar la red de la empresa, ¿qué debe usar?',
            opciones: ['Full Tunnel', 'Split Tunnel', 'Hub and Spoke', 'Modo Transporte'],
            respuestaCorrecta: 1,
            explicacion: 'Split Tunnel (Túnel dividido) envía solo el tráfico destino a la red privada por la VPN; el resto del tráfico (YouTube) sale por el internet local sin cifrar.'
        },
        {
            id: 7,
            tema: 'vpn',
            tipo: 'directa',
            pregunta: 'En IPsec, ¿Cuál es la función de la Fase 1 de IKE (Internet Key Exchange)?',
            opciones: ['Establecer las Asociaciones de Seguridad (SAs) de datos', 'Negociar algoritmos y usar Diffie-Hellman para un canal seguro base', 'Cifrar la carga útil de los paquetes web', 'Definir el Split Tunnel'],
            respuestaCorrecta: 1,
            explicacion: 'La Fase 1 establece el canal de control seguro bidireccional usando Diffie-Hellman. La Fase 2 es la que crea los túneles de datos reales.'
        },
        {
            id: 8,
            tema: 'vpn',
            tipo: 'vf',
            pregunta: 'WireGuard es más complejo y tiene muchas más líneas de código que IPsec, pero es más rápido.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. WireGuard es más rápido, pero su mayor ventaja es su simplicidad radical (4,000 líneas de código frente a las 600,000 de IPsec).'
        },
        {
            id: 9,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: '¿En qué capa del modelo de 3 capas se implementa Port Security, PoE y las conexiones físicas de los usuarios finales?',
            opciones: ['Capa de Acceso', 'Capa de Distribución', 'Capa de Núcleo', 'Plano de Control'],
            respuestaCorrecta: 0,
            explicacion: 'La Capa de Acceso es el perímetro de la red LAN, donde se conectan PCs, APs y teléfonos IP (PoE) implementando seguridad básica por MAC (Port Security).'
        },
        {
            id: 10,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: '¿Qué ventaja principal tiene SD-WAN sobre las conexiones MPLS tradicionales?',
            opciones: ['SD-WAN siempre usa hardware propietario', 'SD-WAN no requiere cifrado', 'SD-WAN es mucho más costoso pero seguro', 'SD-WAN permite flexibilidad para usar internet de banda ancha y reducir costos operativos'],
            respuestaCorrecta: 3,
            explicacion: 'MPLS es muy confiable pero extremadamente costoso. SD-WAN permite agregar múltiples enlaces económicos (Internet, 5G) y optimizarlos por software.'
        },
        {
            id: 11,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: 'Una empresa contrata máquinas virtuales vacías en AWS para que sus ingenieros instalen los sistemas operativos desde cero. ¿Qué modelo Cloud es?',
            opciones: ['SaaS', 'PaaS', 'IaaS', 'On-Premise'],
            respuestaCorrecta: 2,
            explicacion: 'IaaS (Infraestructura como Servicio). La empresa alquila el hardware virtual (servidores), pero gestiona desde el SO hacia arriba.'
        },
        {
            id: 12,
            tema: 'seguridad',
            tipo: 'vf',
            pregunta: 'Un Sistema de Prevención de Intrusos (IPS) se implementa en línea con el tráfico de red, lo que le permite bloquear activamente ataques.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'Verdadero. A diferencia del IDS (que copia tráfico y es pasivo), el IPS va "inline" (en línea) y puede detener paquetes maliciosos en tiempo real.'
        },
        {
            id: 13,
            tema: 'seguridad',
            tipo: 'directa',
            pregunta: '¿Cuál es el objetivo principal de implementar un algoritmo de Hash (como SHA-256) en la seguridad de redes?',
            opciones: ['Garantizar la Confidencialidad cifrando los datos', 'Garantizar la Integridad validando que los datos no fueron alterados', 'Garantizar la Disponibilidad contra ataques DoS', 'Bloquear el tráfico malicioso automáticamente'],
            respuestaCorrecta: 1,
            explicacion: 'Los algoritmos Hash no cifran (no ocultan), sino que generan una firma única del archivo. Si un solo bit cambia, el Hash cambia, garantizando así la Integridad.'
        },
        {
            id: 14,
            tema: 'seguridad',
            tipo: 'vf',
            pregunta: 'El ataque de Sniffing se considera un ataque pasivo porque el atacante solo escucha el tráfico sin alterarlo ni interrumpirlo.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 0,
            explicacion: 'Verdadero. El Sniffing (captura de paquetes) es pasivo y muy difícil de detectar. Se mitiga cifrando la comunicación (ej. usando HTTPS o SSH).'
        },
        {
            id: 15,
            tema: 'nat',
            tipo: 'directa',
            pregunta: 'En la terminología de NAT, ¿qué representa el término "Inside Global" (Local Global)?',
            opciones: ['La dirección IP privada del host interno', 'La dirección IP pública del destino en Internet', 'La dirección IP pública asignada por el ISP que representa al host interno hacia afuera', 'La dirección MAC del router'],
            respuestaCorrecta: 2,
            explicacion: 'Inside Global es la dirección pública (traducida) con la que el mundo exterior ve a tu dispositivo interno.'
        },
        {
            id: 16,
            tema: 'nat',
            tipo: 'vf',
            pregunta: 'La dirección 172.16.50.10 pertenece a un rango de direcciones IPs públicas enrutables en Internet.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. Pertenece al rango de IPs privadas de Clase B (172.16.0.0 a 172.31.255.255) definido en el RFC 1918. Requiere NAT para salir a Internet.'
        },
        {
            id: 17,
            tema: 'vpn',
            tipo: 'directa',
            pregunta: '¿Qué arquitectura VPN requiere la creación de un túnel directo entre todos y cada uno de los nodos de la red?',
            opciones: ['Hub and Spoke', 'Full Mesh (Malla Completa)', 'Partial Mesh', 'Split Tunnel'],
            respuestaCorrecta: 1,
            explicacion: 'En la arquitectura Full Mesh, todos los sitios se conectan directamente con todos. Es muy rápida y tolerante a fallos, pero matemáticamente compleja de escalar.'
        },
        {
            id: 18,
            tema: 'vpn',
            tipo: 'vf',
            pregunta: 'El uso de SSL/TLS VPN requiere siempre la instalación de un cliente VPN dedicado y pesado en el equipo del usuario final.',
            opciones: ['Verdadero', 'Falso'],
            respuestaCorrecta: 1,
            explicacion: 'Falso. Las VPNs SSL/TLS suelen ser "Clientless" (sin cliente), permitiendo el acceso seguro a través de un simple navegador web utilizando HTTPS (puerto 443).'
        },
        {
            id: 19,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: 'En la capa de Distribución, ¿qué protocolo utilizarías si necesitas balanceo de carga real entre varios routers además de redundancia?',
            opciones: ['HSRP (Hot Standby Router Protocol)', 'STP (Spanning Tree Protocol)', 'GLBP (Gateway Load Balancing Protocol)', 'VRRP'],
            respuestaCorrecta: 2,
            explicacion: 'Mientras HSRP y VRRP funcionan en modo Activo/Standby (un router trabaja y el otro espera), GLBP permite usar el ancho de banda de todos los routers simultáneamente.'
        },
        {
            id: 20,
            tema: 'diseno',
            tipo: 'directa',
            pregunta: 'Dentro de la arquitectura modular de Cisco, ¿en qué módulo se ubican los firewalls perimetrales y la DMZ (Zona Desmilitarizada)?',
            opciones: ['Módulo de Campus', 'Módulo de Data Center', 'Módulo de Internet Edge (Borde de Internet)', 'Módulo de Gestión'],
            respuestaCorrecta: 2,
            explicacion: 'El Internet Edge es la frontera entre la red corporativa y el mundo exterior, por lo que es el lugar exacto para filtrar tráfico externo y exponer servidores públicos en la DMZ.'
        },
        {
            id: 101,
            tema: 'subnetting',
            tipo: 'directa',
            pregunta: 'Si tienes la dirección IP 192.168.1.0/27, ¿cuántos hosts utilizables tienes por subred y cuál es el salto de red?',
            opciones: [
                '32 hosts utilizables, salto de 32', 
                '30 hosts utilizables, salto de 32', 
                '30 hosts utilizables, salto de 64', 
                '62 hosts utilizables, salto de 64'
            ],
            respuestaCorrecta: 1,
            explicacion: 'Una máscara /27 deja 5 bits para hosts (32-27=5). 2^5 = 32 direcciones totales. Restando la dirección de red y la de broadcast, quedan 30 hosts utilizables. El salto entre subredes es de 32.'
        },
        {
            id: 102,
            tema: 'enrutamiento',
            tipo: 'directa',
            pregunta: '¿Cuál de los siguientes protocolos de enrutamiento utiliza el algoritmo DUAL para calcular la ruta más corta y es propietario de Cisco?',
            opciones: ['OSPF', 'BGP', 'EIGRP', 'RIPv2'],
            respuestaCorrecta: 2,
            explicacion: 'EIGRP (Enhanced Interior Gateway Routing Protocol) es un protocolo vector distancia avanzado propietario de Cisco que utiliza el algoritmo DUAL (Diffusing Update Algorithm).'
        },
        {
            id: 103,
            tema: 'capa_enlace',
            tipo: 'directa',
            pregunta: 'En el protocolo STP (Spanning Tree Protocol), ¿qué métrica se utiliza principalmente para elegir el Root Bridge?',
            opciones: [
                'La dirección IP más baja', 
                'La dirección MAC más alta', 
                'El Bridge ID (Prioridad + Dirección MAC) más bajo', 
                'El costo de puerto más bajo'
            ],
            respuestaCorrecta: 2,
            explicacion: 'El Root Bridge se elige basándose en el Bridge ID más bajo. El Bridge ID se compone de una prioridad configurable (por defecto 32768) y la dirección MAC del switch.'
        },
        {
            id: 104,
            tema: 'ipv6',
            tipo: 'directa',
            pregunta: '¿Qué prefijo se utiliza en IPv6 para identificar las direcciones Link-Local (enlace local) que se autoconfiguran en las interfaces?',
            opciones: ['FC00::/7', 'FE80::/10', '2000::/3', 'FF00::/8'],
            respuestaCorrecta: 1,
            explicacion: 'Las direcciones FE80::/10 son Link-Local en IPv6. Se usan para la comunicación dentro de un mismo segmento de red local y no son enrutables.'
        },
        {
            id: 105,
            tema: 'capa_transporte',
            tipo: 'directa',
            pregunta: 'Durante el establecimiento de una conexión TCP (Three-Way Handshake), ¿qué banderas (flags) se envían en el segundo paso del proceso?',
            opciones: ['SYN', 'ACK', 'SYN, ACK', 'FIN, ACK'],
            respuestaCorrecta: 2,
            explicacion: 'El proceso es: 1) Cliente envía SYN. 2) Servidor responde con SYN y ACK. 3) Cliente confirma con ACK.'
        },
        {
            id: 106,
            tema: 'vlan_trunking',
            tipo: 'directa',
            pregunta: '¿Qué estándar del IEEE define la inserción de una etiqueta (tag) de 4 bytes en las tramas Ethernet para identificar la pertenencia a una VLAN?',
            opciones: ['IEEE 802.1D', 'IEEE 802.3ad', 'IEEE 802.1Q', 'IEEE 802.1X'],
            respuestaCorrecta: 2,
            explicacion: '802.1Q es el estándar que inserta el tag de VLAN en la cabecera Ethernet original. 802.1D es STP, 802.3ad es LACP (Link Aggregation) y 802.1X es control de acceso de red.'
        },
        {
            id: 107,
            tema: 'nat',
            tipo: 'directa',
            pregunta: '¿Qué técnica permite que múltiples dispositivos en una red local privada compartan una única dirección IP pública utilizando distintos números de puerto?',
            opciones: ['NAT Estático', 'Dynamic NAT', 'PAT (NAT Overload)', 'Port Forwarding'],
            respuestaCorrecta: 2,
            explicacion: 'PAT (Port Address Translation) o NAT Overload mapea múltiples IPs privadas a una sola IP pública utilizando diferentes puertos de origen para diferenciar las sesiones.'
        },
        {
            id: 108,
            tema: 'modelo_osi',
            tipo: 'directa',
            pregunta: 'Cuando un router recibe un paquete y determina que el TTL (Time to Live) ha llegado a 0, ¿qué acción toma y en qué capa ocurre?',
            opciones: [
                'Descarta el paquete y envía un mensaje ICMP Time Exceeded (Capa 3)', 
                'Retransmite el paquete pidiendo un aumento de TTL (Capa 4)', 
                'Descarta el paquete silenciosamente (Capa 2)', 
                'Envía el paquete al Root Bridge (Capa 2)'
            ],
            respuestaCorrecta: 0,
            explicacion: 'El TTL opera en la Capa 3 (Red). Cuando llega a 0, el router descarta el paquete para evitar bucles infinitos y notifica al origen mediante un mensaje ICMP Time Exceeded.'
        }
    ]
};