# Traumatología a Domicilio — Web Personal
## Dr. Luciano Germán Lana

Sitio web estático listo para subir a cualquier hosting.
HTML5 + CSS3 + JavaScript puro. Sin frameworks. Sin dependencias npm.

---

## Estructura del proyecto

```
traumatologia-web/
├── index.html          <- Página principal
├── css/
│   └── style.css       <- Todos los estilos
├── js/
│   └── main.js         <- Interactividad
├── img/                <- Carpeta para imágenes
└── README.md           <- Este archivo
```

---

## Abrir en Visual Studio Code

1. VS Code → Archivo → Abrir carpeta → seleccionar `traumatologia-web`
2. Instalar extensión **Live Server** (Ritwick Dey) para previsualizar en vivo
3. Click en **Go Live** en la barra inferior

---

## Subir al hosting

### cPanel (hosting compartido)
1. Administrador de archivos → public_html
2. Subir index.html + carpetas css/ js/ img/

### Netlify (gratis)
1. netlify.com → arrastrar la carpeta al área de deploy
2. URL automática generada al instante

### GitHub Pages (gratis)
1. Crear repo en GitHub → subir archivos
2. Settings → Pages → Source: main branch

---

## Personalizaciones pendientes

### URL del sistema de turnos
Buscar en index.html:
  href="#" class="btn btn--white btn--xl"
Reemplazar # por la URL real del sistema de turnos.

### Foto del médico
- Guardar foto.jpg en la carpeta img/ (400x400px)
- En index.html reemplazar el div .doctor-card__avatar y .about__avatar
  por una etiqueta <img src="img/foto.jpg" ...>

### Google Maps
- En la sección Zona, reemplazar .zona__map-placeholder
  por el iframe embed de Google Maps

### Logo
- Guardar logo.png en img/ (fondo transparente)
- Reemplazar el SVG en .navbar__logo-icon por <img src="img/logo.png">

### WhatsApp
- Número actual: 543794990517
- Buscar y reemplazar si cambia

---

*Desarrollado para el Dr. Luciano Germán Lana · Corrientes 2025*
