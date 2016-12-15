---

layout: post

title: Como configurar el KIE Server y usar BRMS como un servicio de reglas

date: 2016-12-14 13:06

author: Nahuel Persia

categories: kieserver BRMS reglas rest

---

#Como configurar el KIE server y usar BRMS como un servicio de reglas

En la mayoría de las empresas, la lógica de negocio se encuentra dispersa en lugares como: el código de las aplicaciones, hojas de cálculo, en las mentes de los empleados, manuales de descripción de tareas, etc. Esto provoca que consultar, comprender y aplicar correctamente las reglas de la empresa, resulte complejo.
Ante este escenario surge Red Hat JBoss BRMS, una solución de código libre que permite concentrar todas las reglas de negocio en un único punto para que pueda ser consultado desde cualquier parte de la organización.
El crear las reglas de negocio en este motor de reglas, no sólo indica como modelar las diferentes lógicas de negocio, sino que además la ejecuta.

Red Hat JBoss BRMS como producto, puede ser instalado solo, sin mas, pero también viene incluido dentro de Red Hat JBoss BPMS.

Red Hat JBoss BPMS nos permitirá modelar la lógica de negocio como una serie de tareas relacionadas que se deben ejecutar, dependiendo de diferentes condiciones a evaluar. Las tareas podrían ejecutarse en forma secuencial, paralela o quedar a la espera de eventos. También permitirá que definamos los tipos de tareas, las que pueden ser manuales, scripts, comunicaciones con servicios web, o ejecutar reglas de BRMS.


##Requisitos para seguir este post
- Tener instalado JBoss BRMS 6.x sobre JBoss EAP 6.x o 7.x.
  - Para instalar Red Hat JBoss BRMS pueden ver: https://developers.redhat.com/products/brms/get-started/
  - Para instalar Red Hat JBoss EAP pueden ver: https://developers.redhat.com/products/eap/get-started/
- Tener conocimientos básicos de JBoss EAP.
- Asegurar que se encuentran deployados en JBoss EAP los siguientes paquetes: business-central.war, kie-server.war.
- Tener mínimos conocimientos sobre autoría de reglas de negocio sobre JBoss BRMS 6.x.

La motivación de este post no es enseñar a escribir reglas, ni a usar BRMS, eso lo aprendimos anteriormente. Lo que pretendemos es poder usar las reglas que creamos desde alguna pieza de software externo al motor de reglas, en resumen: **Armar un servicio de reglas**.

Para lograr esto, lo que vamos a hacer es configurar el KIE Server de BRMS, quien es el encargado de gestionar las comunicaciones entre el motor de reglas y el exterior.

Lo primero que hay que tener en cuenta para poder armar un servicio de reglas es la configuración de BRMS, ya que, aunque la instalación incluye todas las herramientas necesarias, tendremos que configurarlas.


##Agregar usuario del KIE server
Una vez que tenemos el archivo standalone.xml configurado, vamos a crear el usuario para controlar el kie server, el cual tendrá que coincidir con el definido en standalone.xml.

Para crearlo vamos a ejecutar la aplicación **$JBOSS_EAP_HOME/bin/add-user.sh** (**$JBOSS_EAP_HOME** es la ubicación de carpeta raíz de nuestro JBoss EAP) con la siguiente información:

- **Usuario:** kieserver
- **Clave:** kieserver1!
- **Rol:** kie-server


##Configuración de standalone.xml
Para localizarlo vamos a la ruta: **$JBOSS_EAP_HOME/standalone/configuration/standalone.xml**.

Una vez que lo encontramos, vamos a agregar la propiedades necesarias para que el KIE Server empiece a funcionar.

Buscamos las siguientes lineas:

{% highlight xml %}
<system-properties>
    <property name="org.kie.server.repo" value="${jboss.server.data.dir}"/>
    <property name="org.kie.example" value="true"/>
    <property name="org.jbpm.designer.perspective" value="ruleflow"/>
</system-properties>
{% endhighlight %}

Y lo vamos a reemplazar por las siguientes:

