"use client";
import React, { useState, Suspense } from "react"
import Layout from "@/components/Layout/Layout"
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/ReservasPage.module.css";

const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExDNI = /^\d{8}[A-Za-z]$/;
const regExTelefono = /^(?:6\d{8}|7\d{8})$/;

const ReservasPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const habitacion_id = searchParams?.get("habitacion_id");
    const fecha_entrada = searchParams?.get("fecha_entrada");
    const fecha_salida = searchParams?.get("fecha_salida");

    const preciosHabitaciones: { [key: string]: number} = {
        "101": 70, "102": 70, "103": 70, "104": 70, "105": 70,
        "106": 75, "107": 75, "108": 75, "109": 75, "110": 75,
        "111": 80, "112": 80, "113": 80, "114": 80, "115": 80,

        "201": 90, "202": 90, "203": 90, "204": 90, "205": 90,
        "206": 95, "207": 95, "208": 95, "209": 95, "210": 95,
        "211": 100, "212": 100, "213": 100, "214": 100, "215": 100,

        "301": 120, "302": 120, "303": 120, "304": 120, "305": 120,
        "306": 130, "307": 130, "308": 130, "309": 130, "310": 130,
    }

    const precioHabitacion = preciosHabitaciones[habitacion_id || ""] || 0;

    const isEditing = searchParams?.get("editar") === "true";

    const [ clientData, setClientData ] = useState({
        dni: searchParams?.get("dni") || "",
        nombre: searchParams?.get("nombre") || "",
        email: searchParams?.get("email") || "",
        telefono: searchParams?.get("telefono") || "",
        direccion: searchParams?.get("direccion") || "",
    });

    const [ errors, setErrors ] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let formErrors: any = {};

        if (!regExDNI.test(clientData.dni)) {
            formErrors.dni = "DNI inválido";
        }

        if (!regExEmail.test(clientData.email)) {
            formErrors.email = "Email inválido";
        }

        if (!regExTelefono.test(clientData.telefono)) {
            formErrors.telefono = "Teléfono inválido. Debe empezar por 6";
            if(clientData.telefono.length>9){
                formErrors.telefono = "El telefono debe ser 9 digitos"
            }
        }

        if (!clientData.direccion.trim()) {
            formErrors.direccion = "Dirección requerida";
        }

        return formErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors = validateForm();

        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if(isEditing) {
            try {
                await fetch("/api/borrarReserva", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({ habitacion_id, fecha_entrada, fecha_salida}),
                });
            } catch (error) {
                console.error("Error al borrar la reserva original:", error);
                alert("No se pudo actualizar la reserva.");
                return;
            }
        }
        
        try {
            const response = await fetch("/api/crearReserva", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {...clientData, habitacion_id, fecha_entrada, fecha_salida, precio: precioHabitacion }),
            });

            const result = await response.json();

            if (response.ok) {
                router.push(`/detalleReserva?habitacion_id=${habitacion_id}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}&precio=${precioHabitacion}`);
            } else {
                alert(result.error || "Error al realizar la reserva.");
            }
        } catch (error) {
            console.error("Error al realizar la reserva:", error);
            alert("Ocurrió un problema al procesar la solicitud.");
        }
    };

    return (
        <div>
            <Layout>
                <h1 className={styles.h1}>Completa tu reserva</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>DNI:</label>
                    <input className={styles.input} type="text" name="dni" value={clientData.dni} onChange={handleChange} placeholder="Ingrese su DNI" required/>
                    {errors.dni && <p className={styles.error}>{errors.dni}</p>}

                    <label className={styles.label}>Nombre y Apellidos:</label>
                    <input className={styles.input} type="text" name="nombre" value={clientData.nombre} onChange={handleChange} placeholder="Ingrese su nombre y apellidos" required/>

                    <label className={styles.label}>Email:</label>
                    <input className={styles.input} type="email" name="email" value={clientData.email} onChange={handleChange} placeholder="Ingrese un correo" required/>
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <label className={styles.label}>Teléfono:</label>
                    <input className={styles.input} type="text" name="telefono" value={clientData.telefono} onChange={handleChange} placeholder="Ingrese un telefono" required/>
                    {errors.telefono && <p className={styles.error}>{errors.telefono}</p>}

                    <label className={styles.label}>Dirección:</label>
                    <input className={styles.input} type="text" name="direccion" value={clientData.direccion} onChange={handleChange} placeholder="Ingrese una dirección" required/>
                    {errors.direccion && <p className={styles.error}>{errors.direccion}</p>}

                    <button type="submit" className={styles.button}>
                        Siguiente
                    </button>
                </form>
            </Layout>
        </div>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReservasPage />
        </Suspense>
    )
}