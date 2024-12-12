import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { resennas } from "@/db/schema"; 

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
            const fechaRegistro = new Date().toISOString().split("T")[0];
            await db.insert(resennas).values({
                nombre: nombre,
                mensaje: mensaje,
                rating: rating,
                fecha_creacion: fechaRegistro,
            });
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