{% highlight xml %}
<system-properties>
    <property name="org.kie.server.repo" value="${jboss.server.data.dir}"/>
    <property name="org.kie.example" value="true"/>
    <property name="org.jbpm.designer.perspective" value="ruleflow"/>
    <property name="org.kie.server.user" value="kieserver"></property>
    <property name="org.kie.server.pwd" value="kieserver1!"></property>
    <property name="org.kie.server.location" value="http://0.0.0.0:8080/kie-server/services/rest/server"></property>
    <property name="org.kie.server.controller" value="http://0.0.0.0:8080/business-central/rest/controller"></property>
    <property name="org.kie.server.controller.user" value="kieserver"></property>
    <property name="org.kie.server.controller.pwd" value="kieserver1!"></property>
    <property name="org.kie.server.id" value="local-server-123"></property>
</system-properties>
{% endhighlight %}


Cada una de las propiedades agregadas tiene la siguiente funcionalidad:

* **org.kie.server.user:** usuario para conectarnos con el KIE Server desde el controlador
* **org.kie.server.pwd:** contraseña para conectarnos con el KIE Server desde el controlador
* **org.kie.server.location:** URL de la instancia del KIE Server
* **org.kie.server.controller:** lista de URL’s para el endpoint del controlador
* **org.kie.server.controller.user:** usuario que usamos para conectarnos al controlador de la api REST
* **org.kie.server.controller.pwd:** la contraseña del usuario que usamos para conectarnos al controlar de la api REST
* **org.kie.server.id:** ID con el que llamamos al KIE Server

**NOTA:** ver que usamos el usuario y clave para el KIE Server que habíamos configurado anteriormente.

##Crear nuestro proyecto
A partir de este punto vamos a necesitar tener nuestro proyecto disponible, para eso podemos clonar el siguiente proyecto, en cual me voy a basar para mostrar los ejemplos:
https://github.com/npersia/brms-demo.git

Una vez tengamos el proyecto listo, necesitaremos compilarlo y deployarlo, y recordar el número de versión que le asignamos.

![Build & Deploy](/assets/2016-12-14-configurarkieserver/imagen001.png)


##Crear el container
Ahora vamos a poder crear el container del KIE Server.
Estos son entornos autónomos que han sido provisionados para contener instancias de los paquetes que conforman nuestro proyecto.

Para crearlo vamos a **Deploy -> Rule Deployment** dentro del *business-central*, y ahí veremos que el KIE Server **“local-server-123”** está creado.

![Rule deployment](/assets/2016-12-14-configurarkieserver/imagen002.png)
![Primera vista del KIE Server](/assets/2016-12-14-configurarkieserver/imagen003.png)


Teniéndolo seleccionado, hacemos click en **Add Container** y elegimos el paquete que deployamos y queremos exponer a través del KIE Server.

![Container: elegir paquete](/assets/2016-12-14-configurarkieserver/imagen004.png)


*Elegir el paquete como primer paso, aunque este en la parte más baja del menú nos facilita la carga de los datos de configuración, autocompletando con la información correcta todos los campos, excepto el nombre del container.*

![Container: Autocompleta información](/assets/2016-12-14-configurarkieserver/imagen005.png)


Ahora vamos a ponerle un nombre, en mi caso ConteinerTest  y hacemos click a Finish.

![Container: nombrandolo](/assets/2016-12-14-configurarkieserver/imagen006.png)

![Container: Finalizando creación](/assets/2016-12-14-configurarkieserver/imagen007.png)


En este momento tenemos nuestro container creado, pero no está funcionando.

En las dos primeras solapas, vamos a observar que :

- *Status* da el mensaje **No Remote Servers**

![Vista de Status](/assets/2016-12-14-configurarkieserver/imagen008.png)

- *Version Configuration* tiene dos campos a completar:
  - **Scanner**, que resolvería desplegar en el container el último paquete deployado (no vamos a usarlo)
  - **Version** que tiene la versión del paquete que deployamos en el container.
  
![Vista de Version Configuration](/assets/2016-12-14-configurarkieserver/imagen009.png)


*Cada vez que hagamos modificaciones en el proyecto, y esto implique crear una nueva versión del proyecto, vamos a tener que venir al conteiner y actualizar el número de versión al cual esta apuntando. De no hacerlo, como en BRMS todas las versiones quedan guardadas, a menos que intencionalmente las borremos, seguirá dando la funcionalidad anterior.*

Una vez que está todo listo y la versión es la correcta, podemos hacer click en el boton **start**.

Ahora en la solapa *Status*, veremos que el container **local-server-123@0.0.0.0:8080** tiene un tilde verde, lo que indica que se levanto correctamente.

![Servidor corriendo](/assets/2016-12-14-configurarkieserver/imagen011.png)

