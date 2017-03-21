---
layout: post
title:  "Solución de Arquitectura IoT"
date:   2017-03-21 11:30:00
categories: general
image: /assets/2017-03-21-solucion-iot/imagen002.png
---
# IMPLEMENTACIÓN DE UNA SOLUCION DE MONITOREO DE DISPOSITIVOS
En este post vamos a desarrollar una solución de monitoreo de dispositivos. Para desarrollar el modelo de solución tomaremos como caso modelo el monitoreo de de heladeras, las cuales se necesita que tengan una tempreratura precisa para asegurar la correcta cadena de frío de los elementos que estas contienen, evitando así su deterioro, ya sea por falta de frío, como también por su exceso. Para asegurar esto, se deberá poder consumir la información del monitoreo, enriquecerla, informar el estado de los elementos monitoreados, y el estado de los dispositivos que realizan los monitoreos. Asimismo, el sistema podrá enviar alertas y notificaciones a quien corresponda al detectarse anomalías en las variables monitoreadas o en los mismos dispositivos de monitoreo. También puede ser expandido para la detección de fallas relacionadas entre sí (ej: alza en temperatura de heladera por puerta abierta) y de fallas tempranas basadas en patrones de funcionamiento de los dispositivos.

Toda esta información permitirá integrarse con los sistemas de procesos de negocios, permitiendo así la creación de flujos de mantenimiento, ayudando a la rápida detección de los puntos con problemas y agilizar las acciones correctivas ante una falla.
Además permite dar visibilidad sobre el estado de los diferentes eventos a fin de poder tener una visión global del estado de situación como así también implementar procesos de escalado automático según sea necesario. 

Cabe destacar que, aunque la solución presentada está orientada al monitoreo de heladeras, podría realizarse consumo de telemetría de prácticamente cualquier elemento factible de ser medido, como por ejemplo:
* estado y temperatura de calderas
* estado de ascensores

## FUNCIONALIDADES DE MEDICIÓN

A continuación, se detallan las diferentes mediciones a realizar por el sistema, que servirán de entrada de información para el procesamiento de datos:

