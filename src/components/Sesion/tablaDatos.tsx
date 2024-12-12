"use client";
import React, { useEffect, useState } from "react";
import styles from '../../styles/TablaDatos.module.css';

const TablaDatos = () => {
    const [dataType, setDataType] = useState<"clientesDatos" | "habitacionesDatos" | "reservasDatos" | "contactosDatos">("clientesDatos");
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/datos/${dataType}`);
                if (!response.ok) {
                    throw new Error(`Error al obtener ${dataType}: ${response.statusText}`);
                }
                const result = await response.json();
                if(dataType === "clientesDatos" && result.clientesData) {
                    setData(result.clientesData)
                } else if (dataType === "habitacionesDatos" && result.habitacionesData) {
                    setData(result.habitacionesData)
                } else if (dataType === "contactosDatos" && result.contactosData) {
                    setData(result.contactosData)
                } else if (dataType === "reservasDatos" && result.reservasData) {
                    setData(result.reservasData)
                } else {
                    setData([]);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
            fetchData();
        }, [dataType]);

    const handleButtonClick = (type: "clientesDatos" | "habitacionesDatos" | "reservasDatos" | "contactosDatos") => {
        setDataType(type);
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button onClick={() => handleButtonClick("clientesDatos")} className={styles.button}>
                Clientes
                </button>
                <button onClick={() => handleButtonClick("habitacionesDatos")} className={styles.button}>
                Habitaciones
                </button>
                <button onClick={() => handleButtonClick("reservasDatos")} className={styles.button}>
                Reservas
                </button>
                <button onClick={() => handleButtonClick("contactosDatos")} className={styles.button}>
                Contactos
                </button>
            </div>

            {loading ? (
                <p className={styles.loading}>Cargando datos...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <div className={styles.tablewrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {Array.isArray(data) && data.length > 0 ? 
                                    Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)
                                : <th>No hay datos disponibles</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        {Object.values(item).map((value, i) => (
                                            <td key={i}>{String(value)}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default TablaDatos;