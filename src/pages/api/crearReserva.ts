import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { clientes, habitaciones, reservas } from "@/db/schema"; 
import { eq } from "drizzle-orm";

const crearReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {
            dni,
            nombre,
            email,
            telefono,
            direccion,
            habitacion_id,
            fecha_entrada = new Date().toLocaleDateString(),
            fecha_salida = new Date().toLocaleDateString()
        } = req.body;

        if (!dni || !nombre || !email || !telefono || !direccion || !habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        try {
            const fechaRegistro = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

            const clienteExiste = await db.select().from(clientes).where(eq(clientes.dni, dni))

            if ( !clienteExiste ) {
                await db
                .insert(clientes)
                .values({
                    dni,
                    nombre,
                    email,
                    telefono: telefono || null,
                    direccion: direccion || null,
                    fecha_registro: fechaRegistro,
                })
            }

            await db
                .insert(reservas)
                .values({
                    cliente_dni: dni,
                    habitacion_id: parseInt(habitacion_id, 10),
                    fecha_entrada: new Date(fecha_entrada).toISOString().split("T")[0], // YYYY-MM-DD
                    fecha_salida: new Date(fecha_salida).toISOString().split("T")[0], // YYYY-MM-DD
                    estado: "pendiente",
                })
                .returning()
                .execute();

            await db
                .update(habitaciones)
                .set({ disponibilidad: 1 })
                .where(eq(habitaciones.id, parseInt(habitacion_id, 10)))
                .execute();

            res.status(200).json({ message: "Reserva creada con éxito" });
        } catch (error) {
            console.error("Error al procesar la reserva: ", error);
            res.status(500).json({ error: "Error del servidor al crear la reserva. etoy en creareserva" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: "Método no permitido" });
    }
};

export default crearReserva;