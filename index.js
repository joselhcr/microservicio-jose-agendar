// index.js
import "dotenv/config"; // Carga .env primero
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { initializeQueue } from "./config/azureQueue.js";

// 2. Importar el cargador de rutas principal
import apiRoutes from "./routes/api/index.js";

// --- Conexiones ---
connectDB(); // Conecta a MongoDB
initializeQueue(); // Prepara la cola de Azure

const PORT = process.env.PORT || 3001;
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
// --- Rutas ---
app.use("/api", apiRoutes);

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
