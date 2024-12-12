import React from "react";
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/AvisoLegalPage.module.css";

const AvisoLegalPage: React.FC = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Aviso Legal</h1>
                <p className={styles.paragraph}>
                    Este sitio web es propiedad de <strong>Wonder IHotel</strong>, con domicilio en <strong>www.wonder-ihotel.vercel.app</strong>, y está destinado a proporcionar información sobre nuestros servicios y actividades.
                </p>

                <h2 className={styles.subtitle}>1. Identificación del titular</h2>
                <p className={styles.paragraph}>
                    En cumplimiento con el artículo 10 de la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que:
                </p>
                <ul className={styles.list}>
                    <li><strong>Nombre del titular:</strong> McLovin</li>
                    <li><strong>CIF/NIF:</strong> 01-47-87441</li>
                    <li><strong>Domicilio:</strong> 892 MOMONA ST HONOLULU, HI 96820</li>
                    <li><strong>Teléfono de contacto:</strong> 123456789</li>
                    <li><strong>Email de contacto:</strong> mclovin@gmail.com</li>
                </ul>

                <h2 className={styles.subtitle}>2. Condiciones de uso</h2>
                <p className={styles.paragraph}>
                    Al acceder a este sitio web, el usuario se compromete a utilizarlo conforme a las leyes aplicables y a respetar las presentes condiciones de uso. El titular no se hace responsable del uso indebido del contenido del sitio web por parte de los usuarios.
                </p>

                <h2 className={styles.subtitle}>3. Propiedad intelectual</h2>
                <p className={styles.paragraph}>
                    Todo el contenido de este sitio web, incluidos textos, imágenes, logotipos, gráficos, vídeos, software y diseño, está protegido por derechos de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o modificación sin la autorización expresa del titular.
                </p>

                <h2 className={styles.subtitle}>4. Enlaces a terceros</h2>
                <p className={styles.paragraph}>
                    Este sitio web puede incluir enlaces a sitios web de terceros. El titular no se responsabiliza de los contenidos o servicios proporcionados por estos sitios externos.
                </p>

                <h2 className={styles.subtitle}>5. Limitación de responsabilidad</h2>
                <p className={styles.paragraph}>
                    El titular no será responsable de los posibles daños o perjuicios derivados del uso de este sitio web, como errores técnicos, virus u otras incidencias que puedan afectar al sistema informático del usuario.
                </p>

                <h2 className={styles.subtitle}>6. Legislación aplicable</h2>
                <p className={styles.paragraph}>
                    Este aviso legal se rige por la legislación española. Cualquier disputa relacionada con el uso de este sitio web se resolverá en los tribunales correspondientes al domicilio del titular.
                </p>

                <p className={styles.paragraph}>
                    Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros a través del correo electrónico proporcionado.
                </p>
            </div>
        </Layout>
    );
};

export default AvisoLegalPage;