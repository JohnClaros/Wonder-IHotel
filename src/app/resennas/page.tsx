"use client";
import Layout from "@/components/Layout/Layout";
import styles from "@/styles/ResennasPage.module.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Reseñas = () => {
    const router = useRouter();

    const [ formData, setFormData ] = useState({
        nombre: "",
        mensaje: "",
        rating: "",
    });

    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/resennas/crearResenna", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess("¡Muchas gracias por su reseña!");
                setFormData({ nombre: "", mensaje: "", rating: ""});
                setTimeout(() => setSuccess(null), 7000);
                router.push("/resennas");
            } else {
                alert(result.error || "Error al crear la reseña");
            }
        } catch (error) {
            console.error("Error al realizar la reseña:", error);
            alert("Ocurrió un problema al procesar la solicitud.");
        }
    };

    return (
        <Layout>
            <div className={styles.div}>
                <h1 className={styles.h1}>Reseñas</h1>
                <p className={styles.p}>(donde el cliente no tiene la razón, a no ser que nos dé 5 stars)</p>

                {success && (
                    <div className={styles.toast}>
                        {success}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>Nombre:</label>
                    <input className={styles.input} type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>

                    <label className={styles.label}>Mensaje:</label>
                    <textarea className={styles.textarea} name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Deja tu reseña" required></textarea>

                    <label className={styles.label}>Calificación:</label>
                    <select className={styles.select} name="rating" value={formData.rating} onChange={handleChange} required>
                        <option value="">Seleccione una calificación</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button className={styles.button} type="submit">Enviar</button>
                </form>
            </div>
        </Layout>
    );
}

export default Reseñas;