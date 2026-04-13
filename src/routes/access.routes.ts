import { Router, Request, Response } from 'express';
import { getUserByDocument } from '../models/user.model';
import { registerAccess } from '../models/access.model';

const router = Router();

router.post('/entrada', async (req: Request, res: Response) => {
    const { documento } = req.body;

    const user = await getUserByDocument(documento);

    if (!user) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    await registerAccess(user.id, 'entrada');

    res.json({ message: 'Acceso permitido' });
    });

    router.post('/salida', async (req: Request, res: Response) => {
    const { documento } = req.body;

    const user = await getUserByDocument(documento);

    if (!user) {
        return res.status(403).json({ message: 'Usuario no encontrado' });
    }

    await registerAccess(user.id, 'salida');

    res.json({ message: 'Salida registrada' });
});

export default router;