import { Router, Request, Response } from 'express';
import { createUser } from '../models/user.model';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { nombre, documento, tipo } = req.body;

        if (!nombre || !documento) {
        return res.status(400).json({ message: 'Campos obligatorios incompletos' });
        }

        await createUser({ nombre, documento, tipo });

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;