import express from 'express';
import './database/mongoBD.js';
import authRoutes from './routes/autenticacion_route.js'; // Importar las rutas de autenticación
import entradasRoutes from './routes/entradas_routes.js'; // Importar las rutas de entradas
const app = express();

app.use(express.static('public')); 
app.use(express.json());

app.use('/Api/v1/auth', authRoutes );

app.use('/Api/v1/entradas', entradasRoutes);


app.get('/', (req, res) => {
        // Use the req parameter if needed
        // For example, you can access query parameters using req.query
        res.send('Hellanda, ¡Estoy conectado a la base de datos!. 😺😺😺');
});

app.listen(2023, function () {
        console.log("🔥🔥🔥 Servidor corriendo en: http://localhost:2023");
});