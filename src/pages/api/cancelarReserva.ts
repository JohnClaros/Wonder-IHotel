import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { reservas } from "@/db/schema"; 
import { and, eq } from "drizzle-orm";


const cancelarReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        const { habitacion_id, fecha_entrada, fecha_salida } = req.query;

        if (!habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan parámetros obligatorios." });
        }

        try {

            const habitacionIdInt = parseInt(habitacion_id.toString());
            const fechaEntradaDate = new Date(fecha_entrada.toString()).toISOString().split("T")[0]; // YYYY-MM-DD
            const fechaSalidaDate = new Date(fecha_salida.toString()).toISOString().split("T")[0]; // YYYY-MM-DD

            const result = await db
                .delete(reservas)
                .where(
                    and(
                        eq(reservas.habitacion_id, habitacionIdInt),
                        eq(reservas.fecha_entrada, fechaEntradaDate),
                        eq(reservas.fecha_salida, fechaSalidaDate)
                    )
                )
                .returning()
                .execute();

            if (result.length === 0) {
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