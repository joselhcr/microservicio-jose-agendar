import mongoose from "mongoose";

// --- Conexión a MongoDB Atlas ---
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado exitosamente a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); 
  }
};
