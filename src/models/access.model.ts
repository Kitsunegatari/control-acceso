import pool from '../config/db';

export const registerAccess = async (userId: number, tipo: 'entrada' | 'salida') => {
    const [result] = await pool.query(
        'INSERT INTO access_logs (user_id, tipo) VALUES (?, ?)',
        [userId, tipo]
    );
    return result;
};