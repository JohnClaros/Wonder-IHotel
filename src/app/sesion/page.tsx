"use client"
import React, { useState } from "react";
import styles from '../../styles/SesionPage.module.css'
import Layout from "@/components/Layout/Layout";
import SesionForm from "@/components/Sesion/sesionForm";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        usuario: "",
        contrasenna: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/sesion/login", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                router.push("/vistaAdmin");
            } else {
                alert(result.error || "Error al iniciar sesión xD");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Hubo un problema al procesar tu solicitud.");
        }
    };

    return (
        <div>
            <Layout>
                <h1 className={styles.h1}>Iniciar Sesión</h1>
                <main className={styles.form}>
                    <SesionForm formData={formData} handleChange={handleChange} onLogin={handleSubmit} />
                </main>
            </Layout>
        </div>
    );
};

export default LoginPage;