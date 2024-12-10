import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
  return open({
    filename: './src/db/hotel.db',
    driver: sqlite3.Database,
  });
};

const getReservas = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const db = await openDb();
      const reservas = await db.all("SELECT * FROM reservas");
      res.status(200).json({ reservas });
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