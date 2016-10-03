# Blog Técnico de Semperti

## Instrucciones para aportar

Para poder aportar lo primero que debe suceder es ser invitado a formar parte de la organización de GitHub de Semperti en calidad de escritor.

Para esto se deberá enviar el usuario de GitHub a blog@semperti.com.

Cuando esto suceda se recibira una notificacion via mail la cual debera ser aceptada.

Una vez dentro de la organizacion se debera seleccionar el repositorio Semperti/semperti.github.io e ir al directorio \_posts como indica la imagen:

![Main Page Repo Blog](.images/main.png)

Una vez dentro del directorio de \_posts se debera crear el archivo que representara la entrada en el Blog mediante el boton de "Crear Nuevo Archivo".

El nombre del archivo debera tener el formato AAAA-MM-DD-nombre-del-post.md y seguira la convencion de escritura de Jekyll en formato Markdown.

![Crear Entrada Blog](.images/crear_archivo.png)

Una vez dentro del editor, simplemente completamos el nombre del archivo del post y su contenido.

![Creando Entrada Blog](.images/creando_archivo.png)

Cuando finalizamos el post, vamos hacia la parte de abajo de la pagina del editor y realizamos el *commit* del mismo, agrengando un titulo y comentario acorde.

Como se puede ver en la imagen a continuacion, el post no se sube directamente al *maste* ya que el mismo representa el blog en produccion, sino que se crea un entorno de *staging*, en este caso una *branch* aparte.

Esto a su vez genera un *pull request*, esto es un mecanismo por el cual se notifica al grupo de editores que alguien solicito subir un post y entra en proceso de revision.

A continuacion puede verse la interfaz del *pull request*.

![Pull Request](.images/creando_pull_request.png)

En este momento podria suceder que el editor estuviera de acuerdo con todo el post y lo uniera al *master*.

En caso contrario el editor solicitra cambios los cuales se notificaran via mail en la casilla configurada en la cuenta de GitHub.

Ahi habra un link para ver la revision realizada por el editor. 

Este link nos lleva a la siguiente interfaz:

![Code Review](.images/ver_review.png)

Haciendo click en "Ver Review" se veran los cambios indicados por el editor.

![Viendo Review](.images/viendo_review.png)

Para realizar los cambios debera seleccionarse el archivo del post, realizar los cambios y volver a realizar el *commit*, asi:

![Cambios](.images/haciendo_cambios.png)

Este proceso podra repetirse hasta que esten todos los cambios aceptados y el post se incluya en el *master*.

### Alternativas

Si bien este instructivo apunta a utilizar la interfaz propuesta por GitHub, al ser un repositorio mas, puede utilizarse el cliente git que sea de preferencia.

### Info Adicional

[Guia Markdown](https://guides.github.com/features/mastering-markdown/)

[Guia Jekyll](https://jekyllrb.com/docs/posts/)

[Guia Git](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

