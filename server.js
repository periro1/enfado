const express = require("express");
const http = require("http");
const path = require("path");
const crypto = require("crypto");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

// Set PANEL_PASSWORD in Render's Environment settings.
// Do not leave the example password for a public deployment.
const PANEL_PASSWORD = process.env.PANEL_PASSWORD || "cambia-esta-clave";
let active = false;

app.use(express.static(path.join(__dirname, "public")));

app.get("/PANEL", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "panel.html"));
});

io.on("connection", (socket) => {
  socket.emit("estado", active);

  socket.on("control", (data) => {
    if (!data || typeof data.password !== "string") return;
    const supplied = Buffer.from(data.password);
    const expected = Buffer.from(PANEL_PASSWORD);
    if (supplied.length !== expected.length ||
        !crypto.timingSafeEqual(supplied, expected)) {
      socket.emit("control-error", "Contraseña incorrecta.");
      return;
    }

    if (data.action === "activar") {
      active = true;
      io.emit("activar");
    } else if (data.action === "detener") {
      active = false;
      io.emit("detener");
    } else if (data.action === "panico") {
      active = false;
      io.emit("panico");
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
