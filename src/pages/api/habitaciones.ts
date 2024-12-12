import { db } from "@/db";
import { habitaciones } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const habitacionesSinDuplicados = await db
            .select()
            .from(habitaciones)
            .orderBy(asc(habitaciones.id), asc(habitaciones.nombre), asc(habitaciones.capacidad))
            .execute();

        const uniqueHabitaciones = Array.from(
            new Map(
                habitacionesSinDuplicados.map((habitacion) => [
                    `${habitacion.nombre}-${habitacion.capacidad}`,
                    habitacion,
                ])
            ).values()
        );

        res.status(200).json(uniqueHabitaciones);
    } catch (error) {
        console.error('Error fetching habitaciones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
