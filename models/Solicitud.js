import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const solicitudSchema = new Schema({
    // --- Campos del formulario ---
    cliente: String,
    correo: String,
    telefono: String,
    mensaje: String,
    fecha: String, 
    ubicacion: String,
    paquete: String,
    artista: String,
    
    estado: {
        type: String,
        default: 'pendiente'
    }
    
}, {
    timestamps: false,
    
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id; 
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

const Solicitud = model('Solicitud', solicitudSchema);
export default Solicitud;