import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { resennas } from "@/db/schema"; 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const resennasData = await db.select().from(resennas).execute();
            res.status(200).json(resennasData)
        } else {
            res.status(405).json({ message: 'Método no permitido' })
        }
    } catch (error) {
        console.error('Error fetching reseñas:', error);
        res.status(500).json({ message: 'Error al obtener las reseñas'});
    }    
};
