import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from 'sqlite';

const openDB = async () => {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database
    });
}

const getClientes = async (req: NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const db = await openDB();
            const clientes = await db.all("SELECT * FROM clientes");
            res.status(200).json({ clientes });
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            res.status(500).json({error: 'Error del servidor al obtener clientes'});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({message: 'Método no permitido'});
    }
}

export default getClientes;