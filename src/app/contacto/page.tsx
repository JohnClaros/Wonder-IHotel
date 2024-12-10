"use client"
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import ContactForm from "@/components/Contact/contactForm";
import styles from '../../styles/ContactPage.module.css';
import { useRouter, useSearchParams } from "next/navigation";

const ContactoPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ toastMessage, setToastMessage ] = useState<string | null>(null);

    useEffect(() => {
        const message = searchParams?.get("toast");
        if (message) {
            setToastMessage(message);

            router.replace("/contacto", {shallow: true});

            const timer = setTimeout(() => {
                router.push("/");
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    return (
        <Layout>
            <h1 className={styles.h1}>Contacto</h1>
            {toastMessage && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <ContactForm />
                </div>
                <div className={styles.rightColumn}>
                    <iframe className={styles.iframe} src="https://www.openstreetmap.org/export/embed.html?bbox=-3.71746826171875%2C40.47220600043513%2C-3.7111949920654297%2C40.47569320866924&layer=mapnik"
                        style={{ border: 0}}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default ContactoPage;