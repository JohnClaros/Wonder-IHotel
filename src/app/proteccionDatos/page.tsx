import React from "react";
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/ProteccionDatosPage.module.css";

const ProteccionDatos: React.FC = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Política de Protección de Datos</h1>
                <p className={styles.intro}>
                    En cumplimiento con la normativa vigente en materia de protección de datos, te informamos sobre cómo recopilamos, utilizamos y protegemos tu información personal.
                </p>
                
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>1. Responsable del tratamiento</h2>
                    <p>
                        El responsable del tratamiento de los datos personales es Wonder IHotel, con domicilio en [Dirección de la empresa], y correo electrónico de contacto: contacto@wonderihotel.com.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>2. Datos que recopilamos</h2>
                    <p>Recopilamos los siguientes datos personales:</p>
                    <ul className={styles.list}>
                        <li>Nombre y apellidos.</li>
                        <li>Correo electrónico y número de teléfono.</li>
                        <li>Información proporcionada a través de formularios de contacto.</li>
                        <li>Datos de navegación, como dirección IP y cookies.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>3. Finalidad del tratamiento</h2>
                    <p>Los datos recopilados se utilizan para las siguientes finalidades:</p>
                    <ul className={styles.list}>
                        <li>Responder a consultas y solicitudes de información.</li>
                        <li>Gestión de reservas y prestación de servicios contratados.</li>
                        <li>Envío de comunicaciones comerciales, si has dado tu consentimiento expreso.</li>
                        <li>Mejora de la experiencia del usuario en nuestra plataforma.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>4. Legitimación para el tratamiento</h2>
                    <p>
                        La base legal para el tratamiento de tus datos personales incluye:
                    </p>
                    <ul className={styles.list}>
                        <li>El consentimiento expreso otorgado al proporcionar tus datos.</li>
                        <li>El cumplimiento de obligaciones contractuales o legales.</li>
                        <li>El interés legítimo del responsable en mejorar sus servicios.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>5. Derechos de los usuarios</h2>
                    <p>Como usuario, tienes derecho a:</p>
                    <ul className={styles.list}>
                        <li>Acceder a tus datos personales.</li>
                        <li>Rectificar datos inexactos o incompletos.</li>
                        <li>Solicitar la eliminación de tus datos.</li>
                        <li>Oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
                        <li>Solicitar la portabilidad de tus datos.</li>
                    </ul>
                    <p>
                        Para ejercer estos derechos, puedes enviar una solicitud a contacto@wonderihotel.com adjuntando una copia de tu documento de identidad.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>6. Seguridad de los datos</h2>
                    <p>
                        Implementamos medidas técnicas y organizativas para garantizar la seguridad de los datos personales y prevenir accesos no autorizados, pérdida, destrucción o divulgación indebida.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>7. Retención de datos</h2>
                    <p>
                        Conservaremos tus datos personales solo durante el tiempo necesario para cumplir con las finalidades descritas, salvo que la ley exija un período de retención más prolongado.
                    </p>
                </section>

                <p className={styles.footer}>
                    Si tienes preguntas sobre esta política de protección de datos, no dudes en contactarnos a través de nuestra página de <a href="/contacto" className={styles.link}>Contacto</a>.
                </p>
            </div>
        </Layout>
    );
};

export default ProteccionDatos;