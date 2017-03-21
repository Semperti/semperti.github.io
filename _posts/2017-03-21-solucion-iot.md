---
layout: post
title:  "Solución de Arquitectura IoT"
date:   2017-03-21 11:30:00
categories: general
image: /assets/2017-03-21-solucion-iot/imagen002.png
---
# IMPLEMENTACIÓN DE UNA SOLUCION DE MONITOREO DE DISPOSITIVOS
En este post vamos a desarrollar una solución de monitoreo de dispositivos. Una solución de este tipo se deberá asegurar poder consumir la información del monitoreo, enriquecerla, informar el estado de los elementos monitoreados, y el estado de los dispositivos que realizan los monitoreos. Asimismo, el sistema podrá enviar alertas y notificaciones a quien corresponda al detectarse anomalías en las variables monitoreadas o en los mismos dispositivos de monitoreo. También puede ser expandido para la detección de fallas relacionadas entre sí y de fallas tempranas basadas en patrones de funcionamiento de los dispositivos.

Toda esta información permitirá integrarse con los sistemas de procesos de negocios, permitiendo así la creación de flujos de mantenimiento, ayudando a la rápida detección de los puntos con problemas y agilizar las acciones correctivas ante una falla.
Además permite dar visibilidad sobre el estado de los diferentes eventos a fin de poder tener una visión global del estado de situación como así también implementar procesos de escalado automático según sea necesario. 

## ARQUITECTURA DE LA SOLUCIÓN
![Arquitectura](/assets/2017-03-21-solucion-iot/imagen001.png)
### TELEMETRÍA DE DISPOSITIVOS
Los dispositivos recolectan la información de los diferentes monitoreos, los que sean dispositivos IP envían la información en forma directa al Agregador, mientras que los que no son IP deben pasar por un IP Bridge para convertir el protocolo.
Una vez que las señales llegan al Agregador, la información es formateada de forma tal que los sistemas que tomen la información lo puedan hacer en forma transparente agregando a qué dispositivo corresponde cada medición, facilitando las tareas subsiguientes.
### PROCESAMIENTO DE DATOS Y ANÁLISIS
El Procesamiento en línea es donde se recibe, analiza, procesa y finalmente distribuye la información.
En esta pieza de la solución, en base a las mediciones obtenidas, y a diferentes reglas configuradas, se generarán las alarmas correspondientes y se entregará la información a los diferentes sistemas.

Asimismo, toda la información recolectada será almacenada en una base de datos, la cual servirá tanto para presentar informes y hacer reportes, como también para retroalimentar el Procesamiento en línea, permitiendo tomar decisiones en base a patrones de eventos que se repiten, promoviendo un escenario de mantenimiento predictivo.
### PRESENTACIÓN Y CONECTIVIDAD CON EL NEGOCIO
Esta capa permite a los usuarios interactuar con la solución y los dispositivos de monitoreo facilitando que vean y analicen los datos recopilados de los dispositivos casi en tiempo real. Por ejemplo, un responsable de monitoreo puede confirmar el estado de los dispositivos y ver las alarmas generadas por el sistema desde una única pantalla. 

Esta capa también permite la integración de la solución con las aplicaciones de procesos de negocio de la empresa, permitiendo el modelado de un proceso de mantenimiento como un proceso de negocio adicional.
En base a las mediciones y alarmas, se podrán lanzar diferentes flujos que permitan la rápida corrección de los incidentes. Informando a los responsables correspondientes de cada evento y en caso de que el problema no pueda ser resuelto en tiempo y forma, escalando la notificación según sea definido en el modelo. Esto facilitará además los procesos de auditoría, permitiendo llevar registros de los eventos ocurridos y sus resoluciones.
