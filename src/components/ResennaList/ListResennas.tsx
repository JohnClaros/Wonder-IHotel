"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ListReseñas.module.css";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

interface Resenna {
    id: number;
    nombre: string;
    mensaje: string;
    rating: number;
    fecha: string;
};

const ListResennas = () => {
    const [ resennas, setResennas ] = useState<Resenna[]>([]);
    const [ visibleResennas, setVisiblesResennas ] = useState<Resenna[]>([]);
    const [ startIndex, setStartIndex ] = useState(0);

    const resennas_por_vista = 3;
    const interval_time = 5000;

    useEffect(() => {
        const fetchResennas = async () => {
            try {
                const response = await fetch("/api/resennas/resenna");
                if (response.ok) {
                    const data: Resenna[] = await response.json();
                    setResennas(data);
                    setVisiblesResennas(data.slice(0, resennas_por_vista));
                } else {
                    console.error("Error al cargar las reseñas");
                }
            } catch (error) {
                console.error("Error al hacer la petición:", error);
            }
        };

        fetchResennas();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, interval_time);

        return () => clearInterval(interval);
    }, [startIndex, resennas]);

    const handleNext = () => {
        if (resennas.length > 0) {
            const nextIndex = (startIndex + resennas_por_vista) % resennas.length;
            setStartIndex(nextIndex);
            setVisiblesResennas(resennas.slice(nextIndex, nextIndex + resennas_por_vista));
        }
    };

    const handlePrev = () => {
        if (resennas.length > 0) {
            const prevIndex = (startIndex - resennas_por_vista + resennas.length) % resennas.length;
            setStartIndex(prevIndex);
            setVisiblesResennas(resennas.slice(prevIndex, prevIndex + resennas_por_vista));
        }
    };

    return (
        <div className={styles.testimonials}>
            <h2 className={styles.testimonialsTitle}>Lo que dicen nuestros huéspedes</h2>
            <div className={styles.carouselContainer}>
                <button className={styles.carouselButton} onClick={handlePrev} aria-label="Reseñas anteriores">
                    <ArrowLeftIcon className={styles.icon} />
                </button>
                <div className={styles.testimonialList}>
                    {visibleResennas.length > 0 ? (
                        visibleResennas.map((resenna) => (
                            <div key={resenna.id} className={styles.testimonialItem}>
                                <p className={styles.testimonialText}>"{resenna.mensaje}"</p>
                                <p className={styles.guestName}>{resenna.nombre}</p>
                                <div className={styles.rating}>
                                    {"⭐".repeat(resenna.rating)}
                                </div>
                                <p className={styles.date}>
                                    {new Date(resenna.fecha).toLocaleDateString("es-ES" ,{
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noTestimonials}>No hay reseñas aún. Sé el primero en puntuarnos.</p>
                    )}
                </div>
                <button className={styles.carouselButton} onClick={handleNext} aria-label="Reseñas siguientes">
                    <ArrowRightIcon className={styles.icon} />
                </button>
            </div>
            <div className={styles.divButton}>
                <Link href={"/resennas"}>
                    <button className={styles.buttReseña} type="button">Deja tu reseña</button>
                </Link>
            </div>
        </div>
    );
};

export default ListResennas;