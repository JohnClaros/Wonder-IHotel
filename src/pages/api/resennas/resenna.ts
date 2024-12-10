import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const openDb = async () => {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database,
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await openDb();
        if (req.method === 'GET') {
            const result = await db.all(`SELECT * FROM resennas ORDER BY id DESC`);
            res.status(200).json(result)
        } else {
            res.status(405).json({ message: 'Método no permitido' })
        }
    } catch (error) {
        console.error('Error fetching reseñas:', error);
        res.status(500).json({ message: 'Error al obtener las reseñas'});
    }    
};
