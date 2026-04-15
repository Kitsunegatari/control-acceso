import { pool } from "../config/database";

export default class AccessModel {

    async findVigilanteByCC(cc: number) {
        const [rows]: any = await pool.query(
            "SELECT * FROM vigilantes WHERE CC = ?",
            [cc]
        );
        return rows[0];
    }

    async createRegistro(data: any) {
        const {
            nombre,
            cc,
            destino,
            puerta,
            tipo,
            vigilante_id
        } = data;

        const [result]: any = await pool.query(
            `INSERT INTO visitantes 
            (nombre, CC, destino, puerta, tipo, vigilante_id) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, cc, destino, puerta, tipo, vigilante_id]
        );

        return { id: result.insertId, ...data };
    }

    async getHistorial() {
        const [rows]: any = await pool.query(
            `SELECT v.*, vi.nombre as vigilante_nombre
             FROM visitantes v
             JOIN vigilantes vi ON v.vigilante_id = vi.id
             ORDER BY fecha_hora DESC`
        );

        return rows;
    }
}