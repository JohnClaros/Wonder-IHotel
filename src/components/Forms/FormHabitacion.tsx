"use client";
import React, { useState } from "react";
import styles from "@/styles/FormHabitacion.module.css";
import { useRouter } from 'next/navigation';


const FormHabitacion = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    capacidad: 1,
    fecha_entrada: "",
    fecha_salida: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDate = () => {
    const { fecha_entrada, fecha_salida } = formData;
    if (!fecha_entrada || !fecha_salida) {
      alert("Por favor, ingrese ambas fechas");
      return false;
    }
    if (new Date(fecha_entrada) >= new Date(fecha_salida)) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!validateDate()) return;

    try {
      const response = await fetch("/api/verificarDisponibilidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.disponible && result.habitacion) {
          const habitacion_id = result.habitacion.id;
          router.push(
            `/reservas?habitacion_id=${habitacion_id}&nombre=${formData.nombre}&capacidad=${formData.capacidad}&fecha_entrada=${formData.fecha_entrada}&fecha_salida=${formData.fecha_salida}`
          );
        } else {
          alert("No hay habitaciones disponibles para las fechas seleccionadas.");
        }
      } else {
        alert(result.error || "Hubo un problema al verificar la disponibilidad.");
      }
    } catch (error) {
      console.error("Error al verificar disponibilidad xD:", error);
      alert("Hubo un problema al procesar tu solicitud.");
    }
  };

    return (
      <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.div}>
                <div className={styles.campo}>
                    <label htmlFor="capacidad">HUÉSPEDES</label>
                    <input
                      type="number"
                      name="capacidad"
                      value={formData.capacidad}
                      onChange={handleChange}
                      min="1"
                      max="4"
                      required
                    />
                </div>
                <div className={styles.campo}>
                    <label htmlFor="fecha_entrada">FECHA DE ENTRADA</label>
                    <input
                      type="date"
                      name="fecha_entrada"
                      value={formData.fecha_entrada}
                      onChange={handleChange}
                      required
                      className="date-input"
                    />
                </div>
                <div className={styles.campo}>
                    <label htmlFor="fecha_salida">FECHA DE SALIDA</label>
                    <input
                      type="date"
                      name="fecha_salida"
                      value={formData.fecha_salida}
                      onChange={handleChange}
                      required
                      className="date-input"
                    />
                </div>
                <div className={styles.campo}>
                    <label htmlFor="nombre">HABITACIÓN</label>
                    <select
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Doble Normal">Doble Normal (70€/noche)</option>
                      <option value="Triple Normal">Triple Normal (75€/noche)</option>
                      <option value="Familiar Normal">Familiar Normal (80€/noche)</option>
                      <option value="Doble Deluxe">Doble Deluxe (90€/noche)</option>
                      <option value="Triple Deluxe">Triple Deluxe (95€/noche)</option>
                      <option value="Familiar Deluxe">Familiar Deluxe (100€/noche)</option>
                      <option value="Doble Suite">Doble Suite (120€/noche)</option>
                      <option value="Triple Suite">Triple Suite (130€/noche)</option>
                    </select>
                </div>
                <button className={styles.button} type="submit">BUSCAR</button>
            </div>
          </form>
      </div>
    )
}

export default FormHabitacion;