import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import accessRoutes from './routes/access.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/access', accessRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});