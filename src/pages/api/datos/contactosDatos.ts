import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
  return open({
    filename: './src/db/hotel.db',
    driver: sqlite3.Database,
  });
};

const getContactos = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const db = await openDb();
      const contactos = await db.all("SELECT * FROM contactos");
      res.status(200).json({ contactos });
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