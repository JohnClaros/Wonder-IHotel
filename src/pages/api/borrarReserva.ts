import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
    return open({
        filename: "./src/db/hotel.db",
        driver: sqlite3.Database,
    });
};

export default async function borrarReserva(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { habitacion_id, fecha_entrada, fecha_salida } = req.body;

        if (!habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        try {
            const db = await openDb();
            await db.run(
                `DELETE FROM reservas WHERE habitacion_id = ? AND fecha_entrada = ? AND fecha_salida = ?`,
                [habitacion_id, fecha_entrada, fecha_salida]
            );
            res.status(200).json({ message: "Reserva eliminada con éxito." });
        } catch (error) {
            console.error("Error al borrar la reserva:", error);
            res.status(500).json({ error: "Error del servidor al borrar la reserva." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
}