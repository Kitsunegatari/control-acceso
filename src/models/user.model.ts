import pool from '../config/db';
import { User } from '../types/user.types';

export const createUser = async (user: User) => {
    const [result] = await pool.query(
        'INSERT INTO users (nombre, documento, tipo) VALUES (?, ?, ?)',
        [user.nombre, user.documento, user.tipo]
    );
    return result;
};

export const getUserByDocument = async (documento: string) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM users WHERE documento = ?',
        [documento]
    );
    return rows[0];
};