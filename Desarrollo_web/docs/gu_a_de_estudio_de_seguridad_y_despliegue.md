# Guía de Estudio: Despliegue y Seguridad en APIs con Spring Boot

Esta guía resume los conceptos técnicos aplicados durante el proyecto para asegurar el sistema de autenticación de la aplicación, abarcando desde configuraciones de infraestructura en la nube hasta mecanismos de protección en el código y control de acceso.

---

## 1. Despliegue e Infraestructura en la Nube (Render)

Cuando desplegamos una aplicación en plataformas Cloud (como Render, AWS, Heroku), la arquitectura de red cambia respecto al entorno local (`localhost`).

### 1.1. El Proxy Inverso (Reverse Proxy)
En la nube, las peticiones HTTP no llegan directamente a tu aplicación Spring Boot. Primero pasan por un servidor intermedio (Proxy o Balanceador de Carga).
* **El problema:** Si preguntas por la IP del cliente con `request.getRemoteAddr()`, Spring Boot te devolverá la IP del proxy (ej. la IP interna de Render), no la del usuario real. Esto arruina cualquier sistema que dependa de identificar al usuario (como el Rate Limiting).
* **La cabecera `X-Forwarded-For`:** Es el estándar de la industria. El proxy inyecta la IP real del usuario en esta cabecera antes de pasarle la petición al backend.

### 1.2. Solución en Spring Boot
Para que Spring Boot procese automáticamente esta cabecera y devuelva la IP real sin tener que programar lógica manual, se debe confiar en el proxy agregando la siguiente configuración en `application.properties`:

```properties
server.forward-headers-strategy=framework
```

---

## 2. Rate Limiting (Control de Solicitudes)

El Rate Limiting es una técnica para controlar la cantidad de peticiones que un cliente (basado en su IP) puede hacer a una API en un tiempo determinado.

### 2.1. Objetivos del Rate Limiting
* Prevenir ataques de **Fuerza Bruta** (intentar miles de contraseñas por segundo).
* Mitigar ataques **DDoS** (Denegación de Servicio Distribuida) evitando que saturen el servidor.

### 2.2. Implementación con Bucket4j
Se utilizó la librería **Bucket4j**, que implementa el algoritmo *Token Bucket* (Cubeta de Tokens).
* **Regla aplicada:** 10 peticiones por minuto por IP.
* **Caché:** Se utilizó un `ConcurrentHashMap` en memoria para llevar el registro de las cubetas de cada IP de forma segura en entornos multihilo.
* **Respuesta HTTP:** Si el cliente agota sus tokens, el servidor interrumpe el flujo y responde inmediatamente con un estado **`HTTP 429 Too Many Requests`**.

---

## 3. Filtros de Seguridad y Arquitectura en Spring Security

Spring Security basa toda su protección en una cadena de filtros interceptores (**Filter Chain**) que analizan la petición HTTP antes de que llegue a los controladores (`@RestController`).

### 3.1. Intercepción de Peticiones (`OncePerRequestFilter`)
Para validar tokens JWT o auditar accesos, se extienden filtros personalizados usando la clase `OncePerRequestFilter`.
* **Garantía:** Asegura que el filtro se ejecute exactamente **una sola vez** por cada petición entrante.
* **Flujo del Filtro JWT:**
  1. Extrae la cabecera `Authorization: Bearer <token>`.
  2. Valida la firma y expiración del JWT con `JwtTokenProvider`.
  3. Si es válido, reconstruye los roles/autoridades y registra al usuario en el contexto de seguridad global con `SecurityContextHolder.getContext().setAuthentication(...)`.

---

## 4. Control de Acceso y Gestión de Roles

El control de acceso basado en roles (**RBAC - Role-Based Access Control**) garantiza que los usuarios solo accedan a los recursos para los que tienen autorización explícita.

### 4.1. Configuración de Acceso a Módulos (`SecurityFilterChain`)
En la clase de configuración de Spring Security (usualmente anotada con `@Configuration` y `@EnableWebSecurity`), se define qué roles pueden acceder a cada ruta.

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Deshabilitado para APIs REST stateless
        .authorizeHttpRequests(auth -> auth
            // Rutas públicas (no requieren autenticación)
            .requestMatchers("/api/auth/**").permitAll()
            
            // Acceso a módulos específicos por Rol
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
            
            // Cualquier otra petición requiere estar autenticado
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
    return http.build();
}
```

### 4.2. Convención de Nombres para Roles (`ROLE_`)
Spring Security utiliza internamente el prefijo `ROLE_` para distinguir roles de autoridades simples.
* En la base de datos o entidad: `ROLE_ADMIN`
* En el código con `hasRole("ADMIN")`: Spring busca automáticamente la autoridad que empiece con `ROLE_ADMIN`.
* Si se usa `hasAuthority("ADMIN")`: Se busca la coincidencia exacta sin agregar el prefijo.

---

## 5. Lógica de Autenticación y Protección de Cuentas

A nivel de base de datos y controlador, se implementaron controles directos para evitar el robo o secuestro de credenciales.

### 5.1. Prevención de Enumeración de Usuarios
Si una API responde *"El usuario no existe"* o *"Contraseña incorrecta"*, un atacante puede deducir qué correos o usernames están registrados.
* **Buena práctica:** Responder siempre con un mensaje genérico (ej. *"Credenciales inválidas"*) y un código **`HTTP 401 Unauthorized`**, sin revelar la razón específica del fallo.

### 5.2. Rastreo de Intentos Fallidos
Se modificó la entidad `Usuario` para registrar el estado de la cuenta:
* `intentos_fallidos` (Integer): Incrementa en 1 con cada contraseña incorrecta. Se resetea a `0` tras un inicio de sesión exitoso.

### 5.3. Bloqueo Temporal de Cuenta (Lockout)
Al alcanzar el límite de 5 intentos fallidos:
* Se guarda la fecha/hora actual más la penalización usando `LocalDateTime.now().plusMinutes(15)` en la columna `cuenta_bloqueada_hasta`.
* **Regla estricta:** Durante los 15 minutos de bloqueo, el sistema debe denegar el acceso **incluso si posteriormente se introduce la contraseña correcta**, impidiendo que los bots sigan probando credenciales.

---

## 6. Resumen de Códigos de Estado HTTP Utilizados

| Código HTTP | Descripción | Caso de Uso en el Proyecto |
| :--- | :--- | :--- |
| **200 OK** | Petición exitosa | Login o registro completado con retorno de JWT |
| **400 Bad Request** | Datos inválidos | El usuario ya existe al intentar registrarse |
| **401 Unauthorized** | Autenticación fallida | Credenciales incorrectas o cuenta bloqueada |
| **403 Forbidden** | Acceso prohibido | El usuario está autenticado pero no tiene el ROL para el módulo |
| **429 Too Many Requests** | Límite superado | Se superaron las 10 peticiones por minuto (Rate Limiting) |