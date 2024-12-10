import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
    return open({
        filename: "./src/db/hotel.db",
        driver: sqlite3.Database,
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { habitacion_id, fecha_entrada, fecha_salida, estado } = req.body;

        if (!habitacion_id || !fecha_entrada || !fecha_salida || !estado) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        const fechaEntrada = new Date(fecha_entrada).toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const fechaSalida = new Date(fecha_salida).toISOString().split('T')[0]; // Formato YYYY-MM-DD

        try {
            const db = await openDb();

            const query = `
                UPDATE reservas
                SET estado = ?
                WHERE habitacion_id = ? AND fecha_entrada = ? AND fecha_salida = ?;
            `;

            const result = await db.run(query, [estado, habitacion_id, fechaEntrada, fechaSalida]);

            if (result) {
                return res.status(200).json({ message: "Estado actualizado correctamente." });
            } else {
                return res.status(404).json({ error: "No se encontró la reserva para actualizar." });
            } 
        } catch (error) {
            console.error("Error al actualizar el estado de la reserva:", error);
            return res.status(500).json({ error: "Error al actualizar el estado de la reserva." });
        }

    } else {
        // Si el método no es POST, respondemos con un error 405
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
}