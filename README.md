# Lácteos Hacienda San Mateo · Web

Sitio estático (HTML + CSS + JS, sin dependencias) que renueva [lacteoshaciendasanmateo.com](https://www.lacteoshaciendasanmateo.com/).

## Estructura

```
index.html        Página única: inicio, nosotros, productos, galería, contacto
css/styles.css    Estilos (colores y tipografías en :root)
js/data.js        CONTENIDO EDITABLE: contacto, categorías y productos, galería, enlaces legales
js/main.js        Lógica: filtros, modal de producto, lightbox, formulario, animaciones
assets/img/       Fotos optimizadas (sesión 202503 FOTOGRAFÍA + imágenes de la web actual)
```

## Editar contenido

Todo el catálogo vive en `js/data.js`. Para añadir un producto, agrega un texto al array `items` de su categoría; para una categoría nueva, copia un bloque y pon su foto en `assets/img/`. Los contadores de la portada se calculan solos.

## Formulario de contacto

Por defecto abre el correo del visitante con el mensaje ya redactado. Para recibirlo sin salir de la web, pon en `FORM_ENDPOINT` (en `js/main.js`) la URL de un flujo de Power Automate con disparador *"Cuando se recibe una solicitud HTTP"* (o Formspree, etc.).

## Ver en local

```
python -m http.server 8000
```
y abre http://localhost:8000

## Publicar

GitHub Pages: *Settings → Pages → Deploy from branch → main / root*.
