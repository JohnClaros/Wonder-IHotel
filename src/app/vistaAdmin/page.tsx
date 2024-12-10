"use client";
import React from "react";
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/VistaPage.module.css"
import TablaDatos from "@/components/Sesion/tablaDatos";
import { useRouter } from "next/navigation";
import { LogoutIcon } from "@heroicons/react/solid";

const VistaPage = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/sesion/logout", {
              method: "POST",
            });
      
            if (!response.ok) {
              throw new Error("Error al cerrar sesión");
            }
      
            router.push("/sesion");
        } catch (error) {
        console.error("Error en cierre de sesión:", error);
        }
    }
    return (
        <div>
            <Layout>
                <div className={styles.div}>
                    <h1 className={styles.h1}>Panel de Administación</h1>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <LogoutIcon className={styles.icon}>
                            Cerrar sesión
                        </LogoutIcon>
                    </button>
                </div>
                <TablaDatos />
            </Layout>
        </div>
    )
}

export default VistaPage;