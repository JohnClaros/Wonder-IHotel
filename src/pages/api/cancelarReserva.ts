import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
    return open({
        filename: "./src/db/hotel.db",
        driver: sqlite3.Database,
    });
};

const cancelarReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        const { habitacion_id, fecha_entrada, fecha_salida } = req.query;

        if (!habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        try {
            const db = await openDb();

            const result = await db.run(
                `DELETE FROM reservas WHERE habitacion_id = ? AND fecha_entrada = ? AND fecha_salida = ?`,
                [habitacion_id, fecha_entrada, fecha_salida]
            );

            if (result.changes === 0) {
                return res.status(404).json({ error: "No se encontró la reserva a cancelar." });
            }

            res.status(200).json({ message: "Reserva cancelada con éxito." });
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            res.status(500).json({ error: "Error del servidor al cancelar la reserva." });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
};

export default cancelarReserva;