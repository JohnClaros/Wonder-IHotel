"use client";
import React, { useState } from "react";
import styles from '../../styles/ContactForm.module.css';
import { useRouter } from "next/navigation";

const ContactForm = () => {
    const router= useRouter();
    const [ formData, setFormData ] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre || !formData.email || !formData.mensaje) {
            setError("Por favor, complete todos los campos");
            return;
        }

        try {
            const response = await fetch("/api/contacto", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
      
            const result = await response.json();
      
            if (response.ok) {
                setSuccess("Mensaje enviado con éxito")
                setError(null);
                setFormData({ nombre: "", email: "", mensaje: "" });

                setTimeout(() => {
                    setSuccess(null);
                    router.push("/contacto");
                }, 2000);
            } else {
              setError(result.error || "Hubo un problema al enviar el mensaje.");
              setSuccess(null);
            }
        } catch (error) {
            setError("Hubo un error al procesar la solicitud.");
            setSuccess(null);
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.div}>
                <label htmlFor="nombre" className={styles.label}>Nombre y Apellidos</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div className={styles.div}>
                <label htmlFor="email" className={styles.label}>Correo</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div className={styles.div}>
                <label htmlFor="mensaje" className={styles.label}>Mensaje</label>
                <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>Enviar</button>
            {success && <p className={styles.success}>{success}</p>}
        </form>
    );
};

export default ContactForm;