import { QueueServiceClient } from "@azure/storage-queue";

// Cargar .env
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const queueName = process.env.QUEUE_NAME || "solicitudes";

if (!connectionString) {
    console.warn("AZURE_STORAGE_CONNECTION_STRING no está definida. El servicio de colas estará deshabilitado.");
}

const queueServiceClient = connectionString 
    ? QueueServiceClient.fromConnectionString(connectionString) 
    : null;

export const getQueueClient = () => {
    if (!queueServiceClient) {
        return {
            sendMessage: (message) => {
                console.log("Cola deshabilitada (fake send):", message);
                return Promise.resolve();
            }
        };
    }
    return queueServiceClient.getQueueClient(queueName);
};

export const initializeQueue = async () => {
    if (queueServiceClient) {
        try {
            const queueClient = getQueueClient();
            await queueClient.createIfNotExists();
            console.log(`Cola "${queueName}" conectada y asegurada.`);
        } catch (error) {
            console.error("Error al inicializar la cola de Azure:", error);
        }
    }
};