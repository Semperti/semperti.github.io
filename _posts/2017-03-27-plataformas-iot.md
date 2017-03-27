---
layout: post
title:  "Plataformas de IoT"
date:   2017-03-27 16:00:00
categories: IoT
image: /assets/2017-03-27-plataforma-iot/imagen002.png
---
# Implementación de una Solución de Monitoreo de Dispositivos
En este post vamos a analizar las principales plataformas de IoT que se ofrecen en el mercado, comparando las tecnologías que usan, sus ventajas y precios, entre otros.

## Resumen IoT
El concepto de internet de las cosas (IoT) se refiere a la interconexión de objetos cotidianos a internet, permitiendo así monitorear estos objetos en tiempo real.
Por ejemplo, si esta solución se llevara al extremo en el que los libros, termostatos, refrigeradores, la paquetería, lámparas, botiquines, partes automotrices, etc. estuvieran conectados a Internet y equipados con dispositivos de identificación, no existirían, en teoría, artículos fuera de stock o medicinas caducadas; sabríamos exactamente la ubicación, cómo se consumen y se compran productos en todo el mundo; no existiría el extravío y sabríamos qué está encendido o apagado en todo momento.

El siguiente gráfico muestra las partes de una solución de IoT.
![Arquitectura](/assets/2017-03-27-plataforma-iot/imagen001.png)
En esta solución se pueden diferenciar tres partes de la solución:
* Telemetría de dispositivos
* Procesamiento de datos y análisis
* Presentación y conectividad con el negocio



### Telemetría de dispositivos
Esta parte de la arquitectura abarca a los dispositivos que envían la telemetría hacia la solución de IoT para el análisis y almacenamiento de los datos.Estos dispositivos también podrán recibir datos desde la solución de IoT a fin de que modifiquen su comportamiento operativo.
Todos los datos enviados por los dispositivos llegan al Cloud Gateway, quien se encarga de distribuir la información hacia el IoT backend, para su posterior procesado. El Cloud Gateway también se encargará de enviar la información desde el IoT backend a los dispositivos.

Para lograr la comunicación entre los dispositivos y el Cloud Gateway, los que utilicen protocolo IP podrán hacerlo en forma directa, mientras que los que utilicen otro protocolo deberán acceder mediante un dispositivo que tendrá la función de IP Bridge.

###Procesamiento de datos y análisis
En la solución de IoT, el IoT backend es donde ocurre la mayor parte del procesamiento de datos, encargándose de recibir los datos de los dispositivos y determinar cómo procesarlos y almacenarlos, permite enviar datos a dispositivos específicos, e integrar la información con otras aplicaciones o servicios.

Finalmente, será el responsable de disponibilizar la información para ser consumida por el backend.
### Presentación y conectividad con el negocio
Esta capa permite a los usuarios finales ver y analizar los datos recopilados de sus dispositivos. Estas vistas pueden adoptar la forma de cuadros de mando o informes de BI que pueden mostrar datos históricos o datos casi en tiempo real. Esta capa también permite la integración de la solución de IoT backend con las aplicaciones existentes para vincularse a los procesos de negocio de la empresa o flujos de trabajo.


## PLATAFORMAS IoT
Las grandes empresas de software están en la carrera de desarrollar plataformas para IoT cada vez más poderosas, proporcionando un Cloud Gateway capaz de realizar eficientemente la comunicación y simplificar el consumo de datos.
Durante el análisis realizado para la creación de esta propuesta se consideraron los proveedores con mayor madurez técnica, liderazgo en el mercado y con presencia local, siendo los seleccionados los siguientes tres: 

* Microsoft Azure
* IBM Bluemix
* Amazon AWS


