import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
    return open({
        filename: "./src/db/hotel.db",
        driver: sqlite3.Database,
    });
};

const obtenerDetalleReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      const { habitacion_id, fecha_entrada, fecha_salida } = req.query;
  
      if (!habitacion_id || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: "Faltan parámetros obligatorios." });
      }
  
      try {
        const db = await openDb();
  
        const reserva = await db.get(
          `SELECT 
            r.id,
            c.nombre AS cliente_nombre,
            c.email AS cliente_email,
            c.telefono AS cliente_telefono,
            c.dni AS cliente_dni,
            c.direccion AS cliente_direccion,
            h.nombre AS habitacion_nombre,
            r.fecha_entrada,
            r.fecha_salida,
            r.estado
           FROM reservas r
           JOIN clientes c ON r.cliente_dni = c.dni
           JOIN habitaciones h ON r.habitacion_id = h.id
           WHERE r.habitacion_id = ?
           AND r.fecha_entrada = ?
           AND r.fecha_salida = ?`,
          [habitacion_id, fecha_entrada, fecha_salida]
        );
  
        if (!reserva) {
          return res.status(404).json({ error: "No se encontraron detalles para la reserva." });
        }
  
        res.status(200).json(reserva);
      } catch (error) {
        console.error("Error al obtener el detalle de la reserva:", error);
        res.status(500).json({ error: "Error del servidor al obtener el detalle de la reserva." });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
};
  
export default obtenerDetalleReserva;