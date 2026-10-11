# Discurso web

## Archivos
- `server.js`: servidor Node.js + Socket.IO.
- `public/index.html`: pantalla principal.
- `public/panel.html`: panel `/PANEL`.
- `public/discurso.mp3`: debes añadir aquí tu propio audio con este nombre.

## Probar en tu ordenador
Necesitas Node.js instalado. Desde esta carpeta ejecuta:

```bash
npm install
npm start
```

Abre `http://localhost:3000/` en la pantalla principal y pulsa **Preparar audio** una vez. En otra pestaña/dispositivo abre `http://localhost:3000/PANEL`.

La contraseña predeterminada local es `cambia-esta-clave`. Cámbiala antes de publicar.

## Publicar gratis en Render
1. Sube todos los archivos a un repositorio de GitHub. Añade `public/discurso.mp3`.
2. En Render, crea un **New Web Service** y conecta el repositorio.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Elige la instancia gratuita si está disponible.
6. En **Environment**, añade `PANEL_PASSWORD` con una contraseña larga y única. No uses la contraseña de ejemplo.
7. Despliega el servicio y abre la URL que te dé Render. El panel estará en `/PANEL`.

No subas contraseñas reales al repositorio. Render puede suspender los servicios gratuitos tras un periodo sin actividad.

## Importante
- La pantalla principal debe estar abierta y conectada al servidor para recibir las órdenes.
- El navegador puede exigir un clic en **Preparar audio** antes de permitir la reproducción automática.
- El botón de pánico usa `window.location.replace()` en la pestaña principal; sustituye la entrada actual del historial de esa pestaña, pero no borra todo el historial ni modifica el historial de otras pestañas.
