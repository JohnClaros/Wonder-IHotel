import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await openDB();
        const habitaciones = await db.all('SELECT * FROM habitaciones GROUP BY nombre, capacidad ORDER BY id ASC');
        res.status(200).json(habitaciones);
    } catch (error) {
        console.error('Error fetching habitaciones:', error);
        res.status(500).json({message: 'Error interno del servidor'});
    }    
}
