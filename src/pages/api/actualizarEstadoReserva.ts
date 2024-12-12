import { db } from "@/db";
import { reservas } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { habitacion_id, fecha_entrada, fecha_salida, estado } = req.body;

        if (!habitacion_id || !fecha_entrada || !fecha_salida || !estado) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        const fechaEntrada = new Date(fecha_entrada).toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const fechaSalida = new Date(fecha_salida).toISOString().split('T')[0]; // Formato YYYY-MM-DD

        try {

            const result = await db.update(reservas).set({ estado: estado }).where(and(eq(reservas.habitacion_id, habitacion_id),
                eq(reservas.fecha_entrada, fechaEntrada),
                eq(reservas.fecha_salida, fechaSalida))).returning().execute()

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