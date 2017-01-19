---

layout: post

title: BPMS as a Service

date: 2017-01-19 14:00

author: Nahuel Persia

categories: BPMS procesos servicio redhat middleware

image: /assets/2016-12-14-configurarkieserver/imagen004.png

---



# BPMS as a Service
La mayoría de las veces que necesitamos tener un JBoss BPMS como servicio, googleamos y terminamos en en los foros de Red Hat, donde la información esta completa y es de la cual me basé para armar esto, pero no incluyen todas los paquetes que se tienen que instalar si empezamos con un RHEL recién instalado. 


## Prerrequisitos

Para empezar con la instalación y condiguración de un JBoss BPMS standalone, será necesario:

Una máquina virtual con las siguientes características:
4GB de memoria RAM por lo menos
20 GB de disco rígido
2 cores
RHEL 7.x (CentOS 7.x)

Una vez configurada la máquina virtual y registrado el sistema operativo (en caso de ser RHEL y no CentOS), se requieren descargar los siguientes paquetes:
- libstdc++
- java-devel
- apr
- openssl
- java

## Instalación
Con todos los paquetes instalados se puede proceder a la instalación de EAP y BPMS, para esto SEMPERTI desarrolló una pieza de software que la orquesta en forma automática (https://github.com/Semperti/BPMS_auto_install).

Para poder utilizar esta, se requiere contar con los paquetes:
- jboss-bpmsuite-6.4.0.GA-installer.jar
- jboss-eap-6.4.0-installer.jar
- jboss-eap-6.4.7-patch.zip

Todos estos paquetes pueden descargarse de: https://access.redhat.com/jbossnetwork/restricted/listSoftware.html

**NOTA:** Para poder acceder y descargar los programas, se deberá crear una cuenta de usuario previamente.

Estos deberan ser copiados dentro de la carpeta installs del programa BPMS_auto_install.

Se debe ejecutar el **./init.sh** para instalar todo.

Cuando el proceso finaliza, dentro de la carpeta de BPMS_auto_install se verá que se creó una carpeta llamada target, en la cual se instalaron todos los componentes necesarios para ejecutar JBoss BPMS.

Para poder ejecutarlo manualmente se debe acceder a la siguiente ruta **./target/jboss-eap-6.4/bin**,
donde se ejecuta el comando “**./standalone.sh -b 0.0.0.0**”

## BPMS como servicio
Nota antes de iniciar:
Siempre que se haga referencia a $BPMS_auto_install, se refiere a la ruta donde BPMS_auto_install está instalado. 

Para disponibilizar JBoss BPMS como un servicio se deben seguir los siguientes pasos:
- Dirigirse a la ruta “**$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d**”, una vez aquí se debe modificar el archivo “**jboss-as-standalone.sh**” reemplazando la linea 53, “**JBOSS_SCRIPT=$JBOSS_HOME/bin/standalone.sh**” por “**JBOSS_SCRIPT=$JBOSS_HOME/bin/standalone.sh" -b 0.0.0.0"**”
- Agregar al final del archivo “**$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d/jboss-as.conf**” la línea “**JBOSS_HOME=$BPMS_auto_install/target/jboss-eap-6.4**” y “**JBOSS_USER=root**”
- Crear la carpeta “**/usr/share/jboss-as**”.
- Crear la carpeta “**/etc/jboss-as**”.
- Copiar “**$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d/jboss-as.conf**” en “**/etc/jboss-as**”.
- Crear en la ruta “**/etc/systemd/system**” el archivo “**jbosseap6.service**” con el siguiente contenido:

{% highlight bash %}
[Unit]
Description=JBoss EAP Systemctl script
After=NetworkManager.service

[Service]
Type=forking
ExecStart=$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d/jboss-as-standalone.sh start
ExecStop=$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d/jboss-as-standalone.sh stop
ExecReload=$BPMS_auto_install/target/jboss-eap-6.4/bin/init.d/jboss-as-standalone.sh restart
PIDFile=/var/run/jboss-as/jboss-as-standalone.pid

[Install]
WantedBy=multi-user.target
{% endhighlight %}

Ejecutar “**systemctl enable jbosseap6**” para que el servicio inicie al iniciar la máquina virtual.



Espero que sea de utilidad, cualquier cosa que no se entienda me escribe por acá o a mi mail: nahuel.persia@semperti.com
