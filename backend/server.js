const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3005;

// Habilitar CORS para permitir peticiones desde React (Vite corre en el 5173)
app.use(cors());
app.use(express.json());

// Punto 4: Endpoint /api/health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "El API está funcionando correctamente.",
  });
});

// Punto 5: Endpoint /api/info
app.get("/api/info", (req, res) => {
  res.json({
    status: "ok",
    message: "API operativa con información del equipo.",
    integrantes: [
      {
        nombre: "William Hernandez",
        edad: 20,
        carrera: "Ingeniería Informática",
        materiasAprobadas: 15,
      },
      {
        nombre: "Kenneth Ramos",
        edad: 19,
        carrera: "Ingeniería Informática",
        materiasAprobadas: 67,
      },
      // Puedes agregar más compañeros si trabajas en pareja o grupo:
      // {
      //   nombre: 'Compañero 2',
      //   edad: 21,
      //   carrera: 'Ingeniería Informática',
      //   materiasAprobadas: 14,
      // }
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
