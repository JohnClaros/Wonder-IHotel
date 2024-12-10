"use client";
import React, { useEffect } from "react";
import styles from '../../styles/InicioPage.module.css'
import FormHabitacion from "@/components/Forms/FormHabitacion";
import { usePathname } from "next/navigation";
import ListResennas from "@/components/ResennaList/ListResennas";

const Inicio = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname && pathname.includes("#sesion")) {
            const formSection = document.getElementById("sesion");
            if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth"});
            }
        }
    }, [pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Bienvenido a Wonder IHotel</h1>
            </div>
            <div className={styles.buscador} id="sesion">
                <FormHabitacion />
            </div>
            {/*Seccion de intro */}
            <div className={styles.intro}>
                <h2 className={styles.introTitle}>WONDER IHOTEL</h2>
                <p className={styles.introText}>
                    <strong>Wonder IHotel</strong> queda ubicado en la <strong>zona de Norte de Madrid</strong>, a tan solo 
                    <strong> escasos minutos del centro</strong>, y muy <strong>próximo a distintos núcleos empresariales</strong> – perfecto para viajes 
                    de negocios o para quien se quiera permitir una escapada del día a día.
                </p>
                <p className={styles.introText}>
                    Nuestro <strong>personal multilingüe</strong> estará a tu entera disposición las <strong>24 horas</strong> y estará encantado de ayudarte 
                    y asesorarte en lo que necesites.
                </p>
                <p className={styles.introText}>
                    ¡Ven y déjate deleitar por los más deliciosos platos en nuestro <strong>restaurante ubicado en la planta baja</strong> y relájate tomando algo en nuestro 
                    exclusivo <strong>bar</strong>!
                </p>
                <p className={styles.introText}>
                    ¡No te arrepentirás! Aquí, en el Norte de Madrid, encontrarás la <strong>tranquilidad</strong> deseada.
                </p>
                <div className={styles.divButtonIntro}>
                    <button className={styles.buttonIntro}><a href={"/habitaciones"}>Ver Habitaciones</a></button>
                </div>
            </div>

            {/* Sección de características del hotel */}
            <div className={styles.features}>
                <h2 className={styles.featuresTitle}>Características de nuestro hotel</h2>
                <ul className={styles.featureList}>
                    <li className={styles.featureItem}>🌊 Piscina infinita con vistas panorámicas</li>
                    <li className={styles.featureItem}>💆‍♀️ Spa y centro de bienestar</li>
                    <li className={styles.featureItem}>🍽 Restaurante gourmet de cocina internacional</li>
                    <li className={styles.featureItem}>🏋️‍♂️ Gimnasio totalmente equipado con vistas</li>
                    <li className={styles.featureItem}>🎉 Salones de eventos y conferencias</li>
                    <li className={styles.featureItem}>🚗 Servicio de transporte de lujo</li>
                    <li className={styles.featureItem}>🚴‍♂️ Actividades al aire libre como senderismo y paseos en bicicleta</li>
                    <li className={styles.featureItem}>🍸 Bar en la azotea con vistas espectaculares</li>
                    <li className={styles.featureItem}>⏰ Atención 24/7 para una estancia sin preocupaciones</li>
                    <li className={styles.featureItem}>🏨 Suites de lujo con decoración exclusiva</li>
                </ul>
            </div>

            {/* Sección de testimonios (reseñas) */}
            <div className={styles.divResennas}>
                <ListResennas/>
            </div>
        </div>
    );
};

export default Inicio;