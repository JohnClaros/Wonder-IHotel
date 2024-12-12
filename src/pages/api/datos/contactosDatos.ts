import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db";
import { contactos } from "@/db/schema"; 

const getContactos = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const contactosData = await db.select().from(contactos).execute();
      res.status(200).json({ contactosData });
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      res.status(500).json({ error: "Error del servidor al obtener contactos." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
};

export default getContactos;