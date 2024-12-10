import React from "react";
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/CondicionesGenerales.module.css";

const CondicionesGenerales: React.FC = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Condiciones Generales</h1>
                <p className={styles.intro}>
                    Estas condiciones generales regulan el uso de la plataforma, los servicios proporcionados y los derechos y responsabilidades de los usuarios y la empresa. Al acceder o utilizar nuestra plataforma, aceptas cumplir con estas condiciones.
                </p>
                
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>1. Introducción</h2>
                    <p>
                        El presente documento establece los términos y condiciones generales aplicables al uso de la plataforma y los servicios ofrecidos. Al utilizar este sitio web, el usuario declara haber leído, entendido y aceptado las condiciones generales descritas.
                    </p>
                </section>
                
                <section className={styles.section}>
                    <h2 className={styles.subtitle}>2. Uso de la plataforma</h2>
                    <p>
                        La plataforma debe utilizarse únicamente para fines legítimos y de acuerdo con las leyes aplicables. Queda estrictamente prohibido:
                    </p>
                    <ul className={styles.list}>
                        <li>Realizar actividades fraudulentas o ilegales.</li>
                        <li>Compartir información falsa o engañosa.</li>
                        <li>Interferir con la seguridad del sistema.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>3. Registro y cuenta de usuario</h2>
                    <p>
                        Para acceder a ciertos servicios, es necesario registrarse y crear una cuenta. El usuario es responsable de mantener la confidencialidad de su contraseña y los datos de su cuenta, y de todas las actividades realizadas desde la misma.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>4. Política de cancelación</h2>
                    <p>
                        Las cancelaciones de reservas o servicios están sujetas a las políticas especificadas en el momento de la contratación. Algunos servicios pueden no ser reembolsables o estar sujetos a penalizaciones.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>5. Responsabilidad</h2>
                    <p>
                        La empresa no será responsable por interrupciones en el servicio, pérdida de datos o daños indirectos resultantes del uso de la plataforma, salvo en los casos previstos por la ley.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>6. Modificaciones</h2>
                    <p>
                        La empresa se reserva el derecho de modificar las condiciones generales en cualquier momento. Los cambios serán notificados a los usuarios mediante el sitio web o correo electrónico.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>7. Ley aplicable y jurisdicción</h2>
                    <p>
                        Estas condiciones generales se rigen por las leyes del país en el que opera la empresa. Cualquier disputa será resuelta en los tribunales competentes de dicha jurisdicción.
                    </p>
                </section>

                <p className={styles.footer}>
                    Si tienes alguna pregunta sobre estas condiciones generales, puedes contactarnos a través de nuestra página de <a href="/contacto" className={styles.link}>Contacto</a>.
                </p>
            </div>
        </Layout>
    );
};

export default CondicionesGenerales;