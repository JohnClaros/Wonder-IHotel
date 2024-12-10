import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const openDb = async () => {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database,
    });
};

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === "POST") {
        const { usuario, contrasenna } = req.body;
        if (!usuario || !contrasenna) {
            return res.status(400).json({ message: "Campos requeridos" });
        }

        try {
            const db = await openDb();
            const user = await db.get(
                "SELECT * FROM admins WHERE usuario = ? AND contrasenna = ?",
                [usuario, contrasenna]
            );

            if (user) {
                res.status(200).json({success: true, message: "Bienvenido", user});
            } else {
                res.status(401).json({error: "Credenciales incorrectas"});
            }
        } catch (error) {
            console.error("Error al verificar las credenciales:", error);
            res.status(500).json({ error: "Error del servidor al verificar las credenciales" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}