### MEDICIÓN DE TEMPERATURAS
La información es tomada por los dispositivos de medición de temperatura que se encuentran en cada una de las heladeras monitoreadas, y enviándola a la solución de software, donde se sirve para enriquecer el resto de los sistemas y, posteriormente, presentada en el dashboard para que el encargado pueda monitorear el estado de los dispositivos de manera simple y ágil.
### MONITOREO DE PUERTAS CERRADAS
Existe un dispositivo de monitoreo que controla que una puerta se encuentre correctamente cerrada, este le envía a la solución de software el estado de la puerta.
### MONITOREO DE SUMINISTRO ELÉCTRICO
Se coloca un dispositivo conectado en paralelo con la corriente eléctrica de la heladera que se quiere monitorear, que se encarga de enviar a la solución de software el estado de la corriente de la heladera.
### ESTADO DE LOS DISPOSITIVOS DE MONITOREO
Todos los dispositivos de monitoreo son escaneados periódicamente para poder comprobar que están funcionando correctamente.
### FUNCIONALIDADES DE PROCESAMIENTO DE DATOS
A continuación, se detallan las funcionalidades resultantes de procesar los datos de medición y enriquecerlos con la información de contexto y cruzamiento de datos de diferentes mediciones.
#### ALARMAS DE LÍMITE CRÍTICO DE TEMPERATURA
Para cada heladera a medir se deberá definir un límite superior e inferior de temperatura entre los cuales es seguro el almacenamiento del material que el HOSPITAL ALEMÁN disponga.
En los casos en que la temperatura de la heladera salga de este rango, se emitirá una alarma que indique:
* cual es la heladera con el problema
* si la alarma es por alta temperatura
* si la alarma es por baja temperatura
* la temperatura a la que se encuentra actualmente
* la hora a la que se empezó a emitir la alarma
#### ALARMAS DE LÍMITE PELIGROSO DE TEMPERATURA
Al definirse los rangos de temperatura de cada heladera, se definirá sub-rango de temperatura segura. 
Este límite se puede definir a fin de detectar variaciones de temperatura que reduzcan la vida útil del material almacenado.
Cuando salgan de este rango, se activarán alarmas de advertencia de temperatura peligrosa.
En estos casos se detallará:
* cual es la heladera con el problema
* si la alarma es por alta temperatura
* si la alarma es por baja temperatura
* la temperatura a la que se encuentra actualmente
* la hora a la que se empezó a emitir la alarma
#### ALARMAS DE PUERTA ABIERTA
Para cada heladera se monitorea que la puerta no permanezca abierta por más de un tiempo límite, el cual, una vez superado lanzará una alarma.
En estos casos se emitirá una alarma que indique:
* cual es la heladera con el problema
* la temperatura a la que se encuentra actualmente
* la hora a la que se empezó a emitir la alarma
#### ALARMAS DE DISPOSITIVOS DE MONITOREO FUERA DE FUNCIONAMIENTO
Los datos de monitoreo de cada dispositivo son enviados en forma periódica por cada uno de estos. En los casos en que no se consiga recibir la información de los dispositivos, se activará una alarma de dispositivo de monitoreo fuera de funcionamiento.
En este caso se activará una alarma que entregará la siguiente información:
* heladera en la que está instalado el dispositivo
* dispositivo con problemas
* mediciones afectadas
* la hora en la que el dispositivo respondió correctamente por última vez
#### ALARMAS DE FALLA EN EL SUMINISTRO ELÉCTRICO
En los casos en los que exista una falla en el suministro eléctrico de una heladera, se emitirá una alarma indicando:
* heladera con falta de suministro eléctrico
* la hora a la que se empezó a emitir la alarma
### ARQUITECTURA DE LA SOLUCIÓN
![Arquitectura](/assets/2017-03-21-solucion-iot/imagen001.png)
#### TELEMETRÍA DE DISPOSITIVOS
Los dispositivos recolectan la información de los diferentes monitoreos, los que sean dispositivos IP envían la información en forma directa al Agregador, mientras que los que no son IP deben pasar por un IP Bridge para convertir el protocolo.
Una vez que las señales llegan al Agregador, la información es formateada de forma tal que los sistemas que tomen la información lo puedan hacer en forma transparente agregando a qué dispositivo corresponde cada medición, facilitando las tareas subsiguientes.
#### PROCESAMIENTO DE DATOS Y ANÁLISIS
El Procesamiento en línea es donde se recibe, analiza, procesa y finalmente distribuye la información.
En esta pieza de la solución, en base a las mediciones obtenidas, y a diferentes reglas configuradas, se generarán las alarmas correspondientes y se entregará la información a los diferentes sistemas.

Asimismo, toda la información recolectada será almacenada en una base de datos, la cual servirá tanto para presentar informes y hacer reportes, como también para retroalimentar el Procesamiento en línea, permitiendo tomar decisiones en base a patrones de eventos que se repiten, promoviendo un escenario de mantenimiento predictivo.
#### PRESENTACIÓN Y CONECTIVIDAD CON EL NEGOCIO
Esta capa permite a los usuarios interactuar con la solución y los dispositivos de monitoreo de las heladeras facilitando que vean y analicen los datos recopilados de los dispositivos casi en tiempo real. Por ejemplo, un responsable de monitoreo puede confirmar el estado de las temperaturas de las heladeras y ver las alarmas generadas por el sistema desde una única pantalla. 

Esta capa también permite la integración de la solución con las aplicaciones de procesos de negocio del HOSPITAL ALEMÁN, permitiendo el modelado de un proceso de mantenimiento como un proceso de negocio adicional.
En base a las mediciones y alarmas, se podrán lanzar diferentes flujos que permitan la rápida corrección de los incidentes. Informando a los responsables correspondientes de cada evento y en caso de que el problema no pueda ser resuelto en tiempo y forma, escalando la notificación según sea definido en el modelo. Esto facilitará además los procesos de auditoría, permitiendo llevar registros de los eventos ocurridos y sus resoluciones.
