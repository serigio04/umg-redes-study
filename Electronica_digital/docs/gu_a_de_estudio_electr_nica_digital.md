# Guía de Estudio Avanzada: Electrónica Digital - Contadores, Registros y Memorias (Versión Actualizada)

## 1. Contadores Asíncronos (Con Propagación)
Los contadores asíncronos operan bajo el principio de que no existe una relación temporal fija y simultánea entre los cambios de estado de todos sus flip-flops. En esta configuración, la señal de reloj principal (CLK) acciona exclusivamente la entrada de sincronismo del primer flip-flop (el bit menos significativo o LSB). 

El principal desafío técnico de estos circuitos es el **retardo de propagación acumulativo**. Dado que el segundo flip-flop es disparado por la transición de la salida del primero, el efecto de la señal de reloj debe "propagarse" en cascada a través de cada etapa limitando severamente la frecuencia máxima de operación.

## 2. Máquinas de Estados y Contadores Síncronos
Una **Máquina de Estados** es un circuito secuencial síncrono compuesto por una etapa de lógica combinacional y una etapa de memoria (flip-flops). Su comportamiento se define por un número finito de "estados"; el estado futuro y las salidas dependen simultáneamente del estado actual y de las entradas presentes.

En los contadores síncronos (que son un tipo de máquina de estados), la señal de reloj se distribuye en paralelo a todos los flip-flops, garantizando que los cambios de estado ocurran exactamente en el mismo instante, eliminando el retardo de propagación.

* **Contadores Ascendentes/Descendentes:** Incorporan lógica combinacional (ej. compuertas AND). En modo descendente, un bit cambia de estado únicamente cuando todos los bits de menor peso se encuentran en nivel lógico "0".

### Procedimiento Formal de Diseño de Máquinas de Estados
El diseño riguroso para secuencias específicas requiere los siguientes pasos:
1. **Diagrama de Estados:** Representación gráfica de la progresión y transición entre estados lógicos.
2. **Tabla del Estado Siguiente:** Mapeo tabular que vincula cada estado actual con su estado futuro. *(Nota: Los estados que no forman parte de la secuencia deseada se marcan con una "X" como condiciones "no importa").*
3. **Tabla de Transiciones de Flip-Flops:** Define las excitaciones requeridas (ej. D, J, K) para forzar las transiciones.
4. **Mapas de Karnaugh:** Simplificación de ecuaciones booleanas. Las "X" (estados no usados) se agrupan estratégicamente con los "1" para obtener las ecuaciones más reducidas posibles.
5. **Implementación del Hardware:** Construcción del circuito combinando compuertas lógicas y flip-flops.

## 3. Registros de Desplazamiento
Son matrices de memoria lineal construidas mediante flip-flops en cascada. Sus dos funciones principales son el **almacenamiento temporal** de datos y el **desplazamiento de bits** (hacia la izquierda o derecha) sincronizado por un reloj. 

* **Análisis Temporal:** El comportamiento de registros de n bits (ej. 5 bits) se analiza mediante *diagramas de tiempos*, los cuales grafican cómo los datos de entrada se recorren un flip-flop hacia la derecha con cada flanco activo del reloj (CLK).
* **Entrada Serie / Salida Serie:** Los datos entran y salen un bit por ciclo de reloj.
* **Entrada Serie / Salida Paralelo:** La carga es secuencial, pero las salidas de cada flip-flop se leen simultáneamente.

## 4. Contadores Estructurados en Registros de Desplazamiento
Al introducir lazos de realimentación en un registro, se obtienen generadores de secuencias cíclicas.

* **Contador Johnson (Anillo Trenzado):** Conecta la salida invertida del último flip-flop ($\overline{Q}$) a la entrada de datos del primero ($D_0$). Esta arquitectura rellena el registro con unos lógicos y luego con ceros, generando exactamente **2n estados** válidos para un registro de n bits.
* **Contador en Anillo Clásico:** Conecta la salida directa de la última etapa a la primera. Un único "1" lógico circula ininterrumpidamente a través del registro con cada pulso, originando n estados.

## 5. Arquitecturas de Memorias Semiconductoras
Las memorias organizan y almacenan arreglos masivos de bits. 

### Funcionamiento de la Matriz de Memoria
El almacenamiento interno se organiza en una cuadrícula bidimensional:
1. El **bus de direcciones** entra a un decodificador que activa una única fila específica, llamada **Línea de Palabra (Wordline)**.
2. Al activarse la fila, las celdas se conectan a sus respectivas columnas, llamadas **Líneas de Bit (Bitlines)**.
3. A través de las Bitlines, los circuitos extraen el dato hacia el bus de salida (lectura) o inyectan carga para sobreescribirlo (escritura).

### Tipos de Memoria
* **RAM (Volátil):** Permite lectura y escritura rápida en cualquier dirección. La **SRAM** usa latches (rápida, retiene mientras haya energía) y la **DRAM** usa condensadores (requiere ciclos de refresco constante).
* **ROM (No Volátil):** Diseñada primariamente para lectura.
* **Memoria Flash:** Utiliza un transistor MOS con una **puerta flotante** aislada. La programación atrapa electrones en esta puerta (representando un 0 lógico al bloquear la conducción), mientras que su ausencia permite la conducción (1 lógico). Retiene la información sin energía por décadas.