# Microservicio de Agendar (Express.js)

## Descripción del proyecto.

Este es un microservicio backend, construido en **Express.js**, diseñado para gestionar la recepción de solicitudes de agendamiento.

Su función principal es capturar los datos enviados desde un frontend, guardarlos de forma segura en una base de datos **MongoDB Atlas** y, simultáneamente, encolar la solicitud en **Azure Queue Storage** para un procesamiento asíncrono.

El microservicio está diseñado con un patrón de "Doble Camino" para ser altamente disponible y tolerante a fallos: prioriza el guardado en la base de datos para responder rápidamente al cliente y maneja el encolado como una tarea secundaria.

## Instrucciones de despliegue local.

**Clonar el repositorio y moverse a la raíz**
```bash
# Reemplaza la URL con la de tu repositorio
git clone 

cd microservicio-jose-agendar

npm install

npm run dev
```

```bash
MICROSERVICIO-JOSE-AGENDAR/
│
├── config/
│   ├── azureQueue.js   # Configura la conexión a Azure Queue Storage
│   └── db.js           # Configura la conexión a MongoDB Atlas
│
├── controllers/
│   └── solicitudController.js # Lógica de negocio (qué hacer con las peticiones)
│
├── models/
│   └── Solicitud.js    # Define el "molde" o Schema de Mongoose para los datos
│
├── node_modules/       # Dependencias del proyecto
│
├── routes/
│   └── api/
│       ├── index.js      # Enrutador principal de /api
│       └── solicitudes.js # Define las rutas para /api/solicitudes (GET, POST, etc.)
│
├── .env                # (Local) Archivo con las variables de entorno (claves secretas)
├── .gitignore          # Archivos ignorados por Git
├── index.js            # Punto de entrada principal del servidor Express
├── nodemon.json        # Configuración para nodemon
├── package-lock.json   # Registro de versiones exactas de las dependencias
└── package.json        # Define los scripts y dependencias del proyecto
```
