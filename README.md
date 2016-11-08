## Semperti blog

#### Categorias

* Editar las categorias en la carpeta "category" para poder asi incluir esas categorias en el tag "categories:" de cada post. Esto permite filtrar los posts por categoria en el archivo.
Por ejemplo:

Quiero crear una categoria "Programacion", entonces en la carpeta creo un archivo "programacion.md".
El archivo debe seguir el siguiente layout:

```
---
layout: posts_by_category
categories: programacion  <-- Este seria el tag a incluir en los posts
title: Programacion       <-- Este seria el titulo de la categoria que va a figurar en el archivo
permalink: /category/programacion/  <-- /category/NOMBRE_DE_ARRIBA/ (es importante la barra al final)
---
```

Una vez creado el archivo, solo debe usar el tag "categories: programacion" en cualquier post y automaticamente van a poder ser filtrados por esta categoria.

#### Redes sociales

* Para editar los links a las redes sociales hay que agregar los links en el archivo "social.json" dentro de la carpeta "_data". Por ejemplo:

Asumiendo que el link a la pagina de facebook es
```
http://www.facebook.com/semperti
```
en el archivo "social.json" cambiaria:
```
  {
    "icon": "fa-facebook",
    "link": ""
  }
```
por
```
  {
    "icon": "fa-facebook",
    "link": "http://www.facebook.com/semperti"
  }
```
y el icono de facebook automaticamente va a llevar a la pagina ahora.
Para modificar el icono, busco el nombre en la pagina http://fontawesome.io/icons/ dentro de la seccion "Brand Icons", ahi voy a encontrar los iconos de Facebook, Twitter, etc.

#### Sección Equipo

* Para modificar la sección de equipo es necesario acceder al archivo "equipo.json" ubicada en la carpeta "_data". Una vez abierto el archivo vamos a encontrarnos por una lista de integrantes encerrados entre corchetes( [] ), teniendo en cada miembro una llave que abre( { ) y una llave que cierra ( } ). Los avatars deben estar con extensión PNG en la carpeta "/static/img/avatars/".
* Para modificar algún miembro existente solo debo modificar la propiedad que quiera y guardar. Por ejemplo, si quiero cambiar el avatar de Nicolas Cisco por un archivo que se llama "av-cisco2.png" cambiaría:

```
"avatar": "av-cisco",
```
por
```
"avatar": "av-cisco2",
```

Si quiero agregar un nuevo miembro, debo al final del archivo, ANTES del corchete que cierra el archivo y despues de la última llave, agregar una coma y agregar la informacion correspondiente. Quedaría asi, incluyendo la última línea del miembro anterior y el corchete que indica el final de la lista en el archivo:

```
}, <--- Esta es la coma que debo agregar
{
  "nombre": "NOMBRE APELLIDO",
  "avatar": "NOMBRE-IMAGEN-AVATAR-SIN-EXTENSION",
  "cargo": "CARGO",
  "links": [
              {
                "icon": "fa-facebook",
                "link": "LINK A FACEBOOK"
              },
              {
                "icon": "fa-linkedin",
                "link": "LINK A LINKEDIN"
              } <-- agregando una coma acá y copiando como esta entre llaves arriba puedo agregar links a otra red social/página web
          ]
}
]
```

Para la parte de links a red sociales/páginas web esta indicado donde se puede agregar una estructura como la que se mostrará a continuación para un nuevo link a la misma. Si se borra alguna de las existentes, se borra ese botón y su correspondiente link de la tarjeta del miembro. Para saber con que completar el campo "icon" puedo buscar el ícono a mostrar para ese botón en la siguiente página: http://fontawesome.io/icons/ . La estructura para un link/botón es:

```
{
  "icon": "NOMBRE DE ICONO SACADO DE LA WEB",
  "link": "LINK CORRESPONDIENTE"
}
```

#### Formulario de contacto

* Para que el formulario de contacto funcione correctamente es necesario configurar el campo 'url:' en el archivo 'main.js' que se encuentra en la carpeta 'js' y ademas hay que dar permiso para el CORS en el archivo php 'blog_mailer.php' que se va a encontrar en la carpeta 'mailing' de la web de semperti.
