import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { clientes, habitaciones, reservas } from "@/db/schema"; 
import { eq, gte, and, sql, or } from "drizzle-orm";
  
  const verificarDisponibilidad = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const { capacidad, fecha_entrada, fecha_salida, nombre } = req.body;
            
      if (!capacidad || !fecha_entrada || !fecha_salida || !nombre) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
      }
  
      try {
        //OBTENCION DE TODAS LAS HABTIACIONES QUE CUMPLEN NOMBRE Y CAPACIDAD
        const habitacionesDisponibles = await db
            .select()
            .from(habitaciones)
            .where(
                and(
                    eq(habitaciones.nombre, nombre),
                    gte(habitaciones.capacidad, capacidad),
                    eq(habitaciones.disponibilidad, 1)
                )
            )
            .execute();

        if (habitacionesDisponibles.length === 0) {
          return res.status(200).json({ disponible: false, mensaje: "No hay habitaciones disponibles que cumplan con los criterios", habitaciones: [] });
        }

        //VERIFICACION HABITACIONES DISPONIBLES(SIN ACOPLAMIENTOS DE FECHA)
        const habitacionesSinConflictos = [];

        for (const habitacion of habitacionesDisponibles) {
          const reservasConflicto = await db
                .select({ exists: sql`1` })
                .from(reservas)
                .where(
                    and(
                        eq(reservas.habitacion_id, habitacion.id),
                        or(
                            and(
                                gte(fecha_entrada, reservas.fecha_entrada),
                                sql`${fecha_entrada} < ${reservas.fecha_salida}`
                            ),
                            and(
                                sql`${fecha_salida} > ${reservas.fecha_entrada}`,
                                sql`${fecha_salida} <= ${reservas.fecha_salida}`
                            ),
                            and(
                                gte(reservas.fecha_entrada, fecha_entrada),
                                sql`${reservas.fecha_salida} <= ${fecha_salida}`
                            )
                        )
                    )
                )
                .execute();

          if (reservasConflicto.length === 0) {
            habitacionesSinConflictos.push(habitacion);
          }
        }

        if (habitacionesSinConflictos.length > 0) {
          return res.status(200).json({
            disponible: true,
            mensaje: "Habitaciones disponibles encontradas",
            habitacion: habitacionesSinConflictos[0],
          });
        } else {
          return res.status(200).json({
            disponible: false,
            mensaje: "No hay habitaciones disponibles para las fechas seleccionadas",
            habitaciones: []
          });
        }

      } catch (error) {
        console.error("Error al verificar disponibilidad:", error);
        res.status(500).json({ 
          error: "Error del servidor al verificar disponibilidad.(etoy en lapi verificardispo)"
        });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
  };

export default verificarDisponibilidad;