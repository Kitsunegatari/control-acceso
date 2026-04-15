import { Request, Response } from "express";
import AccessModel from "../models/AccessModel";

export default class AccessController {

    private model: AccessModel;

    constructor() {
        this.model = new AccessModel();
    }

    async login(req: Request, res: Response) {
        try {
            const { cc } = req.body;

            if (!cc) {
                return res.status(400).json({ message: "CC requerida" });
            }

            const vigilante = await this.model.findVigilanteByCC(cc);

            if (!vigilante) {
                return res.status(404).json({ message: "Vigilante no encontrado" });
            }

            return res.status(200).json(vigilante);

        } catch (error) {
            return res.status(500).json({ message: "Error en login", error });
        }
    }

    async registrar(req: Request, res: Response) {
        try {
            const {
                nombre,
                cc,
                destino,
                puerta,
                tipo,
                vigilante_id
            } = req.body;

            if (!nombre || !cc || !puerta || !tipo || !vigilante_id) {
                return res.status(400).json({ message: "Datos incompletos" });
            }

            if (!["INGRESO", "SALIDA"].includes(tipo)) {
                return res.status(400).json({ message: "Tipo inválido" });
            }

            const registro = await this.model.createRegistro({
                nombre,
                cc,
                destino,
                puerta,
                tipo,
                vigilante_id
            });

            return res.status(201).json(registro);

        } catch (error) {
            return res.status(500).json({ message: "Error al registrar", error });
        }
    }

    async historial(req: Request, res: Response) {
        try {
            const registros = await this.model.getHistorial();

            return res.status(200).json(registros);

        } catch (error) {
            return res.status(500).json({ message: "Error al obtener historial", error });
        }
    }
}