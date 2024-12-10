import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDB = async () => {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database,
    });
};

const crearResenna = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {
            nombre,
            mensaje,
            rating,
        } = req.body;

        if (!nombre || !mensaje || !rating) {
            return res.status(400).json({ error: "Faltan campos" });
        }

        try {
            const db = await openDB();
            /* crear reseña */
            await db.run(
                `INSERT INTO resennas (nombre, mensaje, rating, fecha) VALUES (?, ?, ?, ?)`,
                [nombre, mensaje, rating, new Date().toLocaleDateString()]
            );
            res.status(200).json({ message: "Reseña creada con éxito"});
        } catch (error) {
            console.error("Error al procesar la reseña:", error);
            res.status(500).json({ error: "Error del servidor al crear ala reseña" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: "Método no permitido" });
    }   
}

export default crearResenna;