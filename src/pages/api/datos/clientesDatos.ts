import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { clientes } from "@/db/schema"; 


const getClientes = async (req: NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const clientesData = await db.select().from(clientes).execute();
            res.status(200).json({ clientesData });
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            res.status(500).json({error: 'Error del servidor al obtener clientes'});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({message: 'Método no permitido'});
    }
}

export default getClientes;