### Una breve introducción: Las Plataformas
**Microsoft Azure IoT Hub** es un servicio que establece una comunicación bidireccional entre los dispositivos y el backend del negocio a través de la nube. El canal de comunicación es seguro y de confianza, utilizando credenciales de autenticación por dispositivo y control de accesos, esto será detallado más avanzado el documento.
Gracias a su naturaleza bidireccional, tanto los dispositivos podrán enviar sus datos de telemetría al backend, como desde el backend hasta los dispositivos.
IoT Hub tiene un registro de identidad para cada uno de los dispositivos, donde se guarda toda la información de estos. Esta información permite su monitoreo, como el estado de conexión, el momento de ultima actividad, etc.
**IBM Watson IoT Platform** también provee una comunicación bidireccional entre el backend y los dispositivos. En esta solución todos los mensajes pasarán por Watson IoT Platform donde los dispositivos publicarán datos a través de eventos, en los que la plataforma funcionará de intermediario, enviando la información al backend y a otros dispositivos configurados en esta. Como en otras soluciones, se le otorgará un ID único a cada dispositivo y aplicación del backend que lo relaciona con cada implementación realizada en la plataforma, permitiendo ofrecer una robusta capa de seguridad.
En **Amazon AWS IoT** la comunicación también es bidireccional, donde cada dispositivo publica su estado en un broker de mensajes, distinguiendo por tópicos. Esta información de estados es enviada a los clientes que hacen consumo de los dispositivos y se los mantiene actualizados. Cuando un cliente requiere que el dispositivo cambie su estado, se publica esta necesidad en la plataforma, donde frecuentemente enviará el mensaje de actualización a cada uno.

### SDKs: Lenguajes y plataformas soportados
Microsoft Azure IoT Hub puede ser accedido a través de diferentes protocolos estándar como por ejemplo HTTP o AMQP, aunque también proporciona SDKs para diferentes lenguajes y plataformas. Cuenta con el .Net SDK para las aplicaciones .Net Framework puras y las aplicaciones UWP (Universal Windows Platform) que se ejecutan en dispositivos Windows 10 (incluida la versión IoT, Windows 10 IoT Core), otros SDK son para desarrolladores Java, NodeJS y C.

IBM Watson IoT Platform proporciona una serie de bibliotecas, ejemplos e información para permitir el desarrollo de aplicaciones que puedan comunicarse la plataforma de IoT. Se podrán utilizar los SDKs provistos de MQTT messaging, C#, C, Python, Java, NodeJS y Node-RED.

Amazon AWS IoT permite a los dispositivos acceder a la solución de IoT utilizando protocolos estándar como HTTP y MQTT, pero también proporciona algunas SDKs para simplificar el trabajo de desarrollo. En primer lugar se ofrece un SDK para C que es multiplataforma y que se puede utilizar en diferentes hardware y sistemas operativos. El SDK agrega una capa de abstracción sobre todas las acciones necesarias para acceder a la solución de IoT que están relacionadas con la seguridad del canal, la comunicación basada en MQTT. Un NodeJS SDK también está disponible para plataformas de gran alcance y, finalmente, otro SDK sólo para Arduino Yun.

### Seguridad y autenticación
Microsoft Azure IoT Hub se basa en el protocolo Transport Layer Security (TLS), lo que permite que la comunicación entre dispositivos y la nube (y viceversa) se cifre y garantice la confidencialidad de los datos para los clientes. También se asegura la autenticación de dispositivos y servicios con control de accesos y credenciales para definir un conjunto de permisos que otorgarán accesos a los endpoints expuestos. Ofrece un esquema de seguridad TLS solo de autenticación del servidor, autenticando cada dispositivo con tokens.

Al igual que la anterior, IBM Watson IoT Platform también se basa en el protocolo de seguridad TLS, utilizándolo tanto para la comunicación de los dispositivos y aplicaciones hasta la IoT y viceversa.

Amazon AWS IoT también tiene la seguridad de la capa de transporte, cifrando la comunicación entre los dispositivos y la plataforma de IoT. Ofreciendo una comunicación TLS mutua entre el dispositivo y la plataforma a través de certificados X.509.

### Protocolos de comunicación
En Microsoft Azure IoT Hub el protocolo oficial elegido es AMQP 1.0, aunque por su naturaleza de código abierto sería simple realizar una adaptación de este protocolo para que la plataforma acepte otros.
AMQP 1.0 ofrece soporte para otros protocolos, como por ejemplo MQTT 3.1.1, adicionalmente admite una comunicación a través de HTTP.

IBM Watson IoT Platform soporta MQTT 3.1.1 para la comunicación entre los Gateway y la plataforma IoT, en cambio, para comunicar los dispositivos con la plataforma se puede utilizar tanto MQTT 3.1.1 como HTTP.

