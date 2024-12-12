import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import {contactos } from "@/db/schema"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ message: 'Todos los campos obligatorios.' });
        }

        try {
            await db
                .insert(contactos)
                .values({
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje,
                })
                .returning()
                .execute();
            res.status(200).json({ message: "Mensaje enviado exitosamente."});
        } catch (error) {
            console.error("Error al guardar en la bbdd:", error);
            res.status(500).json({ error: "Hubo un problema al procesar tu solicitud."});
        }
    } else {
        res.status(405).json({ error: `Método ${req.method} no permitido.`});
    }
}