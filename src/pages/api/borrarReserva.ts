import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { reservas } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export default async function borrarReserva(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { habitacion_id, fecha_entrada, fecha_salida } = req.body;

        if (!habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        try {
            await db
                .delete(reservas)
                .where(
                    and(
                        eq(reservas.habitacion_id, habitacion_id),
                        eq(reservas.fecha_entrada, fecha_entrada),
                        eq(reservas.fecha_salida, fecha_salida)
                    )
                )
                .returning()
                .execute();
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