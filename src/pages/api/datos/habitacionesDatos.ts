import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { habitaciones } from "@/db/schema"; 


const getHabitaciones = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
        const habitacionesData  = await db.select().from(habitaciones).execute();

        res.status(200).json({ habitacionesData });
        } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        res.status(500).json({ error: "Error del servidor al obtener habitaciones." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
};

export default getHabitaciones;