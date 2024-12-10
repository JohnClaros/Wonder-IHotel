import { NextApiRequest, NextApiResponse } from "next";
import  sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDb = async () => {
    return open({
      filename: './src/db/hotel.db',
      driver: sqlite3.Database,
    });
  };
  
  const verificarDisponibilidad = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const { capacidad, fecha_entrada, fecha_salida, nombre } = req.body;
            
      if (!capacidad || !fecha_entrada || !fecha_salida || !nombre) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
      }
  
      try {
        const db = await openDb();
        //OBTENCION DE TODAS LAS HABTIACIONES QUE CUMPLEN NOMBRE Y CAPACIDAD
        const habitacionesDisponibles = await db.all(
          `SELECT *
           FROM habitaciones 
           WHERE nombre = ? 
           AND capacidad >= ? 
           AND disponibilidad = 1`,
          [nombre, capacidad],
        );

        if (habitacionesDisponibles.length === 0) {
          return res.status(200).json({ disponible: false, mensaje: "No hay habitaciones disponibles que cumplan con los criterios", habitaciones: [] });
        }

        //VERIFICACION HABITACIONES DISPONIBLES(SIN ACOPLAMIENTOS DE FECHA)
        const habitacionesSinConflictos = [];

        for (const habitacion of habitacionesDisponibles) {
          const reservasConflicto = await db.all(
            `SELECT 1
             FROM reservas
             WHERE habitacion_id = ?
             AND (
              (fecha_entrada <= ? AND fecha_salida > ?) OR
              (fecha_entrada < ? AND fecha_salida >= ?) OR
              (fecha_entrada >= ? AND fecha_salida <= ?)
             )`,
            [habitacion.id, fecha_salida, fecha_entrada, fecha_salida, fecha_entrada, fecha_entrada, fecha_salida]
          );

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