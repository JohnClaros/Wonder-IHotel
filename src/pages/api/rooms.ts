import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from 'sqlite';

async function openDB() {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database,
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { personas, tipo } = req.query;
    try {
        const db = await openDB();

        if (req.method === 'GET') {
            const rooms = await db.all('SELECT * FROM habitaciones WHERE capacidad >= ? AND tipo = ? AND disponibilidad = 1',
                [personas, tipo]
            );
            res.status(200).json(rooms);
        } else {
            res.status(405).json({ message: 'Método no permitido' });
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Error al obtener habitaciones'});
    }
};
