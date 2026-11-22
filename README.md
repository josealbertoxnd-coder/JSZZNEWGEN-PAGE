# JSZZNEWGEN

Sitio estático del gimnasio JSZZNEWGEN, hecho con HTML, CSS y JavaScript.

## Estructura

- Las páginas HTML (`index.html`, `clases.html`, `carrito.html`, etc.) van en la raíz.
- `style.css` contiene los estilos compartidos.
- Los scripts JavaScript (`cart-store.js`, `catalogo.js`, etc.) van en la raíz.
- `img/` contiene todas las imágenes y el logo. No separar ni renombrar esta carpeta: las páginas la usan con rutas relativas como `img/gym-1.png`.

## Publicar con GitHub Pages

1. Sube todos los archivos y carpetas de este proyecto al repositorio, incluida la carpeta `img/` con sus archivos.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama principal y la carpeta **/(root)**; guarda los cambios.
5. Espera a que termine el despliegue y abre la URL que muestra GitHub Pages.

Las rutas de páginas, imágenes, estilos y scripts son relativas, por lo que funcionan tanto en el sitio local como en un repositorio publicado bajo `https://usuario.github.io/nombre-del-repositorio/`.

## Comprobar imágenes

Los nombres distinguen mayúsculas y minúsculas al publicarse. Mantén exactamente los nombres actuales, por ejemplo `img/gym-1.png` y `img/jszznewgen-logo.svg`.