En Amazon AWS IoT el protocolo oficialmente soportado es MQTT 3.1.1, con algunas variaciones. El protocolo HTTP también está soportado en forma de API REST sólo utilizando el método POST.

### Hardware soportado
Microsoft Azure IoT Hub ofrece una lista de plataformas soportadas y certificadas, las cuales podrán utilizar el servicio de IoT directamente utilizando las SDKs provistas por Microsoft con soporte para microcontroladores Intel, Raspberry Pi, Freescale (con Kinetis K64F MCU basado en la plataforma ARM mbed), entre otros. Por supuesto, este programa está abierto y se incorporarán nuevas plataformas en el futuro.

IBM Watson IoT Platform soporta y certifica diferentes placas sobre las cuales podremos construir nuestro proyecto de IoT, en la cual podremos encontrar ARM mbed, Texas Instruments, Intel, Raspberry Pi, Arduino Uno.

Amazon AWS IoT ofrece kits de inicio para desarrollar rápidamente prototipos. Hay tableros de alto nivel conocidos como el Qualcomm Dragonboard (C y NodeJS), BeagleBone (C y NodeJS), Intel Edison (C y NodeJS) y algunas placas con dispositivos muy restringidos como Renesas (con Micrium OS) y TI CC3200 (con TI-RTOS).

### Precios
Microsoft Azure IoT Hub está disponible con carácter general y se ofrece en cuatro ediciones: Gratis, S1, S2 y S3. IoT Hub.

Gratis: Permite transmitir hasta un total de 8000 mensajes al día. La edición Gratuita está pensada para  familiarizarse con el servicio IoT Hub y probar sus funciones en ambientes de prototipado.

S1: La edición S1 de IoT Hub se ha diseñado para las soluciones de IoT que generan cantidades de datos relativamente pequeñas. Cada unidad de la edición S1 permite transmitir hasta 400.000 mensajes por día a través de todos los dispositivos conectados.

S2: La edición S2 de IoT Hub se ha diseñado para las soluciones de IoT que generan grandes cantidades de datos. Cada unidad de la edición S2 permite hasta 6 millones de mensajes por día a través de todos los dispositivos conectados.

S3: la edición S3 de IoT Hub se ha diseñado para las soluciones de IoT que generan grandes cantidades de datos. Cada unidad de la edición S3 admite hasta 300 millones de mensajes por día a través de todos los dispositivos conectados.


Edición|Cantidad Mensajes|Precio por Mes|Disponibilidad
Free|8000|0|No
S1|400.000|50|99,9%
S2|6.000.000|500|99,9%
S3|300.000.000|5000|99,9%

**NOTA:** El tamaño máximo de mensaje que se puede enviar desde un dispositivo a la nube es de 256 KB. Estos mensajes se miden en bloques de 4 KB para las ediciones de pago (es decir, S1, S2 y S3) de forma que, por ejemplo, si el dispositivo envía un mensaje de 16 KB con las ediciones S1, S2 o S3, este se contabilizarán como 4 mensajes. Los mensajes enviados por los dispositivos conectados con la edición gratis se miden en bloques de 0,5 KB. Por ejemplo, si el dispositivo envía un mensaje de 16 KB con la edición Gratis de IoT Hub, este se contabilizará como 32 mensajes.

El tamaño máximo por mensaje que se puede enviar desde la nube a un dispositivo es de 64 KB y se mide en bloques de 4 KB para las ediciones de pago (es decir, S1, S2 y S3). Así, por ejemplo, un mensaje de 8 KB enviado con las ediciones S1, S2 o S3 se contabilizarán como 2 mensajes. Los mensajes enviados con la edición Gratis se miden en bloques de 0,5 KB. Por ejemplo, un mensaje de 8 KB enviado con la edición Gratis de IoT Hub se contabilizará como 16 mensajes.



