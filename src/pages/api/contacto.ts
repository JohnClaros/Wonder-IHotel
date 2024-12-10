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
    if (req.method === 'POST') {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ message: 'Todos los campos obligatorios.' });
        }

        try {
            const db = await openDb();
            const result = await db.run(
                `INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)`,
                [nombre, email, mensaje]
            );
            res.status(200).json({ message: "Mensaje enviado exitosamente."});
        } catch (error) {
            console.error("Error al guardar en la bbdd:", error);
            res.status(500).json({ error: "Hubo un problema al procesar tu solicitud."});
        }
    } else {
        res.status(405).json({ error: `Método ${req.method} no permitido.`});
    }
}