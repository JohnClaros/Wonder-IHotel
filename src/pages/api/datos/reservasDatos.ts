import { NextApiRequest, NextApiResponse } from "next";


import { db } from "@/db";
import { reservas } from "@/db/schema"; 


const getReservas = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const reservasData = await db.select().from(reservas).execute();
      res.status(200).json({ reservasData });
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      res.status(500).json({ error: "Error del servidor al obtener reservas." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
};

export default getReservas;