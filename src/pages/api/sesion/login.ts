import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { admins } from "@/db/schema";
import { eq, and } from "drizzle-orm";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { usuario, contrasenna } = req.body;
        if (!usuario || !contrasenna) {
            return res.status(400).json({ message: "Campos requeridos" });
        }
        try {
            const user = await db
            .select()
            .from(admins)
            .where(
                and(eq(admins.usuario, usuario), eq(admins.contrasenna, contrasenna))
            )
            .limit(1)
            .execute();
            if (user && user.length > 0) {
                res.status(200).json({ success: true, message: "Bienvenido", user });
            } else {
                res.status(401).json({ error: "Credenciales incorrectas" });
            }
        } catch (error) {
            console.error("Error al verificar las credenciales:", error);
            res.status(500).json({ error: "Error del servidor al verificar las credenciales" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}