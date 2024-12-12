import { NextApiRequest, NextApiResponse } from "next";
import { clientes, habitaciones, reservas } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";

const obtenerDetalleReserva = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { habitacion_id, fecha_entrada, fecha_salida } = req.query;

    if (!habitacion_id || !fecha_entrada || !fecha_salida) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios." });
    }

    try {
      const reserva = await db
        .select({
          id: reservas.id,
          cliente_nombre: clientes.nombre,
          cliente_email: clientes.email,
          cliente_telefono: clientes.telefono,
          cliente_dni: clientes.dni,
          cliente_direccion: clientes.direccion,
          habitacion_nombre: habitaciones.nombre,
          fecha_entrada: reservas.fecha_entrada,
          fecha_salida: reservas.fecha_salida,
          estado: reservas.estado,
        })
        .from(reservas)
        .innerJoin(clientes, eq(reservas.cliente_dni, clientes.dni))
        .innerJoin(habitaciones, eq(reservas.habitacion_id, habitaciones.id))
        .where(
          and(
            eq(reservas.habitacion_id, parseInt(habitacion_id.toString())),
            eq(reservas.fecha_entrada, new Date(fecha_entrada.toString()).toISOString().split("T")[0]),
            eq(reservas.fecha_salida, new Date(fecha_salida.toString()).toISOString().split("T")[0])
          )
        )
        .execute();

      if (!reserva) {
        return res.status(404).json({ error: "No se encontraron detalles para la reserva." });
      }

      res.status(200).json(reserva);
    } catch (error) {
      console.error("Error al obtener el detalle de la reserva:", error);
      res.status(500).json({ error: "Error del servidor al obtener el detalle de la reserva. Contacte con mantenimiento" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
};

export default obtenerDetalleReserva;