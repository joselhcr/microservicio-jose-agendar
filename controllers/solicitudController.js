// controllers/solicitudController.js
import Solicitud from "../models/Solicitud.js";
import { getQueueClient } from "../config/azureQueue.js"; // Importamos el cliente de la cola

// Lógica del GET (cortada de index.js)
export const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ message: "Error al obtener las solicitudes" });
  }
};

// Lógica del POST (modificada con el Doble Camino)
export const crearSolicitud = async (req, res) => {
  try {
    // --- CAMINO 1: Guardar en MongoDB Atlas (Síncrono) ---
    const nuevaSolicitud = new Solicitud(req.body);
    const solicitudGuardada = await nuevaSolicitud.save();
    console.log("Solicitud guardada en MongoDB:", solicitudGuardada.id);

    // --- CAMINO 2: Enviar a la Cola de Azure (Asíncrono) ---
    try {
      const queueClient = getQueueClient();
      // Convertimos a Base64 para envío seguro en la cola
      const mensajeParaCola = Buffer.from(
        JSON.stringify(solicitudGuardada)
      ).toString("base64");

      await queueClient.sendMessage(mensajeParaCola);
      console.log("Solicitud encolada en Azure:", solicitudGuardada.id);
    } catch (queueError) {
      // Si la cola falla, solo lo registramos, no rompemos la petición
      console.error(
        `Error CRÍTICO al encolar ${solicitudGuardada.id}:`,
        queueError
      );
    }

    // Respuesta al Frontend (Vue)
    res.status(201).json(solicitudGuardada);
  } catch (dbError) {
    // Si la BD falla, reportamos el error
    console.error("Error al guardar solicitud en MongoDB:", dbError);
    res.status(400).json({
      message: "Error al guardar la solicitud",
      error: dbError.message,
    });
  }
};