IBM Watson IoT Platform diferencia tres planes: Lite, Standard y Advanced Security (que agrega herramientas de análisis de datos y seguridad).
Lite: incluye hasta 20 dispositivos y 100 MB de métrica de datos por mes.
Standard: incluye el plan Lite y registro ilimitado de dispositivos. Se paga por el Tier utilizado:
* Tier 1: 1 MB - 450 GB $ 0,001 USD por MB intercambiado
* Tier 2: 450GB - 7TB $ 0,0007 USD por MB intercambiado
* Tier 3: 7TB y más de $ 0,00014 USD por MB intercambiado
Advanced Security:  incluye el plan Lite y registro ilimitado de dispositivos. Se paga por el Tier utilizado:
* Tier 1: 1 MB - 450 GB $ 0,0013 USD por MB intercambiado
* Tier 2: 450GB - 7TB $ 0,00091 USD por MB intercambiado
* Tier 3: 7TB y más de $ 0,000182 USD por MB intercambiado

**NOTA:** El tamaño máximo de mensaje que se puede enviar desde un dispositivo a la nube es de 128 KB. 


Edición|Tier 1|Tier 2|Tier 3|Incluye
Lite|$0|$0|$0|20 dispositivos y 100 MB
Standard|$0,001|$0,0007|$0,00014|Lite + ilimitados dispositivos
Advanced|$0,0013|$0,00091|$0,000182|Standard + funciones de Analytics

Amazon AWS IoT sólo cobra por la cantidad de mensajes enviados, donde cada mensaje puede tener como máximo 128 KB, y cada mensaje será divididos en paquetes de 512 Bytes, con lo cual, si un mensaje ocupa 4 KB, será contabilizado como el envío de 8 paquetes.

El costo por millón de paquetes enviados es de U$S 5.

### Comparativa de Precios
Para hacer una comparativa de precios de las diferentes plataformas de IoT supongamos el caso de que se cuente con 40 dispositivos, los cuales envían un mensaje de 4 KB cada 10 segundos.

En Microsoft Azure IoT Hub cada uno de los mensajes de 4 KB se contarán como 1 mensajes, con lo cual se enviarán: 40 dispositivos x 1 mensaje x 8640 envíos por dispositivo = 345.600 de mensajes enviados por día, con un costo de U$S 50 mensuales.

En IBM Watson IoT Platform, utilizando la suscripción Standard, se enviarán: 40 dispositivos x 259200 mensajes por mes x 4 KB de tamaño de mensaje = 40.500 MB con un costo de U$s 40,40 mensuales.

En Amazon AWS IoT cada mensaje se dividirán en 8 mensajes de 512 Bytes, con lo cual se enviarán se enviarán: 40 dispositivos x 8 mensajes x 8640 envíos por dispositivo x 30 días = 82.944.000 mensajes mensuales,  al cobrarse la proporción de U$S 5 por cada millón de mensajes, tendrá un costo de U$S 414.72 mensuales.


**NOTA:** todos los precios utilizados en este inciso son los expuestos por las páginas de precios de cada una de las plataformas de IoT para Estados Unidos. Sólo fueron tomados a modo de realizar comparaciones entre las diferentes soluciones.


## CONCLUSIÓN
En conclusión estas plataformas de IoT tienen como finalidad recoger los datos de los dispositivos, analizarlos y presentarlos. La toma de decisiones en base a estos datos queda por fuera de estas plataformas. Por eso, es que es necesario si se desea que en base a estos datos se disparen procesos de negocio, por ejemplo, se deberá realizar una solución que se pueda integrar con la plataforma de IoT y así completen estas funcionalidades.


## CUADRO COMPARATIVO
A continuación se presenta una tabla comparativa entre las diferentes soluciones



  |Azure IoT Hub|AWS IoT|Watson IoT Platform
-|-------------|-------|-------------------
SDK/Lenguajes|.Net y UWP, Java, C, NodeJS|C, NodeJS, Javascript, Arduino, Java, Python|C#, C, Python, Java, NodeJS
Seguridad|TLS (Autenticación del Server)|TLS (Autenticación mutua)|TLS
Autenticación|Por dispositivo con token SAS|Autenticación con certificado X.509|Por dispositivo con token
Protocolos|HTTP, AMQP, MQTT|HTTP, MQTT|HTTP, MQTT
Hardware soportado|Intel, Raspberry Pi, Freescale, etc|Broadcom Marvell, Reneses, Texas Instruments, Microchip, Intel, Mediatek, Qualcomm, Seeed, BeagleBoard|ARM mbed, Texas Instruments, Intel, Raspberry Pi, Arduino Uno







