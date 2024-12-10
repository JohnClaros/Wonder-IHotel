"use client";
import React, { Suspense, useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/styles/DetalleReservaPage.module.css";
import { toast }from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface ReservaDetalle {
    id: number;
    cliente_nombre: string;
    cliente_email: string;
    cliente_telefono: string;
    cliente_dni: string;
    cliente_direccion: string;
    habitacion_nombre: string;
    fecha_entrada: string;
    fecha_salida: string;
    estado: string;
    precio_final: number;
}

const DetalleReservaPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [ success, setSuccess ] = useState<string | null>(null);

    const habitacion_id = searchParams?.get("habitacion_id");
    const fecha_entrada = searchParams?.get("fecha_entrada");
    const fecha_salida = searchParams?.get("fecha_salida");
    const precioFinal = parseFloat(searchParams?.get("precio") || "0" );

    const [reservaDetalle, setReservaDetalle] = useState<ReservaDetalle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const imagenesHabitaciones: { [key: string]: string } = {
        "Doble Normal": "/fotoHabitaciones/Doble Normal.webp",
        "Triple Normal": "/fotoHabitaciones/Triple Normal.webp",
        "Familiar Normal": "/fotoHabitaciones/Familiar Normal.webp",
        "Doble Deluxe": "/fotoHabitaciones/Doble Deluxe.webp",
        "Triple Deluxe": "/fotoHabitaciones/Triple Deluxe.webp",
        "Familiar Deluxe": "/fotoHabitaciones/Familiar Deluxe.webp",
        "Doble Suite": "/fotoHabitaciones/Doble Suite.webp",
        "Triple Suite": "/fotoHabitaciones/Triple Suite.webp",
    };

    useEffect(() => {
        const fetchDetalleReserva = async () => {
            try {
                const response = await fetch(
                    `/api/detalleReserva?habitacion_id=${habitacion_id}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}&precio=${precioFinal}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setReservaDetalle(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || "Error al cargar los detalles de la reserva.");
                }
            } catch (error) {
                console.error("Error al obtener los detalles de la reserva:", error);
                setError("Ocurrió un problema al obtener los detalles de la reserva.")
            } finally {
                setLoading(false);
            }
        };

        fetchDetalleReserva();
    }, [habitacion_id, fecha_entrada, fecha_salida, precioFinal]);

    const handlePagoClick = () => {
        router.push(`/datosBancarios?habitacion_id=${habitacion_id}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}`);
    }

    const handleEditarClick = () => {
        router.push(`/reservas?habitacion_id=${habitacion_id}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}&precio=${precioFinal}&editar=true`);
    }

    const handleCancelarReserva = async () => {
        try {
            const response = await fetch(
                `/api/cancelarReserva?habitacion_id=${habitacion_id}&fecha_entrada=${fecha_entrada}&fecha_salida=${fecha_salida}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setSuccess("Reserva cancelada con éxito.");
                setTimeout(() => {
                    setSuccess(null);
                    router.push("/");
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Error al cancelar la reserva.");
            }
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            toast.error("Ocurrió un problema al cancelar la reserva.");
        }
    }

    const calcularDuracionEstancia = (entrada: string, salida: string) => {
        const fechaEntrada = new Date(entrada);
        const fechaSalida = new Date(salida);
        const dias = fechaSalida.getTime() - fechaEntrada.getTime();
        return Math.ceil(dias / (1000 * 3600 * 24));
    }

    if (loading) {
        return <Layout>Cargando detalles de la reserva...</Layout>
    }

    if (error) {
        return(
            <Layout>
                <p className={styles.error}>{error}</p>
            </Layout>
        );
    }

    const imagenHabitacion = imagenesHabitaciones[reservaDetalle?.habitacion_nombre || "habitacion1"]
    const duracionEstancia = calcularDuracionEstancia(reservaDetalle?.fecha_entrada || "", reservaDetalle?.fecha_salida || "");
    const precioTotal = precioFinal * duracionEstancia;

    return (
        <Layout>
        <div className={styles.container}>
            <h1 className={styles.h1}>Detalles de tu reserva</h1>
            
            {success && (
                <div className={styles.toast}>
                    {success}
                </div>
            )}

            {reservaDetalle ? (
                <div className={styles.cardContainer}>
                    <div className={styles.imagenContainer}>
                        <Image 
                            width={1200}
                            height={1200}
                            src={imagenHabitacion}
                            alt={`Imagen de la habitación ${reservaDetalle.habitacion_nombre}`}
                            className={styles.imagenHabitacion}
                        />
                    </div>
                    <div className={styles.detalleContainer}>
                        <h4>Datos personales</h4>
                        <p><strong>Nombre y Apellidos:</strong> <span className={styles.span}>{reservaDetalle.cliente_nombre}</span></p>
                        <p><strong>Email:</strong> <span className={styles.span}>{reservaDetalle.cliente_email}</span></p>
                        <p><strong>Teléfono:</strong> <span className={styles.span}>{reservaDetalle.cliente_telefono}</span></p>
                        <p><strong>DNI:</strong> <span className={styles.span}>{reservaDetalle.cliente_dni}</span></p>
                        <p><strong>Dirección:</strong> <span className={styles.span}>{reservaDetalle.cliente_direccion}</span></p>                        
                        <hr />
                        <h4>Datos de la reserva</h4>
                        <p><strong>Habitación:</strong> <span className={styles.span}>{reservaDetalle.habitacion_nombre} ({habitacion_id})</span></p>
                        <p><strong>Fecha de entrada:</strong> <span className={styles.span}>{reservaDetalle.fecha_entrada}</span></p>
                        <p><strong>Fecha de salida:</strong> <span className={styles.span}>{reservaDetalle.fecha_salida}</span></p>
                        <p><strong>Estado:</strong> <span className={styles.span}>{reservaDetalle.estado}</span></p>
                        <p><strong>Precio Final (IVA incluido): <span className={styles.span}>{precioTotal}€</span></strong></p>
                    </div>
                </div>
            ) : (
            <p>No se encontraron detalles para la reserva.</p>
            )}
            <div className={styles.divButton}>
                <button type="button" className={` ${styles.button} ${styles.cancelButton}`} onClick={handleCancelarReserva}>Cancelar Reserva</button>
                <button type="button" className={styles.button} onClick={handleEditarClick}>Editar datos</button>
                <button type="button" className={styles.button} onClick={handlePagoClick}>Proceder al pago</button>
            </div>
        </div>
      </Layout>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DetalleReservaPage />
        </Suspense>
    );
}