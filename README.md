# Sorteador de Fidelización de Clientes BTI

>Aplicación web que realiza un sorteo de fidelización entre los clientes de BTI.

## Características
* **Vanilla JS**
* **jQuery** v1.12.4 para pequeños efectos.
* **Firebase Realtime Database** usada como persistencia de datos de los clientes.
* **Gulp** para gestión de tareas.

## Uso
### Instalación
```
$ npm install
```
### Modo desarrollo
```
$ gulp
```
### Ambiente producción
```
$ gulp server-dist
```
### Configuración

Los parámetros de configuración se encuentran en /src/main.js
```
$ var config = {
    timer: 30, // Cuenta regresiva en segundos
    maxClients: 40, // Número de clientes a sortear
    winnerMessage: "Ganador!" // Mensaje para el cliente Ganador
 }
```
**Nota:** Los parámetros deben ser modificados en el modo desarrollo.

## License
MIT. Copyright &copy; [Diego F. Reyes](http://diegofreyes.com)