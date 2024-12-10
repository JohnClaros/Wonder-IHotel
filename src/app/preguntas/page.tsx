import React from "react";
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/FaqPage.module.css";

const FaqPage: React.FC = () => {
    const faqData = [
        {
            question: "¿Qué servicios ofrece nuestra plataforma?",
            answer: "Ofrecemos una amplia gama de servicios, incluyendo reservas de habitaciones, atención al cliente, y gestión de datos para nuestros usuarios registrados."
        },
        {
            question: "¿Cómo puedo contactar con atención al cliente?",
            answer: "Puedes contactarnos a través de nuestro formulario de contacto en la página 'Contacto' o enviando un correo electrónico a nuestro soporte: soporte@ejemplo.com."
        },
        {
            question: "¿Cómo realizo una reserva?",
            answer: "Para realizar una reserva, inicia sesión en tu cuenta, selecciona la habitación o servicio deseado, y sigue las instrucciones en pantalla."
        },
        {
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias. Próximamente implementaremos pagos mediante PayPal y otros servicios digitales."
        },
        {
            question: "¿Puedo cancelar o modificar una reserva?",
            answer: "Sí, puedes cancelar o modificar tu reserva desde tu perfil de usuario. Ten en cuenta que algunas reservas pueden estar sujetas a políticas de cancelación."
        },
        {
            question: "¿Cómo puedo recuperar mi contraseña?",
            answer: "Si has olvidado tu contraseña, dirígete a la página de inicio de sesión y selecciona '¿Olvidaste tu contraseña?'. Sigue las instrucciones para restablecerla."
        },
        {
            question: "¿Es seguro usar esta plataforma?",
            answer: "Sí, utilizamos medidas de seguridad avanzadas, como encriptación SSL, para proteger tus datos y garantizar una experiencia segura."
        }
    ];

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Preguntas Frecuentes (FAQ)</h1>
                <div className={styles.faqList}>
                    {faqData.map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                            <h2 className={styles.question}>{faq.question}</h2>
                            <p className={styles.answer}>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default FaqPage;