import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const openDB = async () => {
    return open({
        filename: './src/db/hotel.db',
        driver: sqlite3.Database,
    });
};

const crearReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {
            dni,
            nombre,
            email,
            telefono,
            direccion,
            habitacion_id,
            fecha_entrada = new Date().toLocaleDateString(),
            fecha_salida = new Date().toLocaleDateString()
        } = req.body;

        if (!dni || !nombre || !email || !telefono || !direccion || !habitacion_id || !fecha_entrada || !fecha_salida) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        try {
            const db = await openDB();

            /*registar cliente si no existe*/
            await db.run(
                `INSERT OR IGNORE INTO clientes (dni, nombre, email, telefono, direccion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)`,
                [dni, nombre, email, telefono, direccion, new Date().toLocaleDateString()]
            );

            /*crear reserva*/
            await db.run(
                `INSERT INTO reservas (cliente_dni, habitacion_id, fecha_entrada, fecha_salida, estado) VALUES (?, ?, ?, ?, ?)`,
                [dni, habitacion_id, fecha_entrada, fecha_salida, "pendiente"]
            );

            await db.run(
                `UPDATE habitaciones SET disponibilidad = 1 WHERE id = ?`, [habitacion_id]
            );

            res.status(200).json({ message: "Reserva creada con éxito" });
        } catch (error) {
            console.error("Error al procesar la reserva: ", error);
            res.status(500).json({ error: "Error del servidor al crear la reserva. etoy en creareserva" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: "Método no permitido" });
    }
};

export default crearReserva;