Haciendo click en el link que muestra el containter podremos ver mas información.

![Respuesta del servidor corriendo](/assets/2016-12-14-configurarkieserver/imagen010.png)


En este momento estamos listos para empezar a consumir la información de nuestro motor de reglas desde un medio externo.

Para hacer esto, yo voy a usar Postman, una extensión de Google Chrome para enviar mensajes.


##Configuración de Postman
Para enviar los mensajes desde Postman, voy a usar la siguiente configuración:

**URL:** http://0.0.0.0:8080/kie-server/services/rest/server/containers/instances/ConteinerTest (como en org.kie.server.location)

**Metodo:** Post

**Headers:**

* Authorization: Basic a2llc2VydmVyOmtpZXNlcnZlcjEh (a2llc2VydmVyOmtpZXNlcnZlcjEh significa en Base 64: "kieserver:kieserver1!", si usamos una combinación de usuario y clave diferente tendremos que codificarla usando el formato "usuario del KIE Server:clave")
* Content-Type: application/xml
* X-KIE-ContentType: xstream
* Accept: application/xml

![Postman configuracion](/assets/2016-12-14-configurarkieserver/imagen012.png)

* Body:

{% highlight xml %}
<batch-execution lookup="ksesion1">

    <insert-elements return-object="true">

        <org.acme.insurance.Driver>
            <driverName>Juan</driverName>
            <numberOfAccidents>0</numberOfAccidents>
            <numberOfTickets>0</numberOfTickets>
            <age>24</age>
            <creditScore>500</creditScore>
        </org.acme.insurance.Driver>

        <org.acme.insurance.Policy>
            <policyType>AUTO</policyType>
            <vehicleYear>2009</vehicleYear>
        </org.acme.insurance.Policy>

    </insert-elements>

    <fire-all-rules max="10"/>

    <query out-identifier="policy" name="getPolicy"/>
    <query out-identifier="driver" name="getDriver"/>
    <query out-identifier="rejection" name="getRejection"/>


</batch-execution>
{% endhighlight %}

![Postman body](/assets/2016-12-14-configurarkieserver/imagen013.png)

**Lo cual nos va a responder**


{% highlight xml %}
<org.kie.server.api.model.ServiceResponse>
    <type>SUCCESS</type>
    <msg>Container ConteinerTest successfully called.</msg>
    <result class="execution-results">
        <result identifier="driver">
            <query-results>
                <identifiers>
                    <identifier>driver</identifier>
                </identifiers>
                <row>
                    <identifier id="driver">
                        <org.acme.insurance.Driver>
                            <driverName>Juan</driverName>
                            <age>24</age>
                            <numberOfAccidents>0</numberOfAccidents>
                            <numberOfTickets>0</numberOfTickets>
                            <creditScore>500</creditScore>
                        </org.acme.insurance.Driver>
                        <fact-handle external-form="0:1:1082137710:1082137710:1:DEFAULT:NON_TRAIT:org.acme.insurance.Driver"/>
                    </identifier>
                </row>
            </query-results>
        </result>
        <result identifier="rejection">
            <query-results>
                <identifiers/>
            </query-results>
        </result>
        <result identifier="policy">
            <query-results>
                <identifiers>
                    <identifier>policy</identifier>
                </identifiers>
                <row>
                    <identifier id="policy">
                        <org.acme.insurance.Policy>
                            <policyType>AUTO</policyType>
                            <vehicleYear>2009</vehicleYear>
                            <price>450</price>
                            <priceDiscount>10</priceDiscount>
                        </org.acme.insurance.Policy>
                        <fact-handle external-form="0:2:1089542838:1089542838:4:DEFAULT:NON_TRAIT:org.acme.insurance.Policy"/>
                    </identifier>
                </row>
            </query-results>
        </result>
    </result>
</org.kie.server.api.model.ServiceResponse>
{% endhighlight %}

##Conclusión

Con estas simples configuraciones, el motor de reglas va a estar funcionando como un servicio, y podremos implementar módulos de REST api en nuestras aplicaciones para consultarlo.

Ahora sólo resta aplicar los conocimientos de BRMS y la imaginación de cada uno para sacar el mayor provecho a la herramienta.


Espero esta información sea de utilidad.

Cualquier duda o comentario me lo pueden dejar acá o me mandan un mail a nahuel.persia@semperti.com




Saludos,

Nahuel Persia
